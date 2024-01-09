import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/contansts";
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";
// import { errHandler } from '../../utils/globalFunction';
import "./Cart.scss";

// book_id int [primary key, note:"책"]
// book_name var 
// book_img_url var
// book_author var [note: '저자']
// book_publisher var [note: '출판사']
// book_publication_date date [note: '출판일']
// book_genre var [note: '장르']
// book_availability bool [note: '대출가능 여부']
// book_description var [note: '책 설명']
// book_ISBN var [note: '책 고유번호']
// create_at  date
// 피그마 주소
// https://www.figma.com/file/HPMp3fH03gnm2DGoSrhoFp/Untitled?type=design&node-id=11-311&mode=design&t=R3PZjiwZmpKO5er7-0
const Cart = () => {
  const [islogin, setIslogin] = useRecoilState(loginState); //useState와 거의 비슷한 사용법
  // const [cart, setCart] = useState([]); /** 장바구니에 담은 상품목록 */
  const [user, setUser] = useState({});/** 로그인한 사용자정보 */
  const [store, setStore] = useState([]);/** 매장 목록 */
  const [isPopupOpen, setPopupOpen] = useState(false); // 팝업창
  const [selectedStore, setSelectedStore] = useState(null); // 팝업창에서 선택한 매장
  const [prodQuantities, setProdQuantities] = useState([]);
  const navigate = useNavigate();
  
  /** 주문하기 */
  const handleOrder = () => {
    if(
      selectedStore !== null &&
      totalProdPrice !== 0
    ) { 
      cart.map((item, index) => {
        item.quantity = prodQuantities[index].quantity;
      });
      const orderObject = {};
      orderObject.store_id  = selectedStore.id;
      orderObject.menu_items = cart;
      orderObject.total_price = totalProdPrice;
      navigate(`/payment`, { state: orderObject });
    }else{
      alert("상품이 없거나 매장을 선택하지않았습니다.");
      return;
    }
  }

  // useEffect(() => {
  //   const storedCart = JSON.parse(sessionStorage.getItem("cart"));
  //   if (storedCart && storedCart.length > 0) setCart(storedCart);
  // }, []);

  // useEffect(() => {
  //   if (cart.length > 0) {
  //     setProdQuantities( //상품각각에 넣기
  //       cart.map((prod) => ({
  //         id: prod.menu_id,
  //         img: prod.img,
  //         name: prod.name,
  //         totalPrice: prod.totalPrice,
  //         price: prod.price,
  //         quantity: prod.quantity,
  //         options: prod.options,
  //         totalOptionPrice: prod.totalOptionPrice,
  //       }))
  //     );
  //   }
  // }, [cart]);

  // const updateSessionStorage = (updatedQuantities) => {
  //   // 세션 스토리지에 현재 cart 상태를 업데이트
  //   const updatedCart = cart.map((item, index) => ({
  //     ...item,
  //     quantity: updatedQuantities[index].quantity,
  //   }));
  //   sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  // };
  /**  각 메뉴의 가격 * 수량 값을 더한 총 가격
  cart 배열이 null 이거나 undefined 인 상태에서 reduce를 호출하려 하면 실행 안됨 */
  // const totalProdPrice = cart ? 
  // cart.reduce((total, prod, index) => {
  //     return (
  //       total + prod.totalOptionPrice +
  //       prod.price * ((prodQuantities[index] && prodQuantities[index].quantity) || 0)
  //     );
  //   }, 0)
  // : 0;

  const cart =[
    {},
  ]
  return (
    <form id="cart-container-yjh">
      <li id="cart-header-yjh">
        <h1>내가 담은 책</h1>
        <div><input type="checkbox"/><span>전체선택</span></div>
      </li>
      <ul id="book-list-yjh">


      {cart && cart.length > 0 ?(
        cart.map((book, index) => (
          <li key={index} id="book-yjh">
          <div><input type="checkbox"/></div>
          <div id="book-img-yjh">
            <div id="img-box-yjh">
              <img src={API_URL+book.} alt="" />
            </div>
            <NavLink >도서정보</NavLink>
          </div>
          <div id="book-info-yjh">
            <h3>책제목</h3>
            <p id="writer-yjh">글쓴이 | 출판사 | 출간일</p>
            <p id="book-description-yjh">
              Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Natus minima deleniti animi ipsa eum
              obcaecati assumenda accusamus consectetur repellat quae,
              suscipit qui reprehenderit sit dolorem soluta. Nesciunt
              mollitia dolorem necessitatibus?
              obcaecati assumenda accusamus consectetur repellat quae,
              suscipit qui reprehenderit sit dolorem soluta. Nesciunt
              mollitia dolorem necessitatibus?
              obcaecati assumenda accusamus consectetur repellat quae,
              suscipit qui reprehenderit sit dolorem soluta. Nesciunt
              mollitia dolorem necessitatibus?
            </p>
            {true ?
              <div id="loan-p-yjh">대출불가</div>:
              <div id="loan-a-yjh">대출가능</div>
            }
          </div>
        </li>
        ))
      ) :
      <p>장바구니에 담은 책이 없습니다</p>
      }

        <li id="book-yjh">
          <div><input type="checkbox"/></div>
          <div id="book-img-yjh">
            <div id="img-box-yjh">
              <img src="" alt="" />
            </div>
            <NavLink >도서정보</NavLink>
          </div>
          <div id="book-info-yjh">
            <h3>책제목</h3>
            <p id="writer-yjh">글쓴이 | 출판사 | 출간일</p>
            <p id="book-description-yjh">
              Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Natus minima deleniti animi ipsa eum
              obcaecati assumenda accusamus consectetur repellat quae,
              suscipit qui reprehenderit sit dolorem soluta. Nesciunt
              mollitia dolorem necessitatibus?
              obcaecati assumenda accusamus consectetur repellat quae,
              suscipit qui reprehenderit sit dolorem soluta. Nesciunt
              mollitia dolorem necessitatibus?
              obcaecati assumenda accusamus consectetur repellat quae,
              suscipit qui reprehenderit sit dolorem soluta. Nesciunt
              mollitia dolorem necessitatibus?
            </p>
            {true ?
              <div id="loan-p-yjh">대출불가</div>:
              <div id="loan-a-yjh">대출가능</div>
            }
          </div>
        </li>


        <li>
          <div><input type="checkbox" /></div>
          <div id="book-img-yjh">
            <div id="img-box-yjh">
              <img src="" alt="" />
            </div>
            <NavLink >도서정보</NavLink>
          </div>
          <div id="book-info-yjh">
            <h3>책제목</h3>
            <p id="writer-yjh">글쓴이 | 출판사 | 출간일</p>
            <p id="book-description-yjh">
              Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Natus minima deleniti animi ipsa eum
              obcaecati assumenda accusamus consectetur repellat quae,
              suscipit qui reprehenderit sit dolorem soluta. Nesciunt
              mollitia dolorem necessitatibus?
              obcaecati assumenda accusamus consectetur repellat quae,
              suscipit qui reprehenderit sit dolorem soluta. Nesciunt
              mollitia dolorem necessitatibus?
              obcaecati assumenda accusamus consectetur repellat quae,
              suscipit qui reprehenderit sit dolorem soluta. Nesciunt
              mollitia dolorem necessitatibus?
            </p>
            {true ?
              <div id="loan-p-yjh">대출불가</div>:
              <div id="loan-a-yjh">대출가능</div>
            }
          </div>
        </li>


        <li id="loan-btn-yjh">
          <button >대출신청</button>
        </li>


      </ul>
    </form>
  );
};

export default Cart;
