import React, {useEffect, useState} from 'react';
import { API_URL } from '../../config/contansts';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import axios from 'axios';
import './Login.scss';

function Login() {
	const [islogin, setIslogin] = useRecoilState(loginState); //useState와 거의 비슷한 사용법
	// const [getToken, setGetToken] = useState();
  // const [userInfo, setUserInfo] = useState();
	
	const navigate = useNavigate();
	
	const [naverLoginButton, setNaverLoginButton] = useState();

	function createMarkup(html) {
		return {__html: html};
	}
	function MyComponent(html) {
		return <div dangerouslySetInnerHTML={createMarkup(html)} />;
	}
	

	useEffect(()=> {
		axios.get(`${API_URL}/api/test/naverlogin`)
		.then(res => {
			console.log(res.data);
			// setNaverLoginButton(res.data);
			// setNaverLoginButton(createMarkup(res.data));
			setNaverLoginButton(MyComponent(res.data));
		}).catch(e => {
			console.error(e);
		})
	}, []);


	/** 로그인 */
	const onSubmitLogin = async (e) => {
		e.preventDefault();
		const email = e.target.email.value.trim();
		const pwd = e.target.pwd.value.trim();

		console.log("email:", email);
		console.log("pwd:", pwd);

		if( email !== "" && pwd !== ""){
			console.log(email);
			axios.post(
				`${API_URL}/api/user/login`,
				{email, pwd},
				// { withCredentials: true }// 쿠키 수정허용
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

	// const naverLogout = () => {
  //   localStorage.removeItem("com.naver.nid.access_token");
  //   window.location.href='/test';
  // };

	return (
	<div className="login-container-yjh">
		<form id='login-form-yjh' onSubmit={onSubmitLogin}>
			<h1>로그인</h1>
			<ul id='login-input-yjh'>
				<div>
					<li className="input-li-yjh">
						<label>아이디(이메일주소)</label>
						<input
							type="text"
							id="email"
							placeholder="예) abc@gmail.com"
						/>
					</li>
					<li className="input-li-yjh">
						<label>비밀번호</label>
						<input
							type="password"
							id="pwd"
							placeholder="비밀번호"
						/>
					</li>
				</div>
				<button id='login-btn-yjh' type='submit'>로그인</button>
			</ul>
			<div id='login-tip-yjh'>
				<p><AiOutlineQuestionCircle className='icon' size={30}/>로그인이 안되시는 경우 한/영키와 Caps Lock이 켜져 있는지 확인해주세요</p>
				<p><AiOutlineQuestionCircle className='icon' size={30}/>계속 로그인이 안되시는 경우 관리자에게 문의 해주세요</p>
			</div>

			{naverLoginButton}
		</form>
	</div>
	);
}

export default Login;
