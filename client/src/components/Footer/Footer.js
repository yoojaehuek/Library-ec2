import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Footer.scss'


const Footer = () => {

  const [showScrollButton, setShowScrollButton] = useState(false);
  
  useEffect(() => {
    // 스크롤 이벤트 감지
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    // 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 15;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
  };

  return (
    <div className='footer-container-kjh'>
      {showScrollButton && (
      <div className='Topbtn-kjh'>
          <button className="sclTopbtn-kjh" onClick={scrollToTop}>
            <span className='icon-kjh'>
              ↑
            </span>
          </button>
      </div>
      )}
      <div className='footerWrap-kjh'>
        <div className='LFooterTop-kjh'>
          <ul className='LFootUli-kjh'>
            <li><NavLink to='/'>회사소개</NavLink></li>
            <li><NavLink to='/'>이용약관</NavLink></li>
            <li><NavLink to='/'>도서홍보안내</NavLink></li>
            <li><NavLink to='/'>개인정보처리방침</NavLink></li>
            <li><NavLink to='/'>청소년보호정책</NavLink></li>
          </ul>
        </div>
        <div className='LFooterCon-kjh'>
          <div className='footerImg-kjh'>
            <img src='/images/Header/Group_129.svg'></img>
          </div>
          <div className='footerAdd-kjh'>
						<p className="addrRow">대표 : 김지환, 임헌성</p>
            <p className="addrRow">개인정보보호책임자 : 김지환 i1004902@naver.com</p>
						<p className="addrRow">사업자등록번호 : 965042</p>
            <p className="addrRow">통신판매업신고 : 국제관 211호</p>
						<p className="addrRow">대표전화 : 031-610-8000</p>
            <p className="addrRow">경기도 평택시 장안웃길 56</p>
            <p className="txt_copyright">ⓒ Kookje KDT Entertainment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;