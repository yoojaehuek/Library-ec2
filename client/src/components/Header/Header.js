import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";
import axios from 'axios';
import { API_URL } from '../../config/contansts';

const Header = () => {
  const [buttonClassName, setButtonClassName] = useState('');
  const [isKeyLayerVisible, setKeyLayerVisible] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginState); //useState와 거의 비슷한 사용법

  const logout = async () => {
    axios.get(`${API_URL}/logout`, { withCredentials: true })
      .then(()=>{
        setIsLogin(false);
      })
      .catch((err) => {
        console.log("logout/err: ", err);
      })
  } 

  const handleMouseOver = () => {
    setButtonClassName('ovr');
  };
  const handleMouseOut = () => {
    setButtonClassName('');
  };
  const handleSearchClick = () => {
    setKeyLayerVisible(true);
  };
  const handleLayerClose = () => {
    setKeyLayerVisible(false);
  };




  return (
    <div className='header-container-kjh'>
      <h1>
        <a className='hlogo-kjh' href='/'>
          <img src='/images/Header/logo.png'></img>
        </a>
      </h1>
      <div className='LHeaderWrap-kjh'>
        <div className="LHeaderTop-kjh">
          <ul className='utilLi-kjh'>
            <li id='LoginText'><a title='로그인' href='/'><em className='txt-kjh'>로그인</em></a></li>
            <li><a title='회원가입' href='/'><em className='txt-kjh'>회원가입</em></a></li>
          </ul>
        </div>
        <hr/>
        <div className='LHeaderMiddle-kjh'>
          <div className='LSearch-kjh'>
            <form className='LForm-kjh'>
              <fieldset>
                <span className='schIpt-kjh'>
                  <label>
                    <input 
                    type='text' 
                    title='검색어 입력' 
                    className='iptTxt-kjh' 
                    maxLength="80"
                    onClick={handleSearchClick}
                    >
                    </input>
                  </label>
                </span>
                <span className='schBtn-kjh'>
                  <button onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    type='submit'
                    title='검색'
                    className={buttonClassName}>
                    <span className='LBlind-kjh'></span>
                  </button>
                </span>
                {isKeyLayerVisible && (
                  <>
                    <div className='keyLayer-kjh'>
                      <div className='key_lastest-kjh'>
                        <dl className='lastest_word-kjh'>
                          <dt>최근 검색어</dt>
                          <dd>
                            <div className='noData-kjh'>
                              <p className='txt_tit-kjh'>최근 검색어가 없습니다.</p>
                            </div>
                          </dd>
                        </dl>
                        <div className='lastest_delAll-kjh'>
                          <a href='' className='lnk_delAll-kjh'><em className='txt-kjh'>검색기록 삭제</em></a>
                        </div>
                        <div className='lastest_ad-kjh'></div>
                        <div className='lastest_close-kjh'>
                          <a href="" className="lnk_close-kjh" onClick={handleLayerClose}>
                            <em className='txt-kjh'>닫기</em>
                            <em className='icon_del-kjh'></em>
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <nav className='hmenu'>
        <div className='menu'>
          
          <ul>
            <li>
              <NavLink to="/" className="">
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="">
                Store
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="">
                What's New
              </NavLink>
            </li>
            <li>
              <NavLink to="/story" className="">
                Story
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='util'>
        {isLogin ? 
          <>
            <NavLink to="/" className="" >마이페이지</NavLink>
            <NavLink to="/" onClick={logout} className="renter2">로그아웃</NavLink>
            <NavLink to="/" className="">장바구니.</NavLink>
          </>
          :
          <>
            <NavLink to="/" className="" >로그인</NavLink>
            <NavLink to="/" className="">회원가입</NavLink>
          </>
        }
        </div>
      </nav>

    </div>
  );
};

export default Header;