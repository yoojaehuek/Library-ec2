import React, { useState } from 'react';
import './rentalmanage.scss'

const PageTitle = () => {
  <div className="PageTitle">
      <h2>123</h2>
    </div>
}

const Book = ({ book, onExtension, onReturn }) => {
  return (
    <>
    <div className="book_container">
      <PageTitle/>
        <div className="book_details">
          <img src={book.coverImage} alt="Book Cover" className="book_image" />
          <h3 className="book_title">{book.title}</h3>
          <p className="book_author">{book.author}</p>
          <p className="book_desc_title">{book.desctitle}</p>
          <p className="book_description">{book.description}</p>
          <div className="button_container">
            <button className="button_extension" onClick={() => onExtension(book.id)}>
              기간 연장
            </button>
            <button className="button_return" onClick={() => onReturn(book.id)}>
              반납 확인
            </button>
          </div>
          <p className="book_user">대여자 : {book.user}</p>
          <p className="book_daylimit">반납예정일 : {book.daylimit}</p>
        </div>
      </div>        
    </>
  );
};

const RentalManage = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: '책 제목 1',
      author: '작가 1',
      desctitle : '책에 대한 설명',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      coverImage: '/images/Rental/book1.jpg',
      user: '홍길동',
      daylimit: '2024-01-10',
    },
    {
      id: 2,
      title: '책 제목 2',
      author: '작가 2',
      desctitle : '책에 대한 설명',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      coverImage: '/images/book1.jpg',
      user: '홍길동',
      daylimit: '2024-01-10',
    },
    // Add more books as needed
  ]);

  const handleExtension = (bookId) => {
    console.log(`Book ${bookId} extensioned`);
  };

  const handleReturn = (bookId) => {
    console.log(`Book ${bookId} returned`);
  };

  return (
    <div>
      {books.map((book) => (
        <Book key={book.id} book={book} onRent={handleExtension} onReturn={handleReturn} />
      ))}
    </div>
  );
};

export default RentalManage;
