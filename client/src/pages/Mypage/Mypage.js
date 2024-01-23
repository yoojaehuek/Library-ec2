import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Mypage.scss';
import axios from 'axios';
import { API_URL } from '../../config/contansts';
import LoansTable from '../../components/Mypage/LoansTable/LoansTable';
import { LiaUserEditSolid } from "react-icons/lia";
import { errHandler } from "../../utils/globalFunction";
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";

const Mypage = () => {
  const [islogin, setIslogin] = useRecoilState(loginState);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState([]);
  const [event, setEvent] = useState([]);
  const [faq, setFaq] = useState([]);



  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user/one`);
      setUser(res.data);
      setUserId(res.data.user_id);
    } catch (error) {
      const {reLogin} = errHandler(error);
      if (reLogin === true) {
        setIslogin(false);
      }
    }
  }

  const getUserEvent = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/event_applicants/user`);
      setEvent(res.data);
      console.log("이벤트 : ", res.data);
    } catch (error) {
      console.error('이벤트 에러res:', error);
    }
  }

  const getUserFaq = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/faq/user`);
      setFaq(res.data);
      console.log("FAQ : ", res.data);
    } catch (error) {
      console.error('Faq 에러res:', error);
    }
  }

  useEffect(()=>{
    getUser();
    getUserEvent();
    getUserFaq();
  },[]);


  return (
    <div className='mypage-container-kjh'>
      <div className='pageTop-kjh'>
        <h1>{user.name}님 환영합니다.</h1>
        <NavLink to='/check' className="myEdit-kjh"><LiaUserEditSolid/>내 정보 수정/탈퇴 {'>'}</NavLink>
      </div>

  

      <div className='myTable-kjh'>

        <div className='abc-kjh'>
          <LoansTable is_returned={false}/>
        </div>
        <div className='abc-kjh'>
          <LoansTable is_returned={true}/>
        </div>
       
        <div className='myEvent-kjh'>
          <table>
            <tr>
              <td>내가 신청한 이벤트</td>
            </tr>
            {event.map((item, index) => (
              <tr>
                <td><img src={API_URL+item.Event.event_img_url}></img></td>
                <td>{item.Event.event_title}</td>
                <td>{item.Event.event_start_date}</td>
                <td>{item.Event.event_end_date}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className='myFaq-kjh'></div>
      </div>
    </div>
  )


}

export default Mypage;