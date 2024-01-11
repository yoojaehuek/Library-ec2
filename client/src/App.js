import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main.js';
import BookDetail from './pages/BookDetail/BookDetail.js';
import Test from './pages/Test/Test.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js'
import Join from './pages/Join/Join.js';
import Login from './pages/Login/Login.js';
import Cart from './pages/Cart/Cart.js';
import Faq from './pages/Faq/Faq.js';
import Fear from './pages/BookList/Fear.js'
import Comic from './pages/BookList/Comic.js'
import Fantasy from './pages/BookList/Fantasy.js'
import Mystery from './pages/BookList/Mystery.js'
import Thiller from './pages/BookList/Thiller.js'
import SF from './pages/BookList/SF.js'
import FaqDetail from './pages/Faq/FaqDetail.js';
import RentalManage from './pages/rentalmanage/rentalmanage.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/BookDetail' element={<BookDetail></BookDetail>}></Route>
        <Route path='/test' element={<Test></Test>}></Route>
        <Route path='/fear' element={<Fear></Fear>}></Route>
        <Route path='/fantasy' element={<Fantasy></Fantasy>}></Route>
        <Route path='/mystery' element={<Mystery></Mystery>}></Route>
        <Route path='/comic' element={<Comic></Comic>}></Route>
        <Route path='/thiller' element={<Thiller></Thiller>}></Route>
        <Route path='/sf' element={<SF></SF>}></Route>
        <Route path='/join' element={<Join></Join>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/faq' element={<Faq></Faq>}></Route>
        <Route path='/faq/:id' element={<FaqDetail></FaqDetail>}></Route>
        <Route path='rentalmanage' element={<RentalManage></RentalManage>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;