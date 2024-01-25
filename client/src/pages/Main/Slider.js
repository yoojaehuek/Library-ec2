import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { API_URL } from '../../config/contansts';
import { NavLink } from 'react-router-dom';

const Slider1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [axiosResult, setAxiosResult] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(window.innerWidth <= 767 ? 1 : 3);

  useEffect(() => {
    axios.get(`${API_URL}/api/banner`)
      .then(res => {
        setAxiosResult(res.data);
        console.log("응답 데이터: ", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(1);
      }
    };

    // 페이지 로딩 시에도 한 번 호출하여 초기값 설정
    handleResize();

    // 창 크기가 변경될 때마다 이벤트 핸들러를 호출합니다.
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시에 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    centerMode: true,
    lazyLoad: 'ondemand',
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div className='slider-container-lhs'>
      <Slider {...settings}>
        {axiosResult.map((slide, index) => (
          <NavLink to={slide.banner_adress} key={index} className='main-slider-mid-lhs'>
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
