import { NavLink } from 'react-router-dom';
import './BookDetail.scss';
import { API_URL } from '../../config/contansts';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios  from 'axios';


const BookDetail = () => {
  const [axiosResult, setAxiosResult] = useState("");
  const { id } = useParams();
  console.log(id);
  const [book_publisher,setBook_Publisher] = useState("");
  const [book_author,setbook_author] = useState("");

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

  const handleAddToCart = () => {
    console.log('도서카트에 추가');
  };

  const [newReview, setNewReview] = React.useState({
    user_id: 'currentUserId', // 현재 사용자 ID를 얻어와야 함
    review_text: '',
    rating: 0,
  });

  const handleReviewSubmit = () => {
    // TODO: 새 리뷰를 저장하는 로직 추가
    console.log('새 리뷰를 저장합니다:', newReview);
  };


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
          {/* 리뷰 목록 표시 로직 추가 */}
          {axiosResult.reviews && axiosResult.reviews.map((review) => (
            <div key={review.id} className='review-item-lhs'>
              <p>{review.review_text}</p>
              <p>평점: {review.rating}</p>
              <p>작성일: {review.create_at}</p>
            </div>
          ))}
          {/* 새 리뷰 작성 양식 */}
          {newReview.book_id && (
            <div className='new-review-form-lhs'>
              <textarea
                placeholder='리뷰를 작성하세요...'
                value={newReview.review_text}
                onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
              />
              <input
                type='number'
                placeholder='평점 (1~5)'
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              />
              <button onClick={handleReviewSubmit}>리뷰 작성</button>
            </div>
          )}
        </div>
      </div>
    );
}

export default BookDetail;
