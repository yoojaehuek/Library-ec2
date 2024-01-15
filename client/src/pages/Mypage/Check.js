import React, {useEffect, useState} from 'react';
import { API_URL } from '../../config/contansts';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import axios from 'axios';
import './Check.scss';

const Check = () => {


  const onSubmitCheckPwd = async (e) => {
    e.preventDefault();
    const pwd = e.target.pwd.value.trim();

    console.log("pwd:", pwd);
    if(pwd !== ""){
      await axios.post(
        `${API_URL}/api/user/password-check`,
        {pwd}
      )
    }
  }

  return (
    <div className='check-container-kjh'>
      <form onSubmit={onSubmitCheckPwd}>
        <div className='checkpageTop-kjh'>
          <h1>계정 정보 확인</h1>
        </div>
        
        <div className='checkMain-kjh'>
          <label>비밀번호</label>
          <input
            type="password"
            id="pwd"
            placeholder="비밀번호"
          />
          <button id="check_btn-kjh" type='submit'>확인</button>
        </div>
      </form>

    </div>
  )





}

export default Check;