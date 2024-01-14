import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Mypage.scss';
import axios from 'axios';
import { API_URL } from '../../config/contansts';

const Mypage = () => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState({});
  const [userbyLoans, setUserbyLoans] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(false);
  // const [book, setBook] = useState({});
  // const [loans, setLoans] = useState([]);

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
  /** 받은 유저id로 유저 대출정보 조회요청 */
  useEffect(() => {
    if (userId) { 
      axios.get(`${API_URL}/api/loans/userbyloans/${userId}`)
        .then(res => {
          setUserbyLoans(res.data);
          console.log("유저 대출정보 : ", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userId]);
    // console.log("유저 대출정보 : ", userbyLoans);

  const visibleBooks = showAllBooks ? userbyLoans : userbyLoans.slice(0, 3);
 
  return (
    <div className='mypage-container-kjh'>
      <div className='pageTop-kjh'>
        <h1>{user.name}님 환영합니다.</h1>
        <NavLink to='/' className="myEdit-kjh">내 정보 수정 {'>'}</NavLink>
      </div>

      <div className='myTable-kjh'>
        <div className='rentTable-kjh'>
          <table>
            <tr><td colSpan='4' className='tdTitle-kjh'>대여 중인 책</td></tr>

          
            {visibleBooks.map((book, index) => (
              <tr key={index} >
                <td className='tWriter-kjh'>작가</td>
                <td className='tTitle-kjh'>제목</td>
                <td className='tSdate-kjh'>{book.loan_date}</td>
                <td className='tEdate-kjh'>{book.due_date}</td>
              </tr>
            ))}


          </table>
          {!showAllBooks && (
            <NavLink onClick={() => setShowAllBooks(true)} className='more-kjh'>더보기 {'>'}</NavLink>
          )}
          
        </div>
        
        <div className='readTable-kjh'>
          <table>
            <tr><td colSpan='4' className='tdTitle-kjh'>내가 봤던 책</td></tr>
            <tr>
              <td className='tWriter-kjh'>작가</td>
              <td className='tTitle-kjh'>제목</td>
              <td className='tSdate-kjh'>대여시작일</td>
              <td className='tEdate-kjh'>반납일</td>
            </tr>
            <tr>
              <td className='tWriter-kjh'>작가</td>
              <td className='tTitle-kjh'>제목</td>
              <td className='tSdate-kjh'>대여시작일</td>
              <td className='tEdate-kjh'>반납일</td>
            </tr>
            <tr>
              <td className='tWriter-kjh'>작가</td>
              <td className='tTitle-kjh'>제목</td>
              <td className='tSdate-kjh'>대여시작일</td>
              <td className='tEdate-kjh'>반납일</td>
            </tr>
          </table>
          <NavLink className='more-kjh'>더보기 {'>'}</NavLink>
        </div>
      </div>
    </div>
  )


}

export default Mypage;