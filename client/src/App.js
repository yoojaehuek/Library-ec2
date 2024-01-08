import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main.js';
import Test from './pages/Test/Test.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js'
import Faq from './pages/Faq/Faq.js';
import FaqDetail from './pages/Faq/FaqDetail.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/test' element={<Test></Test>}></Route>
        <Route path='/faq' element={<Faq></Faq>}></Route>
        <Route path='/faq/:id' element={<FaqDetail></FaqDetail>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
