import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios  from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { API_URL } from '../../config/contansts';
import { NavLink } from 'react-router-dom';

const Slider1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [axiosResult, setAxiosResult] = useState([]);

  useEffect(()=>{
    axios.get(`${API_URL}/api/banner`)
    .then(res => {
      setAxiosResult(res.data);
      console.log("응답 데이터: ", res.data);
    }).catch((err) =>{
            console.error(err);
        });
  },[]);

  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
    lazyLoad: 'ondemand',
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div className='slider-container-lhs'>
      <Slider {...settings}>
        {axiosResult.map((slide, index) => (
          <NavLink to='/BookDetail' key={index} className='main-slider-mid-lhs'>
            <div className='main-slider-img-lhs'>
              <img src={API_URL + slide.banner_img_url} alt={`temp${index + 1}`} />
            </div>
            <div className='current-slide-info-lhs'>
              <div className='image-text-lhs'>{slide.banner_title}<br></br><span>{slide.banner_description}</span></div>
            </div>
          </NavLink>
        ))}
      </Slider>
    </div>
  );
}

export default Slider1;
