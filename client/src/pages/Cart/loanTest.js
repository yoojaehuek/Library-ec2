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

  // /** 오래된순  프론트에서 정렬*/
  // const findAllOrdera = () => {
  //   axios
  //     .get(`${API_URL}/api/loans`)
  //     .then((response) => {
  //       // 서버에서 받아온 데이터를 loan_date를 기준으로 오래된 날짜순으로 정렬
  //       const sortedData = response.data.sort((a, b) => new Date(b.loan_date) - new Date(a.loan_date));

  //       alert("전체조회 성공!");
  //       console.log("전체조회 sortedData: ", sortedData);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  // /** 최신순으로 정렬 프론트에서 정렬 */
  // const findAllOrderb = () => {
  //   axios
  //     .get(`${API_URL}/api/loans`)
  //     .then((response) => {
  //       // 최근순으로 정렬
  //       const sortedData = response.data.sort((a, b) => new Date(a.loan_date) - new Date(b.loan_date));

  //       alert("전체조회 성공!");
  //       console.log("전체조회 sortedData: ", sortedData);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  // /** 최신순으로 서버에서 정렬 해서 불러 */
  // const findAllOrderASC = () => {
  //   axios
  //     .get(`${API_URL}/api/loans/desc`)
  //     .then((req) => {
  //       // 최근순으로 정렬
  //       alert(" 최신순 전체조회 성공!");
  //       console.log(" 최신순 전체조회 req: ",req.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };


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
  /** 최신순으로 서버에서 정렬 해서 불러 */
  const findAllOrderASC = () => {
    axios
      .get(`${API_URL}/api/loans/desc`)
      .then((req) => {
        // 최근순으로 정렬
        alert(" 최신순 전체조회 성공!");
        console.log(" 최신순 전체조회 req: ",req.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };





  // ---------- 책별 대출 유저들 대출날짜 최근날짜수으로 불러오기------------------------------------------------------------
  const book_id = 44
  const UsersByBookBorrowed = () => {
    axios
      .get(`${API_URL}/api/loans/UsersByBookBorrowed/${book_id}`)
      .then((req) => {
        alert("책을 대출한 유저들 조회성공!"); 
        console.log("책을 대출한 유저들 조회성공 : ",req.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // ---------- 유저별 대출 목록 책만 ------------------------------------------------------------
  const user_id = 7
  const BooksBorrowedByUser = () => {
    axios
      .get(`${API_URL}/api/loans/BooksBorrowedByUser/${user_id}`)
      .then((req) => {
        alert("유저 대출정보 조회성공!"); 
        console.log("유저대출정보 조회성공: ",req.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // ---------- 최근 대출순으로 책, 유저 불러오기 -------- 전체조회 변형--------------------------------------------------
  const RecentBorrowedBooksAndUsers = () => {
    axios
      .get(`${API_URL}/api/loans/RecentBorrowedBooksAndUsers`)// 대출 삭제
      .then((req) => {
        alert("최근 대출순으로 책, 유저 불러오기 성공!"); 
        console.log("최근 대출순으로 책, 유저 불러오기 성공 : ",req.data);
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
      <button type="button" onClick={findAllOrderASC}>반납일 최근순으로 불러오기</button>
      <button type="button" onClick={BooksBorrowedByUser}>유저별 대출목록 </button>
      <button type="button" onClick={UsersByBookBorrowed}>책을 대출한 유저를 대출날짜 최근순으로불러오기</button>
      
      <button type="button" onClick={RecentBorrowedBooksAndUsers}>최근 대출순으로 책, 유저 불러오기</button>
    </form>
  );
}; 

export default LoanTest;