import React, {useState} from 'react';
import { NavLink } from 'react-router-dom'
import './Test.scss';
import NaverLogin from '../../components/NaverLogin/NaverLogin';

const Test = () => {
  const [getToken, setGetToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const naverLogout = () => {
    localStorage.removeItem("com.naver.nid.access_token");
    window.location.href='/test';
  };

  return(
    <div className='test-container-kjh'>
      <h1>test</h1>
      <NaverLogin setGetToken={setGetToken} setUserInfo={setUserInfo} />
      <NavLink to={'/'}>main</NavLink>
      <button onClick={naverLogout}>로그아웃</button>
    </div>
  )
}

export default Test; 