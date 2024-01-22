import React from 'react';
import { Link } from 'react-router-dom';
import A from './A.scss';

const AHeader = () => {
  return (
    <header style={headerStyle}>
      {/* <img
        src={`${process.env.PUBLIC_URL}/adminlogo.png`}
        alt='로고'
        style={logoStyle}
        className="logo-kjn"
      /> */}
      <button style={buttonStyle}>
        <Link to='/admin/login' style={linkStyle}>로그인</Link>
      </button>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  padding: '1vw',
};

// const logoStyle = {
//   width: '100px',
//   height: '50px',
// };

const buttonStyle = {
  padding: '10px 20px',
  marginLeft: '10px',
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s ease-in-out',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};



export default AHeader;
