import React from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';

const MainBook = () => {

const gridData = [
  { image: '/images/main/Book1/martial.png', text: '전생한 태권도 9단' },
  { image: '/images/main/Book1/web.png', text: '나의 여동생은 연예인' },
  { image: '/images/main/Book1/web1.png', text: '세계 종말까지 2일' },
  { image: '/images/main/Book1/web3.png', text: '붉은 계약' },
  { image: '/images/main/Book1/web4.png', text: '2명의 남자친구' },
  { image: '/images/main/Book1/web5.png', text: '노을이 붉었다' },
];

return (
    <div className='main-mid-container-lhs '>
      <div className='main-mid-top-lhs'>
        <h1>최신 도서</h1>
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

export default MainBook;