import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main.js';
import BookDetail from './pages/BookDetail/BookDetail.js';
import Test from './pages/Test/Test.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js'


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/BookDetail' element={<BookDetail></BookDetail>}></Route>
        <Route path='/test' element={<Test></Test>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
