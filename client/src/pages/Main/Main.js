import React from 'react';
import { NavLink } from 'react-router-dom'
import './Main.scss';

const Main = () => {
  return(
    <div className='main-container-kjh'>
      <h1>메인</h1>
      <NavLink to={'/test'}>test</NavLink>
    </div>
  )
}

export default Main; 