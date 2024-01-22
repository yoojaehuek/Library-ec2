import React, { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import './Header2.scss';
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { API_URL } from '../../config/contansts';
import { FaRegUser } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { CiLogin } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";

const Header2 = () => {
  const [buttonClassName, setButtonClassName] = useState('');
  const [isKeyLayerVisible, setKeyLayerVisible] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginState); //useState와 거의 비슷한 사용법
  const [activeMenu, setActiveMenu] = useState('');
  const [activeGenre, setActiveGenre] = useState('');


  const logout = async () => {
    axios.get(`${API_URL}/logout`, { withCredentials: true })
      .then(()=>{
        setIsLogin(false);
      })
      .catch((err) => {
        console.log("logout/err: ", err);
      })
  } 
  

  const genres = [
    '총류', '철학', '종교', '사회과학', '자연과학',
    '기술과학', '예술', '언어', '문학', '역사'
  ];

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
  };


  const handleMouseOver = () => {
    setButtonClassName('ovr');
  };
  const handleMouseOut = () => {
    setButtonClassName('');
  };
  const handleSearchClick = () => {
    setKeyLayerVisible(true);
  };
  const handleLayerClose = (event) => {
    event.preventDefault(); // 기본 동작 중단
    setKeyLayerVisible(false);
  };
  
  const handleMouseMove = (event) => {
    const genresContainer = document.querySelector('.Llist-kjh');
    const rect = genresContainer.getBoundingClientRect();
    const mouseX = event.clientX - rect.left; // 마우스 X 좌표
    const width = genresContainer.offsetWidth;
    const genreIndex = Math.floor((mouseX / width) * genres.length);

    if (genreIndex >= 0 && genreIndex < genres.length) {
      setActiveGenre(genres[genreIndex]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div className='header-container-kjh'>
      <div className='header-content-lim'>
        <div className='header-top-green-lim'></div>
        <div className='header-item-lim'>
          <NavLink to="/">
            <img src='/images/Header/logo.png'></img>
          </NavLink>  
          <div className='LHeaderWrap-kjh'>
          <NavLink
              to="/"
              activeClassName="active"
              exact
              onClick={() => setActiveMenu('Best')}
            >
              <span className={activeMenu === 'Best' ? 'active' : ''}>Best</span>
            </NavLink>
            <NavLink
              to="/booklist"
              activeClassName="active"
              exact
              onClick={() => setActiveMenu('BookList')}
            >
              <span className={activeMenu === 'BookList' ? 'active' : ''}>모든 도서</span>
            </NavLink>
            <NavLink
              to="/faq"
              activeClassName="active"
              exact
              onClick={() => setActiveMenu('FAQ')}
            >
              <span className={activeMenu === 'FAQ' ? 'active' : ''}>Faq</span>
            </NavLink>
            <NavLink
              to="/event"
              activeClassName="active"
              exact
              onClick={() => setActiveMenu('Event')}
            >
              <span className={activeMenu === 'Event' ? 'active' : ''}>Event</span>
            </NavLink>
          </div>
          <div className='LSearch-kjh'>
            <form className='LForm-kjh'>
              <div className='schIpt-kjh'>
                <input 
                type='text' 
                title='검색어 입력' 
                placeholder='검색어 입력'
                className='iptTxt-kjh' 
                maxLength="80"
                onClick={handleSearchClick}
                >
                </input>
              </div>
              <div className='schBtn-kjh'>
                <button
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  type='submit'
                  title='검색'
                  className={buttonClassName}>
                  <IoIosSearch/>
                </button>
              </div>
              {isKeyLayerVisible && (
                <>
                  <div className='keyLayer-kjh'>
                    <div className='key_lastest-kjh'>
                      <dl className='lastest_word-kjh'>
                        <dt>최근 검색어</dt>
                      </dl>
                      <div className='lastest_ad-kjh'>
                        <div className='noData-kjh'>
                            <span>최근 검색 내역이 없습니다.</span>
                        </div>
                        <div className='lastest_close-kjh'>
                          <div className='lastest_delAll-kjh'>
                            <a href='' className='lnk_delAll-kjh'><em className='txt-kjh'>검색기록 삭제</em></a>
                          </div>
                          <a href="#" className="lnk_close-kjh" onClick={handleLayerClose}>
                            <em className='txt-kjh' style={{paddingRight:"10px"}}>닫기</em>
                            <em className='icon_del-kjh'></em>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
          <div className='util-kjh'>
            {isLogin ? 
              <>
              {/* 로그인 하고 난 후 */}
                <NavLink to="/mypage" className="utilbtn-kjh">
                  <FaRegUser />
                </NavLink>
                <NavLink to="/cart" className="utilbtn-kjh">
                  <LuShoppingCart/>
                </NavLink>
                <NavLink to="/" onClick={logout} className="utilbtn-kjh">
                  <CiLogin />
                </NavLink>
              </>
              :
              <>
              {/* 로그인 하기 전 */}
                <NavLink to="/login" className="utilbtn-kjh renter4">
                  <FaRegUser />
                </NavLink>
                <NavLink to="/login" className="utilbtn-kjh renter5">
                  <LuShoppingCart/>
                </NavLink>
              </>
            }
          </div>
        </div>
      </div>
      <nav className="LHeaderBottom-kjh">
        <ul className="Llistul-kjh">
          <div className="Llist-kjh" onMouseMove={handleMouseMove}>
            {genres.map((genre) => (
              <NavLink
                key={genre}
                to={`/BookList?genre=${encodeURIComponent(genre)}`}
                activeClassName="active"
                exact
                onClick={() => {
                  handleGenreClick(genre);
                }}
              >
                <span className={activeGenre === genre ? 'active' : ''}>{genre}</span>
              </NavLink>
            ))}
          </div>
        </ul>
      </nav>
    </div>
  );
};


export default Header2;