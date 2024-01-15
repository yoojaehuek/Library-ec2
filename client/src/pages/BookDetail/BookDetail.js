import { NavLink } from 'react-router-dom';
import './BookDetail.scss';
import { API_URL } from '../../config/contansts';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios  from 'axios';


const BookDetail = () => {
  const [axiosResult, setAxiosResult] = useState("");
  const { id } = useParams();
  console.log(id);
  const [book_publisher,setBook_Publisher] = useState("");
  const [book_author,setbook_author] = useState("");
  const [reviews, setReviews] = useState([]); // 리뷰 상태 추가
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`${API_URL}/api/book?book_id=${id}`)
    .then(res => {
      setAxiosResult(res.data[0]);
      console.log("응답 데이터: ", res.data[0]);

      axios.get(`${API_URL}/api/book?book_publisher=${res.data[0].book_publisher}&limit=5`)
      .then(res => {
        setBook_Publisher(res.data);
        console.log("관련 도서:", res.data);
      })
      .catch(err => {
        console.error(err);
      });

      axios.get(`${API_URL}/api/book?book_author=${res.data[0].book_author}&limit=5`)
      .then(res => {
        setbook_author(res.data);
        console.log("관련 도서:", res.data);
      })
      .catch(err => {
        console.error(err);
      });

    }).catch((err) =>{
            console.error(err);
        });

      window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  },[id]);
  

  const handleReservation = () => {
    console.log('예약하기');
  };

  /** 카트담기 버튼 */
  const handleAddToCart = () => {
    console.log('도서카트에 추가 실행됨');
    const cartItem = {
      id:axiosResult.book_id,
      book_ISBN: axiosResult.book_ISBN,
      book_AUTHOR: axiosResult.book_author,
      book_availability:axiosResult.book_availability,
      book_description: axiosResult.book_description,
      book_genre:axiosResult.book_genre,
      book_img_url:axiosResult.book_img_url,
      book_name: axiosResult.book_name,
      book_publisher:axiosResult.book_publisher,
      created_at:axiosResult.created_at,
    };
    // 로컬 스토리지에서 기존의 장바구니 아이템을 가져오거나 빈 배열로 초기화합니다.
    const existingCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    // 새로운 아이템을 장바구니에 추가
    existingCartItems.push(cartItem);
    // 업데이트된 장바구니 아이템을 다시 로컬 스토리지에 저장합니다.
    sessionStorage.setItem("cart", JSON.stringify(existingCartItems));
    navigate("/cart");
  };

  if (!reviews || reviews.length === 0) {
  const tempReviews = [
    { id: 1, review_text: '정말 좋은 책이었습니다!', rating: 5, create_at: '2022-01-15' },
    { id: 2, review_text: '재미있게 읽었습니다.', rating: 4, create_at: '2022-01-14' },
  ];

  setReviews(tempReviews);
}

    return (
      <div className='book-detail-container-lhs'>
        <div className="book-detail-content-lhs">
          <div className="book-detail-left-lhs">
            <img src={API_URL + axiosResult.book_img_url} alt="Book Cover" />
          </div>
          <div className="book-detail-right-lhs">
            <h1>{axiosResult.book_name}</h1>
            <p><span>저자: </span>{axiosResult.book_author}</p>
            <p><span>출판사: </span>{axiosResult.book_publisher}</p>
            <p><span>장르: </span>{axiosResult.book_genre}</p>
            <p><span>책 고유번호: </span>{axiosResult.book_ISBN}</p>
            <p><span>책 등록날짜: </span>{axiosResult.created_at}</p>
            {axiosResult.book_availability == 1? 
              <div className='book-detail-availability-lhs' style={{backgroundColor: "blue"}}> 
                <span> 대출 가능 </span>
              </div> 
              : 
              <div className='book-detail-availability-lhs' style={{backgroundColor: "red"}}> 
                <span> 대출 불가능 </span>
              </div> 
            }
          </div>
          <div className="buttons-container-lhs">
            <button onClick={handleAddToCart}>도서카트</button>
            <button onClick={handleReservation}>예약하기</button>
          </div>
        </div>
        <div className='book-description-top-lhs'>
          <div className='book-description-top-name-lhs'>
            <h2>책 소개</h2>
          </div>
          <p className='book-description'>{axiosResult.book_description}</p>
        </div>
        <div className='related-books-container-lhs'>
          <h2>같은 출판사의 다른 작품</h2>
          <div className='related-books-lhs'>
            {/* 관련 도서를 매핑하고 렌더링합니다 */}
              {Array.isArray(book_publisher) && book_publisher.map(book => (
              <div key={book.id} className='related-book-lhs'>
                <NavLink to={`/BookDetail/${book.book_id}`}>
                  <img src={API_URL + book.book_img_url} alt={`${book.book_name} 표지`} />
                  <h3>{book.book_name}</h3>
                  <p>{book.book_author}</p>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className='other-books-container-lhs related-books-container-lhs'>
          <h2>같은 저자의 다른 작품</h2>
          <div className='related-books-lhs'>
              {Array.isArray(book_author) && book_author.map(book => (
                <div key={book.id} className='related-book-lhs'>
                  <NavLink to={`/BookDetail/${book.book_id}`}>
                    <img src={API_URL + book.book_img_url} alt={`${book.book_name} 표지`} />
                    <h3>{book.book_name}</h3>
                    <p>{book.book_author}</p>
                  </NavLink>
                </div>
              ))}
          </div>
        </div>
        <div className='reviews-container-lhs'>
          <h2>리뷰</h2>
            {reviews.map((review) => (
              <div key={review.id} className='review-item-lhs'>
              <p>{review.review_text}</p>
              <div className="rating-container">
                <p>평점:</p>
                {Array.from({ length: review.rating }, (_, index) => (
                  <span key={index} className="star-icon">★</span>
                ))}
              </div>
              <p>작성일: {review.create_at}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default BookDetail;
