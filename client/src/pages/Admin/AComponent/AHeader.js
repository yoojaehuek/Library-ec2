import React from 'react';
import { Link } from 'react-router-dom';

const AHeader = () => {
  return (
    <header style={headerStyle}>
      <img src={`${process.env.PUBLIC_URL}/images/Footer/kakao.svg`} alt='로고' style={logoStyle} />
      <button style={ButtonStyle}><Link to='/admin/test'>로그인</Link></button>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1vw',
};

const logoStyle = {
  width: '50px',
  height: '50px',
};

const ButtonStyle = {
  padding: '8px',
  marginLeft: '10px',
};

export default AHeader;
