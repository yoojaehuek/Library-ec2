import React from 'react';
import { NavLink } from 'react-router-dom'
import './Test.scss';

const Test = () => {
  return(
    <div className='test-container-kjh'>
      <h1>test</h1>
      <NavLink to={'/'}>main</NavLink>
    </div>
  )
}

export default Test; 