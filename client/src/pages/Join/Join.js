import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../config/contansts'
import axios from 'axios';
import PopupDom from '../../components/AddressPopup/PopupDom'; // 우편번호 주소창 
import PopupPostCode from '../../components/AddressPopup/PopupPostCode';  // 우편번호 주소창
import './Join.scss'

function Join() {
	const navigate = useNavigate();
	// 초기값 세팅 - 이메일, 비밀번호, 비밀번호확인, 이름, 전화번호, 주소, 상세주소, 생년-월-일
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
		detailAddr: false,
	});
	const [selectedAddress, setSelectedAddress] = useState('');// 우편번호
	const [selectedYear, setSelectedYear] = useState('');//생년월일
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedDay, setSelectedDay] = useState('');  
	// 각 입력창에 대한 라벨 숨김 및 나타내기를 위한 참조 생성
	const inputRefs = {
		email: useRef(null),
		name: useRef(null),
		password: useRef(null),
		passwordConfirm: useRef(null),
		phone: useRef(null),
		detailAddr: useRef(null),
	};

	/** 생년월일 선택 */
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
	const months = Array.from({ length: 12 }, (_, index) => index + 1);
	const handleDayChange = (e) => { setSelectedDay(e.target.value);};
	const handleMonthChange = (e) => {
		setSelectedMonth(e.target.value);
		// 선택된 월이 변경될 때 선택된 일을 임의로 초기화
		setSelectedDay('');
	};
	const handleYearChange = (e) => {
		setSelectedYear(e.target.value);
		// 선택된 연도가 변경될 때 선택된 일을 임의로 초기화
		setSelectedDay('');
	};
	/** 실제 날자 불러오기 */
	const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
	const days = Array.from({ length: daysInMonth(selectedYear, selectedMonth) }, (_, index) => index + 1);

	const [isPopupOpen, setIsPopupOpen] = useState(false)// 팝업창 상태 관리
	const openPostCode = () => { setIsPopupOpen(true) }// 팝업창 열기
	const closePostCode = () => {	setIsPopupOpen(false)	}// 팝업창 닫기
	const handleSelectedAddress = (address) => { setSelectedAddress(address); };// 선택된 주소를 업데이트하는 콜백 함수
	const handleAddressChange = (e) => { setSelectedAddress(e.target.value); };/** 우편검색 결과가 인풋창에 업데이트 되지않아서 이함수로 업데이트 시켜줌 */

	const onSubmitJoin = async (e) => {// 회원가입
		e.preventDefault();
		const email = e.target.email.value.trim();  //  앞뒤 공백제거
		const pwd = e.target.pwd.value.trim(); 
		const confirmPwd = e.target.confirmPwd.value.trim(); 
		const user_name = e.target.name.value.trim(); 
		const phone = e.target.phone.value.trim(); 
		const address = e.target.address.value.trim(); 
		const detail_address = e.target.detail_address.value.trim();
		// 모두 입력했을 시 실행
		if(pwd === confirmPwd && 
			email !== "" && 
			pwd !== "" && 
			confirmPwd !== "" && 
			user_name !== "" &&
			phone !== "" && 
			address !== "" && 
			detail_address !== "" && 
			selectedYear !== "" && 
			selectedMonth !== "" && 
			selectedDay !== "" &&
			isEmail &&
			isName && 
			isPassword &&
			isPasswordConfirm &&
			isPhone
		){
			axios.post(`${API_URL}/user/join`,{email, pwd, user_name, phone, address, detail_address, selectedYear, selectedMonth, selectedDay})
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

	const handleInputBlur = (inputType) => {
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
				<li className="input-li-yjh">
					<div id='input-li-addr-yjh'>
						<input
							type="text"
							id="address"
							placeholder="주소"
							value={selectedAddress} // 주소 입력 필드의 값을 선택된 주소로 설정
							onChange={handleAddressChange} // 주소 변경을 처리하기 위한 이벤트 핸들러 추가
							disabled='disabled'
						/>
						{/* 버튼 클릭 시 팝업 생성 */}
						<button type='button' onClick={openPostCode}>우편번호 검색</button>
					</div>
					<label className={isLabelVisible.detailAddr ? '' : 'hidden'} >상세주소</label>
					<input
						id="detail_address"
						type="text"
						ref={inputRefs.detailAddr}
						placeholder="상세주소"
						onFocus={() => handleInputFocus('detailAddr')}
						onBlur={() => handleInputBlur('detailAddr')}
					/>
					<div>
						{/* 우편번호 창 팝업 생성 기준 div */}
						<div id='popupDom'>
							{isPopupOpen && (
								<PopupDom>
									{/* onSelectAddress prop을 전달 */}
									<PopupPostCode onSelectAddress={handleSelectedAddress} onClose={closePostCode} />
								</PopupDom>
							)}
						</div>
					</div>
				</li>
			</ul>
			<li><button type='submit' id='join-btn-yjh'>가입</button></li>
		</form>
	</div>
	);
}

export default Join;
