import React from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';

const Genre = () => {

  return(
    <div className='main-bottom-container-lhs'>
      <NavLink to='/Fear'>
        <div className='main-bottom-dark2-lhs'>
          <p>오싹한 느낌이 필요하신가요?<br></br>이곳을 클릭해주세요</p>
        </div>
      </NavLink>
      <NavLink to='/SF'>
        <div className='main-bottom-sf-lhs'>
          <p>우주의 공활함이 필요하신가요?<br></br>이곳을 클릭해주세요</p>
        </div>
      </NavLink>
    </div>
  )
}

export default Genre;
