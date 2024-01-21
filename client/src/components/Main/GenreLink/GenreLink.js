import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../pages/Main/Main.scss';

const GenreLink = ({ item, index }) => {
  const [ClassName, setClassName] = useState(
    index % 2 === 0
      ? 'main-bottom-fantsymain-lhs main-bottom-dark2-lhs'
      : 'main-bottom-comic-lhs main-bottom-sf-lhs'
  );

  // 장르에 따라 다른 페이지 URL을 반환
  const getGenreLink = (genre) => {
    switch (genre) {
      case '문학':
        return '/BookList?genre=문학'; // 원하는 Literary 페이지의 링크로 변경
      case '철학':
        return '/BookList?genre=철학'; 
      case '역사':
        return '/BookList?genre=역사';
      case '종교':
        return '/BookList?genre=종교';
      case '예술':
        return '/BookList?genre=예술';
      case '언어':
        return '/BookList?genre=언어';
      default:
        return '/';
    }
  };

  return (
    <NavLink to={getGenreLink(item.genre)}>
      <div className={ClassName} style={{ backgroundImage: `url(${item.img_url})` }}>
        <p>{item.genre}</p>
      </div>
    </NavLink>
  );
};

export default GenreLink;
