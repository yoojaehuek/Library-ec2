import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config/contansts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyEdit.scss';

// 로그인 중인 유저 정보 담아서 변수에 담음 화면에 띄움
//아이디는 수정 안됨
// 나머지 온채인지 하면 각변수에 담아서 유효성 검사도 함
// 프로필 수정 누르면 변수에 담으거 배열에 담아서 patch 로 보냄 
const MyEdit = () => {
  const [user, setUser] = useState("");

  const [newPassword, setNewPassword] = useState("");
	const [newpasswordConfirm, setNewPasswordConfirm] = useState("");
	const [newpasswordConfirmMessage, setNewPasswordConfirmMessage] = useState("");
  
  useEffect(() => {
    // 사용자 데이터를 가져오기 위한 API 호출
    axios.get(`${API_URL}/api/user/one`)
      .then(res => {
        // 상태에 사용자 데이터 설정
        // 예를 들어, 응답이 { id, name, email, phone }와 같은 데이터를 가지고 있다면
        console.log("유저 데이터 : ", res);
        setUser(res.data);
        // 나머지 사용자 정보 설정
      })
      .catch(error => {
        // 에러 처리
        console.error('사용자 정보를 가져오는 중 에러 발생:', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  const [newItem, setNewItem] = useState({// 초기값
    email: user.email,
    name: user.name,
    phone: user.phone,
    pwd: '',
    pwdconfirm: '',
  });
  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevData) => ({ ...prevData, [name]: value }));
  };

  const updateUser = () => {  
    // 수정된 사용자 정보를 서버로 보내는 API 호출
    axios.patch(`${API_URL}/api/user/update`, { newItem })
    .then(res => {
      alert('프로필이 성공적으로 업데이트되었습니다!');
    })
    .catch(error => {
      console.error('프로필 업데이트 중 에러 발생:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해 주세요.');
    });
  };

  // /** 이름유효성검사 */
	// const onChangeName = (e) => {
	// 	const currentName = e.target.value;
	// 	setName(currentName);

	// 	if (currentName.length < 2 || currentName.length > 10) {
	// 		setNameMessage("닉네임은 2글자 이상 10글자 이하로 입력해주세요!");
	// 		setIsName(false);
	// 	} else {
	// 		setNameMessage("사용가능한 닉네임 입니다.");
	// 		setIsName(true);
	// 	}
	// };
	// /** 비밀번호 유효성검사 */
	// const onChangePassword = (e) => {
	// 	const currentPassword = e.target.value;
	// 	setPassword(currentPassword);
	// 	const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
	// 	if (!passwordRegExp.test(currentPassword)) {
	// 		setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
	// 		setIsPassword(false);
	// 	} else {
	// 		setPasswordMessage("안전한 비밀번호 입니다.");
	// 		setIsPassword(true);
	// 	}
	// };
	// /** 비밀번호 확인 유효성검사 */
	// const onChangeNewPasswordConfirm = (e) => {
	// 	const currentPasswordConfirm = e.target.value;
	// 	setNewPasswordConfirm(currentPasswordConfirm);
	// 	if (password !== currentPasswordConfirm) {
	// 		setNewPasswordConfirmMessage("비밀번호가 똑같지 않아요!");
	// 		setIsPasswordConfirm(false);
	// 	} else {
	// 		setNewPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
	// 		setIsPasswordConfirm(true);
	// 	}
	// };
	// /** 전화번호 유효성검사 */
	// const onChangePhone = (e) => {
	// 	const currentPhone = e.target.value;
	// 	setPhone(currentPhone);
	// 	const phoneRegExp = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;

	// 	if (!phoneRegExp.test(currentPhone)) {
	// 		setPhoneMessage("올바른 형식이 아닙니다!");
	// 		setIsPhone(false);
	// 	} else {
	// 		setPhoneMessage("사용 가능한 번호입니다:-)");
	// 		setIsPhone(true);
	// 	}
	// };

  return(
    <div className='myedit-container-kjh'>
      <div className='editpageTop-kjh'>
        
        <h1>회원 정보 수정</h1>
      </div>
      <div className='editMain-kjh'>
        <div className='editMain_id-kjh'>
          <label>아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            value={newItem.email}
            readOnly
          />
        </div>
        <div className='editMain_name-kjh'>
          <label>이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newItem.name}
            onChange={handleNewItemChange}
            />
        </div>
        <div className='editMain_newpwd-kjh'>
          <label>새 비밀번호</label>
          <input
            type="password"
            id="pwd"
            name="pwd"
            value={newItem.pwd}
            onChange={handleNewItemChange}
          />
        </div>
        <div className='editMain_newpwdch-kjh'>
          <label>새비밀번호 확인</label>
          <input
            type="password"
            id="pwdConfirm"
            name="pwdConfirm"
            value={newItem.pwdconfirm}
						onChange={handleNewItemChange}
          />
        </div>
        <div className='editMain_phone-kjh'>
          <label>전화번호</label>
          <input
            type="phone"
            id="phone"
            name="phone"
            value={newItem.phone} 
						onChange={handleNewItemChange}
          />
        </div>
        <div className='editMain_btn-kjh'>
          <button type='submit' onClick={updateUser }>프로필 수정</button>
        </div>

      </div>
    </div>
  )
}


export default MyEdit;