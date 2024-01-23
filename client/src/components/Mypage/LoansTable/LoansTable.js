import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './LoansTable.scss';
import axios from 'axios';
import { API_URL } from '../../../config/contansts';
import LoansRow from '../LoansRow/LoansRow';

const LoansTable = ({is_returned}) => {
  console.log(is_returned);
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [showBriefView, setShowBriefView] = useState(false);
  const [userbyLoans, setUserbyLoans] = useState([]);

   /** 받은 유저id로 유저 대출정보 조회요청 */
  useEffect(() => {
    axios.get(`${API_URL}/api/loans/userbyloans`)
      .then(res => {
        const loansBooks = res.data.filter(book => book.is_returned === is_returned);
        setUserbyLoans(loansBooks);
        console.log("대출한 책 : ", loansBooks);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
    <div className='rentTable-kjh'>
      <table>
        <tr><td colSpan='5' className='tdTitle-kjh'>{is_returned ? "내가 봤던 책" : "대여 중인 책"}</td></tr>
        {visibleBooks.map((book, index) => (
          <LoansRow 
            book={book} 
            index={index}
          />
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
  )
}


export default LoansTable;

