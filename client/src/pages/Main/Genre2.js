import React from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';

const Genre2 = () => {

  return(
    <div className='main-bottom-container-lhs'>
      <NavLink to='/fantasy'>
        <div className='main-bottom-fantsymain-lhs main-bottom-dark2-lhs'>
          <p>상상속의 세상을 꿈 꿔보고 싶으신가요?<br></br>이곳을 클릭해주세요</p>
        </div>
      </NavLink>
      <NavLink to='/comic'>
        <div className='main-bottom-comic-lhs main-bottom-sf-lhs'>
          <p>웃음이 필요한 당신에게<br></br>이곳을 클릭해주세요</p>
        </div>
      </NavLink>
    </div>
  )
}

export default Genre2;
