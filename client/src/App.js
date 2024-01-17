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
import FaqDetail from './pages/Faq/FaqDetail.js';
import RentalManage from './pages/rentalmanage/rentalmanage.js';
import Adminmain from './pages/Admin/Adminmain.js'
import Mypage from './pages/Mypage/Mypage.js';
import Check from './pages/Mypage/Check.js';
import MyEdit from './pages/Mypage/MyEdit.js';
import LoanTest from './pages/Cart/loanTest.js';
import Event from './pages/Event/Event.js';
import EventDetail from './pages/Event/EventDetail/EventDetail.js';

const currentPath = window.location.pathname;

function App() {
  return (
    <div className="App">
      {!currentPath.includes('/admin') && <Header />}
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/BookDetail/:id' element={<BookDetail />}></Route>
        <Route path='/booklist' element={<BookList />}></Route>
        <Route path='/join' element={<Join />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/faq' element={<Faq />}></Route>
        <Route path='/faq/:id' element={<FaqDetail />}></Route>
        <Route path='rentalmanage' element={<RentalManage />}></Route>
        <Route path='/admin/*' element={<Adminmain />}></Route>
        <Route path='/mypage' element={<Mypage />}></Route>
        <Route path='/check' element={<Check />}></Route>
        <Route path='/myedit' element={<MyEdit />}></Route>
        <Route path='/loantest' element={<LoanTest />}></Route>
        <Route path='/event' element={<Event />}></Route>
        <Route path='/event/:id' element={<EventDetail />}></Route>
      </Routes>
      {!currentPath.includes('/admin') && <Footer />}
    </div>
  );
}

export default App;