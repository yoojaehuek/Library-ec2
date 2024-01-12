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

  // 장르에 따라 다른 링크 설정
  const getGenreLink = (genre) => {
    switch (genre) {
      case '문학':
        return '/BookList'; // 원하는 Fantasy 페이지의 링크로 변경
      case 'Comic':
        return '/comicLink'; // 원하는 Comic 페이지의 링크로 변경
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
