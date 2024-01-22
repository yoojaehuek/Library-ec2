import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config/contansts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { errHandler } from "../../../utils/globalFunction";
import { useRecoilState } from "recoil";
import { loginState } from "../../../recoil/atoms/State";
import './MyEdit.scss';

// 로그인 중인 유저 정보 담아서 변수에 담음 화면에 띄움
//아이디는 수정 안됨
// 나머지 온채인지 하면 각변수에 담아서 유효성 검사도 함
// 프로필 수정 누르면 변수에 담으거 배열에 담아서 patch 로 보냄 
const MyEdit = () => {
  const navigate = useNavigate();
  const [islogin, setIslogin] = useRecoilState(loginState); //useState와 거의 비슷한 사용법
  const [user, setUser] = useState({});
  const [newItem, setNewItem] = useState({
    email: '',
    name: '',
    phone: '',
    pwd: '',
    pwdconfirm: '',
  });
  // const [selectedItem, setSelectedItem] = useState(null);
  const [newPassword, setNewPassword] = useState("");
	const [newpasswordConfirm, setNewPasswordConfirm] = useState("");
	const [newpasswordConfirmMessage, setNewPasswordConfirmMessage] = useState("");
  
  useEffect(() => {
    axios.get(`${API_URL}/api/user/one`)
      .then(res => {
        setUser(res.data);
      })
      .catch(error => {
        // console.error('사용자 정보를 가져오는 중 에러 발생:', error);
        const {reLogin} = errHandler(error);
        if (reLogin === true) {
          setIslogin(false);
        }
      });
  }, []);

  useEffect(() => {
    setNewItem((prevData) => ({
      ...prevData,
      email: user.email,
      name: user.name,
      phone: user.phone,
      pwd: '',
      pwdconfirm: '',
    }));
  }, [user]);

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevData) => ({ 
      ...prevData, 
      [name]: value }));
  };

  const handleClose = () => {
    navigate('/mypage');
  }
  const handleClose_home = () => {
    navigate('/');
  }

  //수정2
  const updateUser = () => {
    let updatedItem = {
      user_name: newItem.name,
      user_phone: newItem.phone,
    };
    if(newItem.pwd.length > 0 && newItem.pwd === newItem.pwdconfirm) {
      updatedItem.user_pwd = newItem.pwd;
    }else if(newItem.pwd !== newItem.pwdconfirm){
      alert("비밀번호가 똑같지 않아요");
      return;
    }

      console.log("수정: ", updatedItem);
      const userConfirmed = window.confirm('수정하시겠습니까?');

      if(userConfirmed) {
        console.log("업데이트아이템: ", updatedItem);
        axios.patch(`${API_URL}/api/user`, updatedItem)
          .then(() => {
            alert('프로필이 성공적으로 업데이트되었습니다!');
            handleClose();
          })
          .catch(error => {
            // console.error('프로필 업데이트 중 에러 발생:', error);  
            // alert('프로필 업데이트에 실패했습니다. 다시 시도해 주세요.');
            const {reLogin} = errHandler(error);
            if (reLogin === true) {
              setIslogin(false);
            }
          });
      } else {
        return;
      }
  };

  const withdrawUser = () => {
    const userConfirmed = window.confirm('정말로 회원 탈퇴하시겠습니까?');

    if (userConfirmed) {
      axios.delete(`${API_URL}/api/user`)
        .then(() => {
          alert('회원 탈퇴가 성공적으로 처리되었습니다.');
          handleClose_home();
        })
        .catch(error => {
          // console.error('회원 탈퇴 중 에러 발생:', error);  
          // alert('회원 탈퇴에 실패했습니다. 다시 시도해 주세요.');
          const {reLogin} = errHandler(error);
          if (reLogin === true) {
            setIslogin(false);
          }
        });
    }
  };

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
            // placeholder={newItem.email}
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
            // placeholder={newItem.name}
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
            id="pwdconfirm"
            name="pwdconfirm"
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
            placeholder={newItem.phone}
            // value={newItem.phone} 
						onChange={handleNewItemChange}
          />
        </div>
        <div className='editMain_btn-kjh'>
          <button className='button_cancell-kjh' type='button' onClick={handleClose}>취소</button>
          <button className='button_edit-kjh' type='button' onClick={updateUser}>프로필 수정</button>
        </div>
        <div className='withdraw-kjh'>
          <button className='withdrawbtn-kjh' type='button' onClick={withdrawUser}>회원 탈퇴</button>
        </div>
      </div>
    </div>
  )
}


export default MyEdit;