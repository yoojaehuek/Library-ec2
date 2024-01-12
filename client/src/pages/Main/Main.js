
import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';
import axios from 'axios'
import Slider1 from './Slider';
import MainBook from './MainBook';
import { API_URL } from '../../config/contansts';
import Genre from './Genre';

const Main = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);
  // const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWelcome(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const gridData = [
    { image: '/images/main/Book1/martial.png', text: '전생한 태권도 9단' },
    { image: '/images/main/Book1/web.png', text: '나의 여동생은 연예인' },
    { image: '/images/main/Book1/web1.png', text: '세계 종말까지 2일' },
    { image: '/images/main/Book1/web3.png', text: '붉은 계약' },
    { image: '/images/main/Book1/web4.png', text: '2명의 남자친구' },
    { image: '/images/main/Book1/web5.png', text: '노을이 붉었다' },
  ];

  const genre = [{genre:'문학', content:'3132123'} ,{genre:'기술과학', content:'3132123'}, {genre:'역사', content:'3132123'}];
  const genrebottom = [{genre:'문학', content:'3132123', img_url:'/images/main/horro.png'}, {genre:'철학', content:'213213213철학' ,img_url:'images/main/sf.png'},{genre:'역사', content:'역사', img_url:'images/main/fantasymain.png'},{genre:'종교', content:'역사', img_url:'images/main/thiller.png'}, {genre:'예술', content:'역사', img_url:'images/main/comic.png'}, {genre:'언어', content:'역사', img_url:'images/main/fullbook.png'}];


  return (
    <div className={`main-container-lhs ${showWelcome ? 'show' : ''}`}>
      <div className={`main-content-lhs ${showWelcome ? 'show' : ''}`}>
        <div className={`main-welcome-lhs ${showWelcome ? 'visible' : ''}`}>
          <span>환영합니다<br></br>찾아주셔서 감사합니다.</span>
        </div>
        <div className={`main-top-lhs ${showWelcome ? 'show' : ''}`}>
          <NavLink to="/">
            <div className='main-top-name-lhs'>
              <img src='/images/main/resource.png' alt='' />
              <span>쉿, 지금 제일 핫한 작품 🔥</span>
              <img src='/images/main/resource2.png' className='main-top-img-lhs' alt='' />
            </div>
          </NavLink>
        </div>
        <div className={`main-slider-lhs ${showWelcome ? 'show' : ''}`}>
          <Slider1 />
        </div>
        <div className='mid-content-lhs'>
          <div className={`main-mid-content-lhs  ${showWelcome ? 'show' : ''}`}>
            <div className='main-mid-img-lhs'>
              {gridData.map((item, index) => (
                <NavLink to='/BookDetail' key={index} className='grid-item-lhs'>
                  <img src={item.image} alt={`grid${index + 1}`} />
                  <div className='image-text-lhs'>{item.text}</div>
                </NavLink>
              ))}
            </div>
          </div>
            {genre.map((item, index) => (
              <div className={`main-mid-content-lhs  ${showWelcome ? 'show' : ''}`}>
                <MainBook key={index} Genre={item.genre} /> 
              </div>
            ))}

          <div className={`main-bottom1-content-lhs ${showWelcome ? 'show' : ''}`}>
            <div className='main-bottom-container-lhs'>
              <NavLink to='/test' className='main-bottom-fullbooktop-lhs'>
                <div className='main-bottom-fullbook-lhs'>
                  <p>전체 도서 보러가기</p>
                </div>
              </NavLink>
            </div>
          </div>
          <div className={`main-bottom-content-lhs ${showWelcome ? 'show' : ''}`}>
            {genrebottom.map((item, index) => (
              <Genre key={index} index={index} item={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
