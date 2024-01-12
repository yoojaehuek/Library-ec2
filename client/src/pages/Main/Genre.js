import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';
import GenreLink from '../../components/Main/GenreLink/GenreLink';

const Genre = ({item, index}) => {

  return(
    <div className='main-bottom-container-lhs'>
      <GenreLink item={item} index={index} />
    </div>
  )
}

export default Genre;
