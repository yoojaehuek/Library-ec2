import React from 'react';
import { API_URL } from '../../config/contansts';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";
import axios from 'axios';
import './Login.scss';
import { AiOutlineQuestionCircle } from "react-icons/ai";
function Login() {
	const [islogin, setIslogin] = useRecoilState(loginState); //useState와 거의 비슷한 사용법
	const navigate = useNavigate();

	/** 로그인 */
	const onSubmitLogin = async (e) => {
		e.preventDefault();
		const email = e.target.email.value.trim();
		const pwd = e.target.pwd.value.trim();

		if( email !== "" && pwd !== ""){
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
				console.error(err.response.data);
				alert(`로그인 실패!\n${err.response.data.message}`);
			})
		}else{
			return alert("전부 입력해주세요");
		}
	};

	return (
	<div className="login-container-yjh">
		<form id='login-form' onSubmit={onSubmitLogin}>
			<h1>로그인</h1>
			<p>테스트 id: qwer@naver.com</p>
			<p>테스트 pwd: qwer1234!</p>
			<ul id='login-input'>
				<div>
					<li className="input-li">
						<label>아이디(이메일주소)</label>
						<input
							type="text"
							id="email"
							placeholder="예) abc@gmail.com"
						/>
					</li>
					<li className="input-li">
						<label>비밀번호</label>
						<input
							type="password"
							id="pwd"
							placeholder="비밀번호"
						/>
					</li>
				</div>
				<button id='login-btn' type='submit'>로그인</button>
			</ul>
			<div id='login-tip'>
				<p><AiOutlineQuestionCircle className='icon' size={30}/>로그인이 안되시는 경우 한/영키와 Caps Lock이 켜져 있는지 확인해주세요</p>
				<p><AiOutlineQuestionCircle className='icon' size={30}/>계속 로그인이 안되시는 경우 관리자에게 문의 해주세요</p>
			</div>
		</form>
	</div>
	);
}

export default Login;
