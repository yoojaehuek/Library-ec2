import React, {useEffect, useState} from 'react';
import { API_URL } from '../../config/contansts';
import { useNavigate, NavLink } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import axios from 'axios';
import GoogleLoginButton from '../../components/SocialLoginButtons/GoogleLoginButton/GoogleLoginButton';
import NaverLoginButton from '../../components/SocialLoginButtons/NaverLoginButton/NaverLoginButton';
import KakaoLoginButton from '../../components/SocialLoginButtons/KakaoLoginButton/KakaoLoginButton.js'
import './Login.scss';

const Login = () => {
	const [islogin, setIslogin] = useRecoilState(loginState); //useState와 거의 비슷한 사용법
	
	const navigate = useNavigate();
	
	// const [naverLoginButton, setNaverLoginButton] = useState();

	// const createMarkup = (html) => {
	// 	return {__html: html};
	// }
	// const MyComponent = (html) => {
	// 	return <div dangerouslySetInnerHTML={createMarkup(html)} />;
	// }
	
	// useEffect(()=> {
	// 	axios.get(`${API_URL}/api/test/naverlogin`)
	// 	.then(res => {
	// 		console.log(res.data);
	// 		setNaverLoginButton(MyComponent(res.data));
	// 	}).catch(e => {
	// 		console.error(e);
	// 	})

	// 	userAccessToken();
	// }, []);

	// const userAccessToken = () => {
  //   // window.location.href는 현재 페이지의 URL을 문자열로 반환하는 속성입니다.
  //   // includes 메소드를 사용하여 URL에 'code'이라는 문자열이 포함되어 있는지 확인합니다.
  //   // 만약 포함되어 있다면 getToken() 함수를 호출합니다.
  //   window.location.href.includes('code') && getToken();
	// }
        
  // const getToken = async () => {
  //   //?code=c4HdngWVGK3jEDwp2y&state=NAVER_STATE
  //   const code = window.location.href.split('=')[1].split('&')[0];
  //   const state = window.location.href.split('=')[2];
  
  //   // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!   
  //   localStorage.setItem('code', code);
  //   localStorage.setItem('state', state);

	// 		const callbackRes = await axios.get(`${API_URL}/api/test/callback?code=${code}&state=${state}`);
	// 		console.log("callbackRes: ", callbackRes);

	// 		const memberRes = await axios.get(`${API_URL}/api/test/member?access_token=${callbackRes.data.access_token}`);
	// 		console.log("memberRes: ", memberRes);

	// 		const naverlogin = await axios.post(`${API_URL}/api/user/naver-login`, 
	// 			memberRes.data.response,
	// 			{ withCredentials: true }// 쿠키 수정허용
	// 		);
			
	// 		console.log("naverlogin: ", naverlogin);

	// 		if(naverlogin.status == 200){
	// 			console.log('로그인성공!');
	// 			alert("로그인성공!");
	// 			setIslogin(true);// 로컬스토리지에 저장. 브라우저닫아도 유지
	// 			navigate('/'); 
	// 		}
	// }
	
	/** 로그인 */
	const onSubmitLogin = async (e) => {
		e.preventDefault();
		const email = e.target.email.value.trim();
		const pwd = e.target.pwd.value.trim();

		if( email !== "" && pwd !== "" ){
			console.log(email);
			axios.post(
				`${API_URL}/api/user/login`,
				{email, pwd},
				{ withCredentials: true }// 쿠키 수정허용
			)
			.then(() =>{
				alert("로그인성공!");
				setIslogin(true);// 로컬스토리지에 저장. 브라우저닫아도 유지
				navigate('/');  
			})
			.catch(err =>{
				// console.error(err);
				console.error(err);
				alert(`로그인 실패!\n${err}`);
			})
		}else{
			return alert("전부 입력해주세요");
		}
	};

	return (
		<div className="login-container-yjh">
			<form id='login-form-yjh' onSubmit={onSubmitLogin}>
				<h1>로그인</h1>
				<ul id='input-box-yjh'>
					<div>
						<li className="input-li-yjh">
							<label>아이디(이메일주소)</label>
							<input
								id="email"
								type="text"
								placeholder="예) abc@gmail.com"
							/>
						</li>
						<li className="input-li-yjh">
							<label>비밀번호</label>
							<input
								id="pwd"
								type="password"
								placeholder="비밀번호"
							/>
						</li>
					</div>
					<button id='login-btn-yjh' type='submit'>로그인</button>
				</ul>
				<div id='login-tip-yjh'>
					<p><AiOutlineQuestionCircle className='icon'/>로그인이 안되시는 경우 한/영키와 Caps Lock이 켜져 있는지 확인해주세요</p>
					<p><AiOutlineQuestionCircle className='icon'/>계속 로그인이 안되시는 경우 관리자에게 문의 해주세요</p>
					<p id='join-link-yjh'><NavLink to="/join" className="join-link-kjh">회원이 아니신가요? 회원가입하러가기</NavLink></p>
				</div>
				<fieldset id='social-login-yjh'>
					<legend htmlFor="">or</legend>
					<NaverLoginButton/>
					<GoogleLoginButton/>
					<KakaoLoginButton />		
				</fieldset>
			</form>
		</div>
	);
}

export default Login;
