import React from 'react';
import './BookDetail.scss';

const BookDetail = () => {
  const bookData = {
    image: '/images/main/Book1/martial.png',
    book_name: '책 제목',
    book_author: '저자',
    book_publisher: '국제북기',
    book_publisher_date: '출판일',
    book_genre: '장르',
    book_availability: '대출 불가능', // 여기서 '대출가능' 또는 '불가능'으로 변경
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

  const handleReservation = () => {
    console.log('예약하기');
  };

  const handleAddToCart = () => {
    console.log('도서카트에 추가');
  };



  const availabilityStyle = {
    backgroundColor: bookData.book_availability === '대출 가능' ? 'blue' : 'red',
  };

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
              <img src={relatedBook.image} alt={`${relatedBook.name} Cover`} />
              <h3>{relatedBook.name}</h3>
              <p>{relatedBook.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default BookDetail;
