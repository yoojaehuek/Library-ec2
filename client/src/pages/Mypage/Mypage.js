import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Mypage.scss';
import axios from 'axios';
import { API_URL } from '../../config/contansts';

const Mypage = () => {
  const [user, setUser] = useState({});
  const [book, setBook] = useState({});
  const [loans, setLoans] = useState([]);

  useEffect(()=>{
    axios.get(`${API_URL}/api/user/one`)
    .then(res => {
      setUser(res.data);
    }).catch((err) =>{
        console.error(err);
      });
  },[]);
  useEffect(()=>{
    axios.get(`${API_URL}/api/book`)
    .then(res => {
      console.log(res.data);
      setBook(res.data[0]);
    }).catch((err) =>{
        console.error(err);
      });
  },[]);
  useEffect(()=>{
    axios.get(`${API_URL}/api/loans`)
    .then(res => {
      setLoans(res.data);
    }).catch((err) =>{
        console.error(err);
      });
  },[]);


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
            {/* {currentItems.map((book, index) => { */}
              {/* // currentItems =[
              //   {id:1, name: "김정혁", "남"},
              //   {id:2, name: "유재혁", "여"}
              // ] */}
              <tr>
                <td className='tWriter-kjh'>{book.book_author}</td>
                <td className='tTitle-kjh'>{book.book_name}</td>
                <td className='tSdate-kjh'>{loans.loan_date}</td>
                <td className='tEdate-kjh'>{loans.due_date}</td>
              </tr>
            {/* })} */}
            ;
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