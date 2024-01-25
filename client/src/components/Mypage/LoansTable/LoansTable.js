import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './LoansTable.scss';
import axios from 'axios';
import { API_URL } from '../../../config/contansts';
import LoansRow from '../LoansRow/LoansRow';

const LoansTable = ({is_returned}) => {
  console.log(is_returned);
  const [showAllBooks, setShowAllBooks] = useState(false); // 간략히 보기 버튼 표시 여부
  const [showBriefView, setShowBriefView] = useState(false); // 더보기 버튼 표시 여부
  const [userbyLoans, setUserbyLoans] = useState([]); //DB에서 불러온 데이터
  const [showMoreData, setShowMoreData] = useState(3); //더보기 버튼 눌렀을 때 몇개씩 더 나타나게

   /** 받은 유저id로 유저 대출정보 조회요청 */
  useEffect(() => {
    axios.get(`${API_URL}/api/loans/userbyloans`)
      .then(res => {
        console.log("res: ", res);
        let loansBooks = null;
        if(is_returned){
          loansBooks = res.data.filter(loans => loans.deletedAt != null);
        }else {
          loansBooks = res.data.filter(loans => loans.deletedAt == null);
        }
        setUserbyLoans(loansBooks);
        console.log("대출한 책 : ", loansBooks);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const toggleShowAllBooks = () => { //더보기 버튼 클릭 시 이벤트 
    setShowAllBooks(!showAllBooks); //간략히 보기 버튼 표시 여부 반전
    setShowBriefView(false); // 더보기 버튼 안보이게
    setShowMoreData(3); // 더보기를 누를 때 초기화
  };
  const toggleShowBriefView = () => { // 간략히 보기 버튼 클릭시 이벤트
    setShowBriefView(!showBriefView); //더보기 버튼 표시 여부 반전
    setShowAllBooks(false); // "더보기"를 누르면 간략히 보기가 해제되도록 추가
    // setShowMoreData(3); // 간략히 보기를 누를 때 초기화
  };
  // const visibleBooks = showAllBooks ? userbyLoans : (showBriefView ? userbyLoans.slice(0, 3) : userbyLoans.slice(0, 3));  
  const visibleBooks = showAllBooks ? userbyLoans : userbyLoans.slice(0, showMoreData);  
  const handleShowMore = () => {
    setShowMoreData(prevShowMoreData => prevShowMoreData + 3);
  };
  const handleShowBriefView = () => {
    setShowMoreData(3);
  };
 
  return (
    <div className='rentTable-kjh'>
      <table>
        <tr>
          <td colSpan='5' className='tdTitle-kjh'>
            {is_returned ? "내가 봤던 책" : "대여 중인 책"}
          </td>
        </tr>
        <tr>
          <td className='tdsubTitle-kjh'>작가</td>
          <td className='tdsubTitle-kjh'>책 제목</td>
          <td className='tdsubTitle-kjh'>대여시작일</td>
          <td className='tdsubTitle-kjh'>반납일</td>
          <td className='tdsubTitle-kjh'>반납일</td>
        </tr>
        {visibleBooks.map((book, index) => (
          <LoansRow 
            book={book} 
            index={index}
          />
        ))}
  
      </table>
      {showMoreData < userbyLoans.length && (
        <NavLink onClick={handleShowMore} className='more-kjh'>더보기 {'>'}</NavLink>
      )}
      {/* {!showAllBooks && !showBriefView && (
        <NavLink onClick={toggleShowAllBooks} className='more-kjh'>더보기 {'>'}</NavLink>
      )} */}
      {showMoreData >= userbyLoans.length && (
        <NavLink onClick={handleShowBriefView} className='more-kjh'>간략히 보기 {'>'}</NavLink>
      )}
      {showAllBooks && (
        <NavLink onClick={toggleShowBriefView} className='more-kjh'>간략히 보기 {'>'}</NavLink>
      )}
      {showBriefView && (
        <NavLink onClick={toggleShowAllBooks} className='more-kjh'>더보기 {'>'}</NavLink>
      )}
    </div>
  )
}


export default LoansTable;

