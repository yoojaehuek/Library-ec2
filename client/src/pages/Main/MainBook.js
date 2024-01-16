import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios  from 'axios';
import { API_URL } from '../../config/contansts';
import './Main.scss';

const MainBook = ({Genre}) => {
  const [axiosResult, setAxiosResult] = useState([]);

  useEffect(()=>{
    axios.get(`${API_URL}/api/book?book_genre=${Genre}&limit=5`)
    .then(res => {
      setAxiosResult(res.data);
      console.log("응답 데이터: ", res.data);
    }).catch((err) =>{
            console.error(err);
        });
  },[]);


return (
    <div className='main-mid-container-lhs '>
      <div className='main-mid-top-lhs'>
        <h1>{Genre}</h1>
      </div>
      <div className='main-mid-img-lhs'>
        {axiosResult.map((item, index) => (
          <NavLink to={`/BookDetail/${item.book_id}`}key={index} className='grid-item-lhs'>
            <img src={API_URL + item.book_img_url} alt={`grid${index + 1}`} />
            <div className='image-text-lhs'>{item.book_name}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default MainBook;