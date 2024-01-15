import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AListbar from './AComponent/AListbar.js';
import './Adminmain.scss';
import AChart from './AComponent/AChart.js';
import AHeader from './AComponent/AHeader.js';
import ALogin from './ALogin/ALogin.js';
import AFaq from './AFaq/AFaq.js';
import AUser from './AUser/AUser.js';
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
      <AHeader id='Header' />
      <div className='AdminMain' style={{padding: ' 0 0 100px'}}>
        <Routes>
        <Route path='/' element={<AChart></AChart>}></Route>
        <Route path='/test' element={<ALogin />} />
        <Route path='/faq/faq' element={<AFaq />} />
        <Route path='/user/user' element={<AUser />} />
        </Routes>
      </div>
    </div>
  );
};


export default AdminMain;
