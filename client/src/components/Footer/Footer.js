import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Footer.scss'

const Footer = () => {
  return (
    <div className='footer-container-kjh'>
      <div className='Topbtn-kjh'>
        <a className='sclTopbtn-kjh' href="javascript:void(0);" onclick="pgGoTop();">
          <span className='icon-kjh'>
            <p>↑</p>
          </span>
        </a>
      </div>
      <div className='footerWrap-kjh'>
        <div className='LFooterTop-kjh'>
          <ul className='LFootUli-kjh'>
            <li><a href='#'>회사소개</a></li>
            <li><a href='#'>인재채용</a></li>
            <li><a href='#'>이용약관</a></li>
            <li><a href='#'>개인정보처리방침</a></li>
            <li><a href='#'>청소년보호정책</a></li>
            <li><a href='#'>도서홍보안내</a></li>
            <li><a href='#'>광고안내</a></li>
            <li><a href='#'>제휴안내</a></li>
            <li><a href='#'>복지제휴</a></li>
            <li><a href='#'>매장안내</a></li>
          </ul>
          <ul className='LFootSnsli-kjh'>
            <li><a className='sns_ka-kjh' href='#'><img src='/images/Footer/kakao.svg'></img></a></li>
            <li><a className='sns_fa-kjh' href='#'><img src='/images/Footer/facebook.svg'></img></a></li>
            <li><a className='sns_tw-kjh' href='#'><img src='/images/Footer/twitter.svg'></img></a></li>
            <li><a className='sns_in-kjh' href='#'><img src='/images/Footer/instagram.svg'></img></a></li>
          </ul>
        </div>
        <div className='LFooterCon-kjh'>
          <div className='footerImg-kjh'>
            <img src='/images/Header/Group_129.svg'></img>
          </div>
          <div className='footerAdd-kjh'>
            <b className='joo-kjh'>Library(주)</b>
            <br/>
						<span class="addrRow">서울시 영등포구 은행로 11, 5층~6층(여의도동,일신빌딩)</span>
						<span class="addrRow">대표 : 김석환, 최세라 &nbsp; 개인정보보호책임자 : 권민석 yes24help@yes24.com</span>
						<span class="addrRow">사업자등록번호 : 229-81-37000 &nbsp; 통신판매업신고 : 제 2005-02682호 사업자 정보확인</span>
						<span class="addrRow">호스팅 서비스사업자 : 예스이십사(주)</span>
            <p class="txt_copyright">Copyright ⓒ YES24 Corp. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
