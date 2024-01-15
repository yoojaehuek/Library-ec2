import React, { useState } from "react";
import { API_URL } from "../../config/contansts";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";
import axios from "axios";
import "./Cart.scss";

const Cart = () => {
  const [islogin, x] = useRecoilState(loginState); //useState와 거의 비슷한 사용법
  // const [cart, setCart] = useState([]); /** 장바구니에 담은 상품목록 */
  const navigate = useNavigate();
  /** 반납일 날짜 계산 함수 */
  const getFutureDate = () => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7일을 밀리초로 변환하여 더함
    return futureDate.toISOString().split("T")[0]; // 날짜 형식을 'YYYY-MM-DD'로 변환
  };
  /** 대출신청함수 */
  const handleOrder = () => {
    // 선택된 책들만 필터링
    const selectedBooks = cart.filter((book) => checkItems.includes(book.id));
    const futureDate = getFutureDate(); // 7일뒤 반납일
    // 선택된 책이 하나 이상인 경우에만 대출 신청 처리
    if (selectedBooks.length > 0) {
      const booksWithDueDate = selectedBooks.map((book) => ({
        book_id: book.id,
        due_date: futureDate,
      }));
      axios
        .post(`${API_URL}/api/loans`, { order: booksWithDueDate })
        .then(() => {
          alert("대출성공!");
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("선택된 책이 없습니다. 책을 선택해주세요.");
    }
  };
  const cart = [
    {
      id: 3,
      book_name: "책먹는 여우",
      book_img_url: "/server/upload/book/aaa.jpeg",
      book_author: "너넌",
      book_publisher: "그저 빛 출판",
      book_publication_date: "2023-02-23",
      book_genre: "호러",
      book_availability: false,
      book_description:
        "미지의 거인을 소재로 한 일본의 다크 판타지 만화. 작가는 이사야마 하지메, 편집자는 카와쿠보 신타로다.  일본 원작에서는 발음할 시에는 '신게키노쿄진'이며 제목에 붙인 한자의 히라가나 표기대로 준수한다. 대한민국에서는 주로 다섯 자 제목을 세 글자로 줄여서 '진격거' 혹은 두 글자로 ‘진격’으로 통칭된다. 미국 등의 영어권 국가에서는 제목인 '진격의 거인'의 또 다른 이면의 의미를 담아낸 'Attack on Titan'을 사용한다. 단, 실제 직역은 당연히 Giant of advance[2]/vanguard이며 엄밀히 제목에 대한 번역은 아니다. 이를 단축한 'AoT' 혹은 일본 원작 제목을 그대로 음역한 'Shingeki no Kyojin'을 줄여서 'SnK'으로 통칭하고 있다. SnK보단 AoT가 조금 더 많이 사용된다.",
      book_ISBN: "b1013",
    },
    {
      id: 2,
      book_name: "책먹는 여우",
      book_img_url: "/server/upload/book/aaa.jpeg",
      book_author: "너넌",
      book_publisher: "그저 빛 출판",
      book_publication_date: "2023-02-23",
      book_genre: "호러",
      book_availability: false,
      book_description:
        "미지의 거인을 소재로 한 일본의 다크 판타지 만화. 작가는 이사야마 하지메, 편집자는 카와쿠보 신타로다.  일본 원작에서는 발음할 시에는 '신게키노쿄진'이며 제목에 붙인 한자의 히라가나 표기대로 준수한다. 대한민국에서는 주로 다섯 자 제목을 세 글자로 줄여서 '진격거' 혹은 두 글자로 ‘진격’으로 통칭된다. 미국 등의 영어권 국가에서는 제목인 '진격의 거인'의 또 다른 이면의 의미를 담아낸 'Attack on Titan'을 사용한다. 단, 실제 직역은 당연히 Giant of advance[2]/vanguard이며 엄밀히 제목에 대한 번역은 아니다. 이를 단축한 'AoT' 혹은 일본 원작 제목을 그대로 음역한 'Shingeki no Kyojin'을 줄여서 'SnK'으로 통칭하고 있다. SnK보단 AoT가 조금 더 많이 사용된다.",
      book_ISBN: "b1013",
    },
    {
      id: 1,
      book_name: "금빛 파티시에?!",
      book_img_url: "/server/upload/book/bbb.jpeg",
      book_author: "베로나루베로베로",
      book_publisher: "금빛출판",
      book_publication_date: "2023-02-28",
      book_genre: "엑션",
      book_availability: true,
      book_description:
        "일본의 순정 만화. 작가는 마츠모토 나츠미. 원제는 '꿈빛 파티시에르'이다.[2]  슈에이샤의 리본에서 2008년 10월호에서 2011년 7월호까지 연재되었고, 2012년 5월호에 후일담 단편집 '꿈빛 파티시에르 아·라·컬트'가 게재되었다가 리본 대증간호로 이적해 연재되었다. 2000년대 학생들에게 엄청난 인기를 가지고 있던 작품이다. 이로 인해 애니메이션화도 되었으며 애니메이션은 국내 방영 이후 슈가슈가룬-캐릭캐릭 체인지를 이으며 투니버스 수입 여아 애니메이션 전성기의 마지막 배턴을 이어받았다. 제56회(2010년) 쇼가쿠칸 만화상 아동향 부문 수상작이다.",
      book_ISBN: "c1013",
    },
    {
      id: 4,
      book_name: "금빛 파티시에?!",
      book_img_url: "/server/upload/book/bbb.jpeg",
      book_author: "베로나루베로베로",
      book_publisher: "금빛출판",
      book_publication_date: "2023-02-28",
      book_genre: "엑션",
      book_availability: true,
      book_description:
        "일본의 순정 만화. 작가는 마츠모토 나츠미. 원제는 '꿈빛 파티시에르'이다.[2]  슈에이샤의 리본에서 2008년 10월호에서 2011년 7월호까지 연재되었고, 2012년 5월호에 후일담 단편집 '꿈빛 파티시에르 아·라·컬트'가 게재되었다가 리본 대증간호로 이적해 연재되었다. 2000년대 학생들에게 엄청난 인기를 가지고 있던 작품이다. 이로 인해 애니메이션화도 되었으며 애니메이션은 국내 방영 이후 슈가슈가룬-캐릭캐릭 체인지를 이으며 투니버스 수입 여아 애니메이션 전성기의 마지막 배턴을 이어받았다. 제56회(2010년) 쇼가쿠칸 만화상 아동향 부문 수상작이다.",
      book_ISBN: "c1013",
    },
  ];
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);
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
            //대출가능한 책의 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
            checked={
              availableBooks.length !== 0 &&
              checkItems.length === availableBooks.length ? true : false
            }
          />
          <span>전체선택</span>
        </div>
      </li>
      <ul id="book-list-yjh">
        {cart && cart.length > 0 ? (
          cart.map((book, index) => (
            <li key={index} id="book-yjh">
              <div id="book-checkbox-yjh">
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
              <div id="book-img-yjh">
                <div id="img-box-yjh">
                  <div>
                    <img src={API_URL + book.book_img_url} alt="" />
                  </div>
                </div>
                <NavLink>도서정보</NavLink>
              </div>
              <div id="book-info-yjh">
                <h3>{book.book_name}</h3>
                <p id="writer-yjh">
                  {book.book_author} | {book.book_publisher} | {book.book_publication_date}
                </p>
                <p id="book-description-yjh">{book.book_description}</p>
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
