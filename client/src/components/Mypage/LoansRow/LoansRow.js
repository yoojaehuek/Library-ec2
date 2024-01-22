import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../config/contansts';
import './LoansRow.scss';
import { PiPencilLineDuotone } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";

const LoansRow = ({book, index}) => {
  const [reviewCheckData, setReviewCheckData] = useState();
  
  const reviewCheck = async() => {
    const res = await axios.get(`${API_URL}/api/review/check?book_id=${book.Book.book_id}`);
    console.log("리뷰 체크 res : ", res);
    setReviewCheckData(res.data);
  };

  useEffect(() => {
    reviewCheck()
  }, []);

  return (
    <tr key={index} className='loansrow-kjh'>
      <td className='tWriter-kjh'>{book.Book.book_author}</td>
      <td className='tTitle-kjh'>{book.Book.book_name}</td>
      <td className='tSdate-kjh'>{book.loan_date}</td>
      <td className='tEdate-kjh'>{book.due_date}</td>
      <td className='reviewbtn-kjh'>
        {reviewCheckData ? 
          <NavLink to={`/BookDetail/${book.Book.book_id}`} className="reviewBtn-kjh"><IoSearch/>리뷰 보러 가기</NavLink>
          : 
          <NavLink to={`/review/${book.Book.book_id}`} className="reviewBtn-kjh"><PiPencilLineDuotone/>리뷰 쓰러 가기</NavLink>
        }
      </td>
    </tr>
  )
}

export default LoansRow;