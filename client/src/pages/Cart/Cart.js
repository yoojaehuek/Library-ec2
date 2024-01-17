import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/contansts";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";
import axios from "axios";
import "./Cart.scss";

const Cart = () => {
  // const [islogin, x] = useRecoilState(loginState); //useState와 거의 비슷한 사용법
  const [cart, setCart] = useState([]); // 장바구니에 담은 상품목록
  const [checkItems, setCheckItems] = useState([]); // 체크된 책
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬스토리지에서 cart 를 가져와서 storedCart 에 담음
    const storedCart = JSON.parse(sessionStorage.getItem("cart"));
    if (storedCart && storedCart.length > 0) setCart(storedCart);
  }, []);

  /** 반납일 계산 함수 */
  const getFutureDate = () => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7일을 밀리초로 변환하여 현재날짜에 더함
    return futureDate.toISOString().split("T")[0]; // 날짜 형식을 'YYYY-MM-DD'로 변환
  };

  /** 대출신청함수 */
  const handleOrder = () => {
    // 선택된 책들만 필터링
    const selectedBooks = cart.filter((book) => checkItems.includes(book.id));
    const futureDate = getFutureDate(); // 7일뒤 반납일
    // 선택된 책이 하나 이상인 경우에만 대출 신청 처리
    if (selectedBooks.length > 0) {
      console.log("if문 들어옴");
      const booksWithDueDate = selectedBooks.map((book) => ({
        book_id: book.id,
        due_date: futureDate,
      }));
      console.log("if문 들어옴selectedBooks: ", booksWithDueDate);
      axios
        .post(`${API_URL}/api/loans`, { order: booksWithDueDate })
        .then(() => {
          alert("대출성공!");
          sessionStorage.removeItem("cart"); //cart 비우기
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("선택된 책이 없습니다. 책을 선택해주세요.");
    }
  };

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  const [availableBooks, setAvailableBooks] = useState([]);
  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      setAvailableBooks(cart.filter((book) => book.book_availability));
      const idArray = availableBooks.map((book) => book.id);
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  return (
    <form id="cart-container-yjh">
      <li id="cart-header-yjh">
        <h1>내가 담은 책</h1>
        <div>
          <input
            type="checkbox"
            name="select-all"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={
              //대출가능한 책의 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
              availableBooks.length !== 0 && checkItems.length === availableBooks.length ? true : false
            }
          />
          <span>전체선택</span>
        </div>
      </li>

      <ul id="book-list-yjh">
        {cart && cart.length > 0 ? (
          cart.map((book, index) => (
            <li key={index} id="book-yjh" className="grid-container">
              <div id="book-checkbox-yjh" className="grid-item box-1">
                {book.book_availability === false ? (
                  <div id="empty-yjh"></div>
                ) : (
                  <input
                    type="checkbox"
                    name={`select-${book.id}`}
                    onChange={(e) =>
                      handleSingleCheck(e.target.checked, book.id)
                    }
                    // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                    checked={checkItems.includes(book.id) ? true : false}
                    disabled={!book.book_availability}
                  />
                )}
              </div>
              <div id="img-box-yjh" className="grid-item box-2">
                <div>
                  <img src={API_URL + book.book_img_url} alt="" />
                </div>
              </div>
              <div className="grid-item box-3">
                <NavLink to={`/BookDetail/${book.id}`}>도서정보</NavLink>{" "}
              </div>
              <div className="grid-item box-4">
                <h3>{book.book_name}</h3>
              </div>
              <p id="writer-yjh" className="grid-item box-5">
                {book.book_AUTHOR} | {book.book_publisher} | {book.book_publisher}
              </p>
              <p id="book-description-yjh" className="grid-item box-6">
                {book.book_description}
              </p>
              <div className="grid-item box-7">
                {book.book_availability == true ? (
                  <div id="loan-a-yjh">대출가능</div>
                ) : (
                  <div id="loan-p-yjh">대출불가</div>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>장바구니에 담은 책이 없습니다</p>
        )}
        <li id="loan-btn-yjh">
          <button type="button" onClick={handleOrder}>
            대출신청
          </button>
        </li>
      </ul>
    </form>
  );
};

export default Cart;
