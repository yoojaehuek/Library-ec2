import React, { useState } from 'react';
import { API_URL } from '../../../config/contansts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Check.scss';

const Check = () => {

  const navigate = useNavigate();
  const [ checkPwd, setCheckPwd ] = useState(true);

  const onSubmitCheckPwd = async (e) => {
    e.preventDefault();
    const pwd = e.target.pwd.value.trim();

    console.log("pwd:", pwd);
    if(pwd !== ""){ 
      const res = await axios.post(
        `${API_URL}/api/user/password-check`,
        {pwd}
      )

      console.log("res.status : ", res.data);

      if(res.data.status == true){
        navigate('/myedit');
      } else {
        setCheckPwd(false);
      }
    }
  }
  const handleClose = () => {
    navigate(-1);
  }

  return (
    <div className='check-container-kjh'>
      <form onSubmit={onSubmitCheckPwd}>
        <div className='checkpageTop-kjh'>
          <h1>계정 정보 확인</h1>
        </div>
        
        <div className='checkMain-kjh'>
          <label>비밀번호</label>
          {!checkPwd && <span style={{ float: 'right', color: 'red'}}>비밀번호 불일치!</span>}
          <input
            type="password"
            id="pwd"
            placeholder="비밀번호"
          />
          <button className='check_cancell-kjh' type='button' onClick={handleClose}>취소</button>
          <button className='check_button-kjh' type='submit'>확인</button>
        </div>
      </form>

    </div>
  )





}

export default Check;