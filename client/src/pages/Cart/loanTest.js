import React, { useState } from "react";
import { API_URL } from "../../config/contansts";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./loantest.scss";

const LoanTest = () => {
  const navigate = useNavigate();
  /** 반납일 날짜 계산 함수 */
  const getFutureDate = () => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7일을 밀리초로 변환하여 더함
    return futureDate.toISOString().split("T")[0]; // 날짜 형식을 'YYYY-MM-DD'로 변환
  };
  const futureDate = getFutureDate(); // 7일뒤 반납일

  // ---------  전체조회    --------------------------------------------
  const findAllOrder = () => {
    axios
      .get(`${API_URL}/api/loans`)// 전체조회
      .then((req) => {
        alert("전체조회 성공!");
        console.log("전체조회 req: ",req.data);
      })
      .catch((err) => {
        console.error(err);
      });
    };


  //------------ 책 반납  --------------------------------------------------------------------
  //책 반납 데이터 
  // params 로 대출 id 가져오셈 
  const loans_id = 1;
  const is_returned= true;
  const returned_date= "2024-12-12";
  const returnOrder = () => {
    axios
    .patch(`${API_URL}/api/loans/return/${loans_id}?returned=${is_returned}&returnDate=${returned_date}`)// 책반납
    .then((req, res) => {
        alert("책반납 성공!"); 
        console.log("조회 req: ",req.data);
        console.log("조회 res: ",res);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  //------------  대출연장  ------------------------------------------
  //params로 loans_id 가져와
  // const loans_id = 1;
  const due_date = "2024-12-26"
  
  const renewOrder = () => {
    axios
      .patch(`${API_URL}/api/loans/renew/${loans_id}?due_date=${due_date}`) // 대출연장
      .then(() => {
        alert("대출기간연장 성공!");
      })
      .catch((err) => {
        console.error(err);
      });
  };


  //------------ 대출 삭제 -------------------------------
  // params 로 loans_id 가져옴
  // const loans_id = 1;
  const deleteOrder = () => {
    axios
      .delete(`${API_URL}/api/loans/${loans_id}`)// 대출 삭제
      .then(() => {
        alert("대출삭제 성공!"); 
      })
      .catch((err) => {
        console.error(err);
      });
  };




  // ---------- 반납일 최근순으로 불러오기------------------------------------------------------------
  // 전체조회에서 반납일로 정렬 가능?
  const RecentReturns = () => {
    axios
      .delete(`${API_URL}/api/loans/${loans_id}`)// 대출 삭제
      .then(() => {
        alert("대출삭제 성공!"); 
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // ---------- 책별 대출 유저들 대출날짜 최근날짜수으로 불러오기------------------------------------------------------------
  const getUsersByBookBorrowed = () => {
    axios
      .delete(`${API_URL}/api/loans/${loans_id}`)// 대출 삭제
      .then(() => {
        alert("대출삭제 성공!"); 
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // ---------- 유저별 대출 목록 책만 ------------------------------------------------------------
  const getBooksBorrowedByUser = () => {
    axios
      .delete(`${API_URL}/api/loans/${loans_id}`)// 대출 삭제
      .then(() => {
        alert("대출삭제 성공!"); 
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // ---------- 최근 대출순으로 책 , 유저 불러오기------------------------------------------------------------
  const getRecentBorrowedBooksAndUsers = () => {
    axios
      .delete(`${API_URL}/api/loans/${loans_id}`)// 대출 삭제
      .then(() => {
        alert("대출삭제 성공!"); 
      })
      .catch((err) => {
        console.error(err);
      });
  };







  return (
    <form id="cart-container-yjh">
      <button type="button" onClick={findAllOrder}>대출 전체조회</button>
      <button type="button" onClick={returnOrder}>책 반납</button>
      <button type="button" onClick={renewOrder}>대출 기간 연장</button>
      <button type="button" onClick={deleteOrder}>대출 삭제</button>
      
      <button type="button" onClick={RecentReturns}>반납일 최근순으로 불러오기</button>
      <button type="button" onClick={deleteOrder}>책을 대출한 유저 대출날짜 최근수으로불러오기</button>
      <button type="button" onClick={deleteOrder}>유저별 대출목록 </button>
      <button type="button" onClick={deleteOrder}>최근 대출순으로 책, 유저 불러오기</button>


    </form>
  );
};

export default LoanTest;