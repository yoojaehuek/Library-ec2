import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AListbar from './AComponent/AListbar.js';
import './Adminmain.scss';
// import { getCookie } from '../utils/cookie.js';

const AdminMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
//   useEffect(() => {
//     console.log("location: ", location);
//     if(!getCookie('login')){
//       alert('다시 로그인 해주세요');
//       navigate('/admin/login');
//     }
//   }, [location]);

  return (
    // <div id='Admin' style={{ display: 'flex', flexDirection: 'column'}}>
    <div id='Admin' >
      <AListbar id='Listbar' />
      <div className='AdminMain' style={{padding: ' 50px 0 100px'}}>
        <Routes>

        </Routes>
      </div>
    </div>
  );
};


export default AdminMain;
