import React from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';

const Genre3 = () => {

  return(
    <div className='main-bottom-container-lhs'>
      <NavLink to='/mystery'>
        <div className='main-bottom-mystery-lhs main-bottom-dark2-lhs'>
          <p>미스테리한 세상속에서 같이 살아남아보세요!<br></br>이곳을 클릭해주세요</p>
        </div>
      </NavLink>
      <NavLink to='/thiller'>
        <div className='main-bottom-thiller-lhs main-bottom-sf-lhs'>
          <p>흥미진지한 이야기를 지금 보러가세요<br></br>이곳을 클릭해주세요</p>
        </div>
      </NavLink>
    </div>
  )
}

export default Genre3;
