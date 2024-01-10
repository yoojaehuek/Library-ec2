import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink } from 'react-router-dom';

const Slider1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideData, setSlideData] = useState([
    { image: '/images/main/Slider/dark.png', text1: '맥북으로 일하는 저승사자', text2: '일하기 싫은 저승사자 그의 운명은....' },
    { image: '/images/main/Slider/empero.png', text1: '내가 황제?', text2: '어쩌다보니 황제가 되어버린 나' },
    { image: '/images/main/Slider/fantasy.png', text1: '9서클 마법사가 여자?', text2: '최초로 9서클이 된 나 어떤 운명이 기다릴까?' },
    { image: '/images/main/Slider/level.png', text1: '일어나보니 이세계', text2: '익숙하지 않은 공기.. 여긴 이세계?' },
    { image: '/images/main/Slider/succubus.png', text1: '도서관에 서큐버스가?', text2: '도서관에 일하는 서큐버스와의 이야기' },
  ]);

  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
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
        {slideData.map((slide, index) => (
          <NavLink to='/test' key={index} className='main-slider-mid-lhs'>
            <div className='main-slider-img-lhs'>
              <img src={slide.image} alt={`temp${index + 1}`} />
            </div>
            <div className='current-slide-info-lhs'>
              <div className='image-text-lhs'>{slide.text1}<br></br><span>{slide.text2}</span></div>
            </div>
          </NavLink>
        ))}
      </Slider>
    </div>
  );
}

export default Slider1;
