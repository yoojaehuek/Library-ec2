import { NavLink } from 'react-router-dom';
import './BookDetail.scss';
import React, { useEffect } from 'react';

const BookDetail = () => {
  const bookData = {
    image: '/images/main/Book1/martial.png',
    book_name: '책 제목',
    book_author: '저자',
    book_publisher: '국제북기',
    book_publisher_date: '출판일',
    book_genre: '장르',
    book_availability: '대출 가능', // 여기서 '대출가능' 또는 '불가능'으로 변경
    book_ISBN: '책 고유번호',
    create_at: '책 등록날짜',
    book_description: '태권도 국가대표로 활약하던 김지환이 사고로 죽게 되어 다음 세계에서 다시 깨어납니다. 그리고 그는 전생한 태권도 9단이 되어 다양한 모험과 로맨스를 겪게 됩니다. 초월적인 능력과 예측 불가능한 전개로 독자들을 매료시키는 작품!',
  };

  const relatedBooks = [
    {
      id: 1,
      image: '/images/main/Book1/web1.png',
      name: '세계 종말까지 2일',
      author: '김준녕',
    },
    {
      id: 2,
      image: '/images/main/Book1/web2.png',
      name: '일어나보니 회장님 비서',
      author: '임헌성',
    },
  ];

  const otherBooksBySameAuthor = [
    {
      id: 3,
      image: '/images/main/Book1/web3.png',
      name: '다른 작품 1',
      author: '저자',
    },
    {
      id: 4,
      image: '/images/main/Book1/web4.png',
      name: '다른 작품 2',
      author: '저자',
    },
  ];

  const reviewsBySameAuthor = [
    {
      id: 5,
      book_id: 3,
      user_id: 'user123',
      review_text: '이 작품 정말 좋아요!',
      rating: 5,
      create_at: '2024-01-10',
    },
    {
      id: 6,
      book_id: 4,
      user_id: 'user456',
      review_text: '재미있는 이야기에요!',
      rating: 4,
      create_at: '2024-01-11',
    },
  ];

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


  const availabilityStyle = {
    backgroundColor: bookData.book_availability === '대출 가능' ? 'blue' : 'red',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='book-detail-container-lhs'>
      <div className="book-detail-content-lhs">
        <div className="book-detail-left-lhs">
          <img src={bookData.image} alt="Book Cover" />
        </div>
        <div className="book-detail-right-lhs">
          <h1>{bookData.book_name}</h1>
          <p><span>저자: </span>{bookData.book_author}</p>
          <p><span>출판사: </span>{bookData.book_publisher}</p>
          <p><span>출판일: </span>{bookData.book_publisher_date}</p>
          <p><span>장르: </span>{bookData.book_genre}</p>
          <p><span>책 고유번호: </span>{bookData.book_ISBN}</p>
          <p><span>책 등록날짜: </span>{bookData.create_at}</p>
          <div className='book-detail-availability-lhs' style={availabilityStyle}>
            <span>{bookData.book_availability}</span>
          </div>
        </div>
        <div className="buttons-container-lhs">
          <button onClick={handleAddToCart}>도서카트</button>
          <button onClick={handleReservation}>예약하기</button>
          <button onClick={() => setNewReview({ ...newReview, book_id: bookData.id })}>
              리뷰 작성
          </button>
        </div>
      </div>
      <div className='book-description-top-lhs'>
        <div className='book-description-top-name-lhs'>
          <h2>책 소개</h2>
        </div>
        <p className='book-description'>{bookData.book_description}</p>
      </div>
      <div className='related-books-container-lhs'>
        <h2>같은 출판사의 다른 작품</h2>
        <div className='related-books-lhs'>
          {relatedBooks.map((relatedBook) => (
            <div key={relatedBook.id} className='related-book-lhs'>
              <NavLink to={`/book/${relatedBook.id}`}>
                <img src={relatedBook.image} alt={`${relatedBook.name} Cover`} />
                <h3>{relatedBook.name}</h3>
                <p>{relatedBook.author}</p>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <div className='other-books-container-lhs related-books-container-lhs'>
        <h2>같은 저자의 다른 작품</h2>
        <div className='other-books-lhs related-books-lhs'>
          {otherBooksBySameAuthor.map((otherBook) => (
            <div key={otherBook.id} className='related-book-lhs'>
              <NavLink to={`/book/${otherBook.id}`}>
                <img src={otherBook.image} alt={`${otherBook.name} Cover`} />
                <h3>{otherBook.name}</h3>
                <p>{otherBook.author}</p>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <div className='reviews-container-lhs'>
        <h2>리뷰</h2>
        {/* 리뷰 목록 표시 로직 추가 */}
        {reviewsBySameAuthor.map((review) => (
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
