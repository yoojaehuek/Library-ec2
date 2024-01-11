import React from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';

const MainBook3 = () => {

const gridData = [
  { image: '/images/main/Slider/dark.png', text: '맥북으로 일하는 저승사자' },
  { image: '/images/main/Slider/level.png', text: '일어나보니 이세계' },
  { image: '/images/main/Slider/fantasy.png', text: '9서클 마법사가 여자?' },
  { image: '/images/main/Book2/mystey.png', text: '숲속의 저택' },
  { image: '/images/main/Book2/thriller.png', text: '회귀한 회사원' },
  { image: '/images/main/Book2/thriller2.png', text: '대저택 살인사건' },
];

return (
    <div className='main-mid-container-lhs'>
      <div className='main-mid-top-lhs'>
        <h1>판타지(Fantasy)/미스터리/스릴러 (Mystery/Thriller)</h1>
      </div>
      <div className='main-mid-img-lhs'>
        {gridData.map((item, index) => (
          <NavLink to='/BookDetail' key={index} className='grid-item-lhs'>
            <img src={item.image} alt={`grid${index + 1}`} />
            <div className='image-text-lhs'>{item.text}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default MainBook3;