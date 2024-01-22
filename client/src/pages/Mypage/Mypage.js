import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Mypage.scss';
import axios from 'axios';
import { API_URL } from '../../config/contansts';
import LoansTable from '../../components/Mypage/LoansTable/LoansTable';
import { LiaUserEditSolid } from "react-icons/lia";

const Mypage = () => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState({});
  const [event, setEvent] = useState({});
  useEffect(()=>{
    axios.get(`${API_URL}/api/user/one`)
    .then(res => {
      setUser(res.data);
      setUserId(res.data.user_id);
      console.log("받은 유저정보: ", res.data);
    }).catch((err) =>{
      console.error(err);
    });
  },[]);
  useEffect(()=>{
    axios.get(`${API_URL}/api/event_applicants/user`)
    .then(res => {
      setEvent(res.data);
      setUserId(res.data.user_id);
      console.log("getAllByUserTesting", res.data);
    }).catch((err) => {
      console.error(err);
    });
  },[]);
  console.log("아앙아앙: ", user);
  return (
    <div className='mypage-container-kjh'>
      <div className='pageTop-kjh'>
        <h1>{user.name}님 환영합니다.</h1>
        <NavLink to='/check' className="myEdit-kjh"><LiaUserEditSolid/>내 정보 수정/탈퇴 {'>'}</NavLink>
      </div>

  

      <div className='myTable-kjh'>

        <LoansTable is_returned={false}/>
        <LoansTable is_returned={true}/>

      </div>
    </div>
  )


}

export default Mypage;