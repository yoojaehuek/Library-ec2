import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../config/contansts'
import axios from 'axios';
import './Join.scss'

function Join() {
	const navigate = useNavigate();
	// 초기값 세팅 - 이메일, 비밀번호, 비밀번호확인, 이름, 전화번호
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [phone, setPhone] = useState("");
	// 오류메세지 상태 저장
	const [emailMessage, setEmailMessage] = useState("");
	const [nameMessage, setNameMessage] = useState("");
	const [passwordMessage, setPasswordMessage] = useState("");
	const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
	const [phoneMessage, setPhoneMessage] = useState("");
	// 유효성 검사
	const [isEmail, setIsEmail] = useState(false);
	const [isName, setIsName] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
	const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
	const [isPhone, setIsPhone] = useState(false);
	/** 이메일 유효성검사 */
	const onChangeEmail = (e) => {
		const currentEmail = e.target.value;
		setEmail(currentEmail);
		const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

		if (!emailRegExp.test(currentEmail)) {
			setEmailMessage("이메일의 형식이 올바르지 않습니다!");
			setIsEmail(false);
		} else {
			setEmailMessage("사용 가능한 이메일 입니다.");
			setIsEmail(true);
		}
	};
	/** 이름유효성검사 */
	const onChangeName = (e) => {
		const currentName = e.target.value;
		setName(currentName);

		if (currentName.length < 2 || currentName.length > 10) {
			setNameMessage("닉네임은 2글자 이상 10글자 이하로 입력해주세요!");
			setIsName(false);
		} else {
			setNameMessage("사용가능한 닉네임 입니다.");
			setIsName(true);
		}
	};
	/** 비밀번호 유효성검사 */
	const onChangePassword = (e) => {
		const currentPassword = e.target.value;
		setPassword(currentPassword);
		const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
		if (!passwordRegExp.test(currentPassword)) {
			setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
			setIsPassword(false);
		} else {
			setPasswordMessage("안전한 비밀번호 입니다.");
			setIsPassword(true);
		}
	};
	/** 비밀번호 확인 유효성검사 */
	const onChangePasswordConfirm = (e) => {
		const currentPasswordConfirm = e.target.value;
		setPasswordConfirm(currentPasswordConfirm);
		if (password !== currentPasswordConfirm) {
			setPasswordConfirmMessage("비밀번호가 똑같지 않아요!");
			setIsPasswordConfirm(false);
		} else {
			setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
			setIsPasswordConfirm(true);
		}
	};
	/** 전화번호 유효성검사 */
	const onChangePhone = (e) => {
		const currentPhone = e.target.value;
		setPhone(currentPhone);
		const phoneRegExp = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;

		if (!phoneRegExp.test(currentPhone)) {
			setPhoneMessage("올바른 형식이 아닙니다!");
			setIsPhone(false);
		} else {
			setPhoneMessage("사용 가능한 번호입니다:-)");
			setIsPhone(true);
		}
	};
	// 각 입력창에 대한 라벨 상태 저장
	const [isLabelVisible, setIsLabelVisible] = useState({
		email: false,
		name: false,
		password: false,
		passwordConfirm: false,
		phone: false,
	});
	// 각 입력창에 대한 라벨 숨김 및 나타내기를 위한 참조 생성
	const inputRefs = {
		email: useRef(null),
		name: useRef(null),
		password: useRef(null),
		passwordConfirm: useRef(null),
		phone: useRef(null),
	};

	const onSubmitJoin = async (e) => {// 회원가입
		e.preventDefault();
		const email = e.target.email.value.trim();  //  앞뒤 공백제거
		const pwd = e.target.pwd.value.trim(); 
		const confirmPwd = e.target.confirmPwd.value.trim(); 
		const user_name = e.target.name.value.trim(); 
		const phone = e.target.phone.value.trim(); 
		// 모두 입력했을 시 실행
		if(pwd === confirmPwd && 
			email !== "" && 
			pwd !== "" && 
			confirmPwd !== "" && 
			user_name !== "" &&
			phone !== "" && 
			isEmail &&
			isName && 
			isPassword &&
			isPasswordConfirm &&
			isPhone
		){
			axios.post(`${API_URL}/api/user/join`,{email, pwd, user_name, phone})
			.then(() =>{
				alert("가입성공!");
				navigate('/');  
			})
			.catch(err =>{
				console.error(err.response.data.message);
				alert(`가입 실패!\n${err.response.data.message}`);
			})
		}else{
			return alert("입력하지 않은 부분이 있거나 입력형식이 올바르지않은 곳이 있습니다.");
		}
	};
  const handleInputFocus = (inputType) => { // 라벨 보여지는 여부 
    setIsLabelVisible((prev) => ({ ...prev, [inputType]: true }));
  };
	const handleInputBlur = (inputType) => {// input필드에 값이 없으면 라벨을 숨김 
		const inputValue = inputRefs[inputType].current.value.trim();
		if (!inputValue) {
			setIsLabelVisible((prev) => ({ ...prev, [inputType]: false }));
		}
	};

	return (
	<div className="join-container-yjh">
		<form id='Join-form-yjh' onSubmit={onSubmitJoin}>
			<h1>회원가입</h1>
			<ul id='join-input-yjh'>
				<li className="input-li-yjh">
					<label className={isLabelVisible.email  ? '' : 'hidden'}>아이디(이메일주소)</label>
					<input
						id="email"
						value={email}
						onChange={onChangeEmail}
						ref={inputRefs.email}
						type="text"
						placeholder="아이디(이메일주소)"
						onFocus={() => handleInputFocus('email')}
						onBlur={() => handleInputBlur('email')}
					/>
					<p className={`message ${!isEmail ? 'error' : ''}`}>{emailMessage}</p>
				</li>
				<li className="input-li-yjh">
					<label className={isLabelVisible.password ? '' : 'hidden'}>비밀번호</label>
					<input
						id="pwd"
						value={password}
						onChange={onChangePassword}
						ref={inputRefs.password}
						type="password"
						placeholder="비밀번호"
						onFocus={() => handleInputFocus('password')}
						onBlur={() => handleInputBlur('password')}
					/>
					<p className={`message ${!isPassword ? 'error' : ''}`}>{passwordMessage}</p>
				</li>
				<li className="input-li-yjh">
					<label className={isLabelVisible.passwordConfirm ? '' : 'hidden'}>비밀번호 확인</label>
					<input
						id="confirmPwd"
						value={passwordConfirm}
						onChange={onChangePasswordConfirm}
						ref={inputRefs.passwordConfirm}
						type="password"
						placeholder="비밀번호 확인"
						onFocus={() => handleInputFocus('passwordConfirm')}
            onBlur={() => handleInputBlur('passwordConfirm')}
					/>
					<p className={`message ${!isPasswordConfirm ? 'error' : ''}`}>{passwordConfirmMessage}</p>
				</li>
				<li className="input-li-yjh">
					<label className={isLabelVisible.name ? '' : 'hidden'}>이름</label>
					<input
						id="name"
						value={name}  
						onChange={onChangeName}
						ref={inputRefs.name}
						type="text"
						placeholder="이름"
						onFocus={() => handleInputFocus('name')}
            onBlur={() => handleInputBlur('name')}
					/>
					<p className={`message ${!isName ? 'error' : ''}`}>{nameMessage}</p>
				</li>
				<li className="input-li-yjh">
					<label className={isLabelVisible.phone ? '' : 'hidden'}>전화번호</label>
					<input
						id="phone"
						value={phone} 
						onChange={onChangePhone}
						ref={inputRefs.phone}
						type="text"
						placeholder="전화번호(01012345678)"
						onFocus={() => handleInputFocus('phone')}
            onBlur={() => handleInputBlur('phone')}
					/>
					<p className={`message ${!isPhone ? 'error' : ''}`}>{phoneMessage}</p>
				</li>
			</ul>
			<li><button type='submit' id='join-btn-yjh'>가입</button></li>
		</form>
	</div>
	);
}

export default Join;
