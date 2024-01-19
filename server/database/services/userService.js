const UserModel = require('../models/userModel')
const crypto = require('crypto');
const redisClient = require("../../utils/redis.utils");
require('dotenv').config();
const { makeRefreshToken, makeAccessToken } = require('../../utils/token');
const {formatDate, faqFormatDate, userFormat} = require('../../utils/dataUtils');

class UserService{
	//유효성 검사 이메일 겹치는지 등등
	static async createUser({email, pwd, user_name, phone}){

		const user = await UserModel.findOneUserEmail({ user_email: email });
		
		if (user) {
			user.errorMessage = "해당 id는 이미 가입되어 있습니다.";
			return user;
		}

		//crypto.randomBytes(128): 길이가 128인 임의의 바이트 시퀀스를 생성
		//.toString('base64'): 임의의 바이트를 base64로 인코딩된 문자열로 변환
		const salt = crypto.randomBytes(128).toString('base64'); 

		// crypto.createHash('sha512'): SHA-512 해시 개체를 생성
		//.update(pwd + salt): 비밀번호( pwd)와 솔트를 연결하여 해시를 업데이트
		//.digest('hex'): 16진수 형식으로 최종 해시를 생성
		const hashPassword = crypto
			.createHash('sha512')
			.update(pwd + salt)
			.digest('hex'); 

		const newUser = { user_email: email, user_pwd: hashPassword, salt, user_name, user_phone: phone }

		const createNewUser = await UserModel.createUser({newUser});
		return createNewUser
	}

	static async loginUser({email, pwd}){
		// console.log("서비스에서: ",email);
		console.log("로그인서비스들어옴");


		let user = await UserModel.findOneUserEmail({user_email: email });
		console.log("user: ", user);
		
		if (!user) {
			console.log('null걸림');
			user = {}; // null이면 속성 할당 안됨 그래서 {} 빈 객체 재할당
			user.errorMessage = "해당 id는 가입 내역이 없습니다. 다시 한 번 확인해 주세요."; // {errorMessage: "해당 id는 가입 내역이 없습니다. 다시 한 번 확인해 주세요."}
			return user;
		}

		// 입력한 비밀번호와 조회해온 암호화 난수 함침
		const combinedPassword = pwd + user.salt; // 1234ajksdhf;adhf;laskdnflas

		// 합친 combinedPassword 암호화
		const hashedPassword = crypto  //asldgfiahsgdkajsdfabijvabsijdvb
			.createHash('sha512')
			.update(combinedPassword)
			.digest('hex');

		// hashedPassword와 DB의 비밀번호 비교
		if (hashedPassword === user.user_pwd) {
			console.log('Login successful!');
			// console.log("userService.js/loginUser()/user: ", user);
			const accessToken = makeAccessToken({user_id: user.user_id});
			const refreshToken = makeRefreshToken();

			// userId를 키값으로 refresh token을 redis server에 저장
			await redisClient.set(user.user_id, refreshToken); //{eee: 'qweqweqrsddsvwvqrv'}
			// await redisClient.get(user.id, (err, value) => {
			// 	console.log("redis.value: ", value); 
			// });
			
			const name = user.user_name; 
			const email = user.user_email;			
			const newUser = {name, email, accessToken, refreshToken};

			return newUser
		}else {
			console.log('Invalid login credentials.');
			user.errorMessage = "id 또는 비밀번호가 다릅니다.";
			return user;
		}
	}

