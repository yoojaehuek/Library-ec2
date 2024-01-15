import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main.js';
import BookDetail from './pages/BookDetail/BookDetail.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js'
import Join from './pages/Join/Join.js';
import Login from './pages/Login/Login.js';
import Cart from './pages/Cart/Cart.js';
import Faq from './pages/Faq/Faq.js';
import BookList from './pages/BookList/BookList.js'
import ABanner from './admin/page/ABanner/ABanner.js'
import FaqDetail from './pages/Faq/FaqDetail.js';
import RentalManage from './pages/rentalmanage/rentalmanage.js';
import Adminmain from './pages/Admin/Adminmain.js'
import Mypage from './pages/Mypage/Mypage.js';
import LoanTest from './pages/Cart/loanTest.js';
import Event from './pages/Event/Event.js';

const currentPath = window.location.pathname;

function App() {
  return (
    <div className="App">
      {!currentPath.includes('/admin') && <Header />}
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/BookDetail/:id' element={<BookDetail></BookDetail>}></Route>
        <Route path='/booklist' element={<BookList></BookList>}></Route>
        <Route path='/join' element={<Join></Join>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/faq' element={<Faq></Faq>}></Route>
        <Route path='/faq/:id' element={<FaqDetail></FaqDetail>}></Route>
        <Route path='rentalmanage' element={<RentalManage></RentalManage>}></Route>
        <Route path='/admin/*' element={<Adminmain></Adminmain>}></Route>
        <Route path='/mypage' element={<Mypage></Mypage>}></Route>
        <Route path='/loantest' element={<LoanTest></LoanTest>}></Route>
        <Route path='/event' element={<Event></Event>}></Route>
      </Routes>
      {!currentPath.includes('/admin') && <Footer />}
    </div>
  );
}

export default App;