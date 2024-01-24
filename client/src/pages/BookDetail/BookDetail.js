import { NavLink } from 'react-router-dom';
import './BookDetail.scss';
import { API_URL } from '../../config/contansts';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios  from 'axios';


const BookDetail = () => {
  const [axiosResult, setAxiosResult] = useState("");
  const { id } = useParams();
  // console.log(id);
  const [book_publisher,setBook_Publisher] = useState("");
  const [book_author,setbook_author] = useState("");
  const [reviews, setReviews] = useState([]); // 리뷰 상태 추가
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`${API_URL}/api/book?book_id=${id}`)
    .then(res => {
      setAxiosResult(res.data[0]);
      console.log("book 데이터: ", res.data[0]);

      axios.get(`${API_URL}/api/book?book_publisher=${res.data[0].book_publisher}&limit=5`)
      .then(res => {
        setBook_Publisher(res.data);
        console.log("publisher 관련 도서:", res.data);
      })
      .catch(err => {
        console.error(err);
      });

      axios.get(`${API_URL}/api/book?book_author=${res.data[0].book_author}&limit=5`)
      .then(res => {
        setbook_author(res.data);
        console.log("author 관련 도서:", res.data);
      })
      .catch(err => {
        console.error(err);
      });

    }).catch((err) =>{
      console.error(err);
    });

    axios.get(`${API_URL}/api/review?book_id=${id}`)
    .then(res => {
      setReviews(res.data);
      console.log("review 데이터: ", res.data)
    })
    .catch(err => {
      console.error(err);
    });

    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  },[id]);
  

  const handleReservation = () => {
    console.log('예약하기');
  };

  /** 카트담기 버튼 */
  const handleAddToCart = () => {
    if(axiosResult.book_availability === 0){
      alert("대출불가한 도서입니다.");
      return
    }
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
    // 로컬 스토리지에서 기존의 장바구니 아이템을 가져오거나 빈 배열로 초기화
    const existingCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    // 중복 체크: 중복된게 있으면 true 없으면 false 반환
    const isDuplicate = existingCartItems.some( 
      (item) => item.id === axiosResult.book_id,
    );
    if(isDuplicate){
      alert("이미 장바구니에 추가된 도서입니다.");
    }else{
      // 새로운 아이템을 장바구니에 추가
      existingCartItems.push(cartItem);
      // 업데이트된 장바구니 아이템을 다시 로컬 스토리지에 저장
      sessionStorage.setItem("cart", JSON.stringify(existingCartItems));
      navigate("/cart");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // 현재 페이지에서 마지막 리뷰의 인덱스 계산
  const indexOfLastReview = currentPage * reviewsPerPage;
  // 현재 페이지에서 첫 번째 리뷰의 인덱스 계산
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  // 현재 페이지의 리뷰 가져오기
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // 페이지 변경 함수
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!reviews || reviews.length === 0) {
    
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
        <div className="reviews-container-lhs">
          <h2>리뷰</h2>
          {reviews.length === 0 ? (
            <p>리뷰가 없습니다.</p>
          ) : (
            <>
              {currentReviews.map((review) => (
                // 현재 페이지에 대한 리뷰 렌더링
                <div key={review.id} className="review-item-lhs">
                  <span className='review-title'>{review.review_title}</span>
                  <div className="rating-container">
                    {Array.from({ length: review.review_rating }, (_, index) => (
                      <span key={index} className="star-icon">★</span>
                    ))}
                    <span className='user-name'>{review.User.user_name}</span>
                    <p>{review.created_at}</p>
                  </div>
                  <p>{review.review_content}</p>
                </div>
              ))}
              {/* 페이지네이션 탐색 */}
              <div className="pagination-container" style={{ textAlign: 'center' }}>
                {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`pagination-button${currentPage === index + 1 ? ' active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
}

export default BookDetail;
