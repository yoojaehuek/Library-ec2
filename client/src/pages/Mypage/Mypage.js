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
  const [showBriefView, setShowBriefView] = useState(false);
  const [userbyReturnedBooks, setUserbyReturnedBooks] = useState([]);
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
      axios.get(`${API_URL}/api/loans/userbyloans`)
        .then(res => {
          setUserbyLoans(res.data);
          console.log("유저 대출정보 : ", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
  }, []);
  // 반납이 완료된 책들만 필터링하여 가져오는 useEffect
  useEffect(() => {
    const returnedBooks = userbyLoans.filter(book => book.is_returned === 1);
    setUserbyReturnedBooks(returnedBooks);
  }, [userbyLoans]);

    
    const toggleShowAllBooks = () => {
      setShowAllBooks(!showAllBooks);
      setShowBriefView(false); // "간략히 보기"를 누르면 전체 보기가 해제되도록 추가
    };
    const toggleShowBriefView = () => {
      setShowBriefView(!showBriefView);
      setShowAllBooks(false); // "더보기"를 누르면 간략히 보기가 해제되도록 추가
    };
    
      const visibleBooks = showAllBooks ? userbyLoans : (showBriefView ? userbyLoans.slice(0, 3) : userbyLoans.slice(0, 3));
    
  return (
    <div className='mypage-container-kjh'>
      <div className='pageTop-kjh'>
        <h1>{user.name}님 환영합니다.</h1>
        <NavLink to='/check' className="myEdit-kjh">내 정보 수정 {'>'}</NavLink>
      </div>

      <div className='myTable-kjh'>
        <div className='rentTable-kjh'>
          <table>
            <tr><td colSpan='4' className='tdTitle-kjh'>대여 중인 책</td></tr>
            {visibleBooks.map((book, index) => (
              <tr key={index}>
                <td className='tWriter-kjh'>{book.Book.book_author}</td>
                <td className='tTitle-kjh'>{book.Book.book_name}</td>
                <td className='tSdate-kjh'>{book.loan_date}</td>
                <td className='tEdate-kjh'>{book.due_date}</td>
              </tr>
            ))}

          </table>
          {/* {!showAllBooks && (
            <NavLink onClick={() => setShowAllBooks(true)} className='more-kjh'>더보기 {'>'}</NavLink>
          )} */}
          {!showAllBooks && !showBriefView && (
            <NavLink onClick={toggleShowAllBooks} className='more-kjh'>더보기 {'>'}</NavLink>
          )}
          {showAllBooks && (
            <NavLink onClick={toggleShowBriefView} className='more-kjh'>간략히 보기 {'>'}</NavLink>
          )}
          {showBriefView && (
            <NavLink onClick={toggleShowAllBooks} className='more-kjh'>더보기 {'>'}</NavLink>
          )}
        </div>
        
        <div className='readTable-kjh'>
          <table>
            <tr><td colSpan='4' className='tdTitle-kjh'>내가 봤던 책</td></tr>
            {userbyReturnedBooks.map((book, index) => (
              <tr key={index}>
                <td className='tWriter-kjh'>{book.Book.book_author}</td>
                <td className='tTitle-kjh'>{book.Book.book_name}</td>
                <td className='tSdate-kjh'>{book.loan_date}</td>
                <td className='tEdate-kjh'>{book.due_date}</td>
              </tr>
            ))}
          </table>
          {!showAllBooks && !showBriefView && (
            <NavLink onClick={toggleShowAllBooks} className='more-kjh'>더보기 {'>'}</NavLink>
          )}
          {showAllBooks && (
            <NavLink onClick={toggleShowBriefView} className='more-kjh'>간략히 보기 {'>'}</NavLink>
          )}
          {showBriefView && (
            <NavLink onClick={toggleShowAllBooks} className='more-kjh'>더보기 {'>'}</NavLink>
          )}
        </div>
      </div>
    </div>
  )


}

export default Mypage;