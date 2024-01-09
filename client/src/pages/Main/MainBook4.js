import React from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';

const MainBook2 = () => {

const gridData = [
  { image: '/images/main/Book3/web6.png', text: '사쿠라가 지는 밤' },
  { image: '/images/main/Book3/web7.png', text: '왕궁의 황녀' },
  { image: '/images/main/Book3/web8.png', text: '그녀의 마음을 훔쳐라' },
  { image: '/images/main/Book3/web9.png', text: '아이돌도 연애를 할 수 있을까?' },
  { image: '/images/main/Book3/web10.png', text: '도도한 물리치료사' },
  { image: '/images/main/Book3/web11.png', text: '얼음왕국에 사는 그녀' },
  { image: '/images/main/Book3/web12.png', text: '사내 연애' },
  { image: '/images/main/Book3/web13.png', text: '벚꽃이 피는 날' },
];

return (
    <div className='main-mid-container-lhs'>
      <div className='main-mid-top-lhs'>
        <h1>로맨스(Romance)</h1>
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

export default MainBook2;