	static async naverLogin(tmp){

		//crypto.randomBytes(128): 길이가 128인 임의의 바이트 시퀀스를 생성
		//.toString('base64'): 임의의 바이트를 base64로 인코딩된 문자열로 변환
		const salt = crypto.randomBytes(128).toString('base64'); 

		// crypto.createHash('sha512'): SHA-512 해시 개체를 생성
		//.update(pwd + salt): 비밀번호( pwd)와 솔트를 연결하여 해시를 업데이트
		//.digest('hex'): 16진수 형식으로 최종 해시를 생성
		const hashPassword = crypto
			.createHash('sha512')
			.update(tmp.email + salt)
			.digest('hex');
		
		const newUser = {
			user_email: tmp.email, 
			user_name: tmp.name, 
			// user_phone: tmp.mobile.replace(/\D/g, ''), 
			user_pwd: hashPassword,
			salt: salt,
			sns_id: tmp.id, 
			sns_type: "naver", 
		}
		// console.log(newUser);

		const result = await UserModel.naverLogin(newUser);
		console.log("naver/service/result: ", result[1]);
		
		if (!result[1]) { // 가입 내역 있음 (생성 못했기 때문에 false임)
			if (!result[0].sns_id) { //계정은 있는데 네이버 아이디 아님
				console.log('가입 했지만 네이버 아님 연동!');
				const update = {
					sns_id: tmp.id, 
					sns_type: "naver", 
				}
				const user_email = tmp.email;
				const putResult = await UserModel.patchUserByEmail({update, user_email}); // 네이버 연동!
			}else { //연동 했음
				//로그인 처리
				console.log('가입도 했고 네이버도 연동됨');
			} 
		} else { // 가입 내역 없음
			//위에서 함 필요 없음
			console.log('신규 회원 회원 가입!');
		}
		
		const accessToken = makeAccessToken({user_id: result[0].user_id});
		const refreshToken = makeRefreshToken();

		// userId를 키값으로 refresh token을 redis server에 저장
		await redisClient.set(result[0].user_email, refreshToken); //{eee: 'qweqweqrsddsvwvqrv'}
		
		const name = result[0].user_name; 
		const email = result[0].user_email;			
		const serviceResult = {name, email, accessToken, refreshToken};

		return serviceResult
	}

	static async googleLogin(tmp){

		//crypto.randomBytes(128): 길이가 128인 임의의 바이트 시퀀스를 생성
		//.toString('base64'): 임의의 바이트를 base64로 인코딩된 문자열로 변환
		const salt = crypto.randomBytes(128).toString('base64'); 

		// crypto.createHash('sha512'): SHA-512 해시 개체를 생성
		//.update(pwd + salt): 비밀번호( pwd)와 솔트를 연결하여 해시를 업데이트
		//.digest('hex'): 16진수 형식으로 최종 해시를 생성
		const hashPassword = crypto
			.createHash('sha512')
			.update(tmp.email + salt)
			.digest('hex');
		
		const newUser = {
			user_email: tmp.email, 
			user_name: tmp.name, 
			user_pwd: hashPassword,
			salt: salt,
			sns_type: "google", 
		}
		// console.log(newUser);

		const result = await UserModel.googleLogin(newUser);
		console.log("google/service/result: ", result[1]);
		
		if (!result[1]) { // 가입 내역 있음 (생성 못했기 때문에 false임)
			if (!result[0].sns_type) { //계정은 있는데 네이버 아이디 아님
				console.log('가입 했지만 구글 아님 연동!');
				const update = {
					sns_type: "google", 
				}
				const user_email = tmp.email;
				const putResult = await UserModel.patchUserByEmail({update, user_email}); // 네이버 연동!
			}else { //연동 했음
				//로그인 처리
				console.log('가입도 했고 구글도 연동됨');
			} 
		} else { // 가입 내역 없음
			//위에서 함 필요 없음
			console.log('신규 회원 회원 가입!');
		}
		
		const accessToken = makeAccessToken({user_id: result[0].user_id});
		const refreshToken = makeRefreshToken();

		// userId를 키값으로 refresh token을 redis server에 저장
		await redisClient.set(result[0].user_email, refreshToken); //{eee: 'qweqweqrsddsvwvqrv'}
		
		const name = result[0].user_name; 
		const email = result[0].user_email;			
		const serviceResult = {name, email, accessToken, refreshToken};

		return serviceResult
	}

