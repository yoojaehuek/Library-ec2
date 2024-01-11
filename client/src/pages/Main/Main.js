
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';
import Slider1 from './Slider';
import MainBook from './MainBook';
import MainBook2 from './MainBook2';
import MainBook3 from './MainBook3';
import MainBook4 from './MainBook4';
import Genre from './Genre';
import Genre2 from './Genre2';
import Genre3 from './Genre3';

const Main = () => {
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
          <div className={`main-mid-content-lhs  ${showWelcome ? 'show' : ''}`}>
            <MainBook />
          </div>
          <div className={`main-mid-content-lhs  ${showWelcome ? 'show' : ''}`}>
            <MainBook2 />
          </div>
          <div className={`main-mid-content-lhs  ${showWelcome ? 'show' : ''}`}>
            <MainBook3 />
          </div>
          <div className={`main-mid-content-lhs  ${showWelcome ? 'show' : ''}`}>
            <MainBook4 />
          </div>
          <div className={`main-bottom-content-lhs ${showWelcome ? 'show' : ''}`}>
            <div className='main-bottom-container-lhs'>
              <NavLink to='/test' className='main-bottom-fullbooktop-lhs'>
                <div className='main-bottom-fullbook-lhs'>
                  <p>전체 도서 보러가기</p>
                </div>
              </NavLink>
            </div>
          </div>
          <div className={`main-bottom-content-lhs ${showWelcome ? 'show' : ''}`}>
            <Genre/>
          </div>
          <div className={`main-bottom-content-lhs ${showWelcome ? 'show' : ''}`}>
            <Genre2/>
          </div>
          <div className={`main-bottom-content-lhs ${showWelcome ? 'show' : ''}`}>
            <Genre3/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
