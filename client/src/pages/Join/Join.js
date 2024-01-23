import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../config/contansts'
import axios from 'axios';
import GoogleLoginButton from '../../components/SocialLoginButtons/GoogleLoginButton/GoogleLoginButton';
import NaverLoginButton from '../../components/SocialLoginButtons/NaverLoginButton/NaverLoginButton';
import KakaoLoginButton from '../../components/SocialLoginButtons/KakaoLoginButton/KakaoLoginButton.js'
import {emailVaildation, nameVaildation, pwdVaildation, pwdConfirmVaildation, phoneVaildation} from "../../utils/formVaildation";
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
		const email = e.target.email.value.trim();// 앞뒤 공백제거
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
				<ul id='input-ul-yjh'>
					<li className="input-li-yjh">
						<label className={isLabelVisible.email  ? '' : 'hidden'}>아이디(이메일주소)</label>
						<input
							id="email"
							value={email}
							ref={inputRefs.email}
							type="text"
							placeholder="아이디(이메일주소)"
							onFocus={() => handleInputFocus('email')}
							onBlur={() => handleInputBlur('email')}
							onChange={(e) => {
								const {emailMessage, bool} = emailVaildation(e);
								setEmailMessage(emailMessage);
								setIsEmail(bool);
								setEmail(e.target.value);
							}}
						/>
						<p className={`message ${!isEmail ? 'error' : ''}`}>{emailMessage}</p>
					</li>
					<li className="input-li-yjh">
						<label className={isLabelVisible.password ? '' : 'hidden'}>비밀번호</label>
						<input
							id="pwd"
							value={password}
							ref={inputRefs.password}
							type="password"
							placeholder="비밀번호"
							onFocus={() => handleInputFocus('password')}
							onBlur={() => handleInputBlur('password')}
							onChange={(e) => { 
								const {pwdMessage, bool} = pwdVaildation(e);
								setPasswordMessage(pwdMessage);
								setIsPassword(bool);
								setPassword(e.target.value);
							}}
						/>
						<p className={`message ${!isPassword ? 'error' : ''}`}>{passwordMessage}</p>
					</li>
					<li className="input-li-yjh">
						<label className={isLabelVisible.passwordConfirm ? '' : 'hidden'}>비밀번호 확인</label>
						<input
							id="confirmPwd"
							value={passwordConfirm}
							ref={inputRefs.passwordConfirm}
							type="password"
							placeholder="비밀번호 확인"
							onFocus={() => handleInputFocus('passwordConfirm')}
							onBlur={() => handleInputBlur('passwordConfirm')}
							onChange={(e) => { 
								const {pwdConfirmMessage, bool} = pwdConfirmVaildation({e, pwd: password});
								setPasswordConfirmMessage(pwdConfirmMessage);
								setIsPasswordConfirm(bool);
								setPasswordConfirm(e.target.value);
							}}
						/>
						<p className={`message ${!isPasswordConfirm ? 'error' : ''}`}>{passwordConfirmMessage}</p>
					</li>
					<li className="input-li-yjh">
						<label className={isLabelVisible.name ? '' : 'hidden'}>이름</label>
						<input
							id="name"
							value={name}  
							ref={inputRefs.name}
							type="text"
							placeholder="이름"
							onFocus={() => handleInputFocus('name')}
							onBlur={() => handleInputBlur('name')}
							onChange={(e) => { 
								const {nameMessage, bool} = nameVaildation(e);
								setNameMessage(nameMessage);
								setIsName(bool);
								setName(e.target.value);
							}}
						/>
						<p className={`message ${!isName ? 'error' : ''}`}>{nameMessage}</p>
					</li>
					<li className="input-li-yjh">
						<label className={isLabelVisible.phone ? '' : 'hidden'}>전화번호</label>
						<input
							id="phone"
							value={phone} 
							ref={inputRefs.phone}
							type="text"
							placeholder="전화번호(01012345678)"
							onFocus={() => handleInputFocus('phone')}
							onBlur={() => handleInputBlur('phone')}
							onChange={(e) => { 
								const {phoneMessage, bool} = phoneVaildation(e);
								setPhoneMessage(phoneMessage);
								setIsPhone(bool);
								setPhone(e.target.value);
							}}
						/>
						<p className={`message ${!isPhone ? 'error' : ''}`}>{phoneMessage}</p>
					</li>
				</ul>
				<li><button type='submit' id='join-btn-yjh'>가입</button></li>
				<fieldset id='social-login-yjh'>
					<legend htmlFor="">or</legend>
					<NaverLoginButton/>
					<GoogleLoginButton/>
					<KakaoLoginButton/>
				</fieldset>
			</form>
		</div>
	);
}

export default Join;