	static async checkPassword({user_id, user_pwd}){
		console.log("이메일서비스들어옴 : ", user_id);
		console.log("비번서비스들어옴 : ", user_pwd);
		
		let user = await UserModel.findOneUserId({ user_id });
		console.log("user: ", user);
		
		if (!user) {
			console.log('null걸림');
			user = {}; // null이면 속성 할당 안됨 그래서 {} 빈 객체 재할당
			user.errorMessage = "해당 id는 가입 내역이 없습니다. 다시 한 번 확인해 주세요."; // {errorMessage: "해당 id는 가입 내역이 없습니다. 다시 한 번 확인해 주세요."}
			return user;
		}

		// 입력한 비밀번호와 조회해온 암호화 난수 함침
		const combinedPassword = user_pwd + user.salt; // 1234ajksdhf;adhf;laskdnflas

		// 합친 combinedPassword 암호화
		const hashedPassword = crypto  //asldgfiahsgdkajsdfabijvabsijdvb
			.createHash('sha512')
			.update(combinedPassword)
			.digest('hex');

		// hashedPassword와 DB의 비밀번호 비교
		if (hashedPassword === user.user_pwd) {
			console.log('Login successful!');
			// console.log("userService.js/loginUser()/user: ", user);
			// const accessToken = makeAccessToken({email: user.user_email});
			// const refreshToken = makeRefreshToken();
			return true;
		} else {
			console.log("비번 일치 x");
			return false;
		}
	}

	static async getAllUser(){
		const user = await UserModel.getAllUser();
		// const phoneFormatUser = phoneFormat(user);
		// console.log("phoneFormatUser:",phoneFormatUser);
		const dataFormatUser = userFormat(user);
		return dataFormatUser;
	}

	static async detailUser({userId}){
		const user = await UserModel.findOneUserId({user_id: userId});
		// console.log({myId});
		const name = user.user_name;
		const pwd = user.user_pwd;
		const phone = user.user_phone;
		const email = user.user_email;
		const user_id = user.user_id;
		const userInfo = {
			user_id,
			name,
			pwd,
			phone,
			email,
		};

		return userInfo;
	}

	static async patchUser({toUpdate, user_id}){
		console.log("서비스에서: ",toUpdate, user_id);
		// const email = toUpdate.user_name;
		// const phone = toUpdate.phoneNumberPrefix + toUpdate.phoneNumberSuffix;
		// const address = toUpdate.address;
		// const detail_address = toUpdate.detail_address;
		// const birth = toUpdate.selectedYear+'-'+toUpdate.selectedMonth+'-'+toUpdate.selectedDay;

		//crypto.randomBytes(128): 길이가 128인 임의의 바이트 시퀀스를 생성
		//.toString('base64'): 임의의 바이트를 base64로 인코딩된 문자열로 변환
		
		// crypto.createHash('sha512'): SHA-512 해시 개체를 생성
		//.update(pwd + salt): 비밀번호( pwd)와 솔트를 연결하여 해시를 업데이트
		//.digest('hex'): 16진수 형식으로 최종 해시를 생성
		const update = {
			user_name: toUpdate.user_name,
			user_phone: toUpdate.user_phone,
		};
		if(toUpdate.user_pwd) {
			const salt = crypto.randomBytes(128).toString('base64'); 
			const hashPassword = crypto
				.createHash('sha512')
				.update(toUpdate.user_pwd + salt)
				.digest('hex'); 
			
				update.salt = salt;
				update.hashPassword = hashPassword;
		}

		// update.user_name = toUpdate.user_name;
		// update.phone = toUpdate.phone_number_prefix + toUpdate.phone_number_suffix;
		// update.address = toUpdate.address;
		// update.detail_address = toUpdate.detail_address;
		// update.birth = toUpdate.selectedYear+'-'+toUpdate.selectedMonth+'-'+toUpdate.selectedDay;
		console.log(update);

		const user = await UserModel.patchUser({update, user_id});
		return user;
	}

	static async deleteUser({user_id}){
		console.log("서비스에서: ", user_id);
		const user = await UserModel.destroyUser({user_id});
		return user;
	}
	static async deleteAdminUser({user_id}){
		console.log("서비스에서: ", user_id);
		const user = await UserModel.deleteAdminUser({user_id});
		return user;
	}
}
module.exports = UserService;