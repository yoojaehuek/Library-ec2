import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Review.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/contansts';


const Review = () => {
  const [book, setBook] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`${API_URL}/api/book`)
    .then(res => {
      console.log("setBook : ", setBook);
      setBook(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);


  const handleClose = () => {
    navigate(-1);
  }


  return (
    <div className='reivew-container-kjh'>



      <button className='review_cancell-kjh' type='button' onClick={handleClose}>취소</button>
      <button className='review_button-kjh' type='submit'>완료</button>
    </div>
  )
}


export default Review;