import React, { useState } from 'react';
import './rentalmanage.scss'

const Book = ({ book, onExtension, onReturn }) => {
  return (
    <div className="book_container">      
      <div className="book_details">
        <img src={book.coverImage} alt="Book Cover" className="book_image" />
        <div className="book_title">{book.title}</div>
        <div className="book_author">{book.author}</div>
        <div className="book_description">{book.description}</div>
        <div className="button_container">
          <button className="button_extension" onClick={() => onExtension(book.id)}>
            연장
          </button>
          <button className="button_return" onClick={() => onReturn(book.id)}>
            반납
          </button>
        </div>
      </div>
    </div>
  );
};

const LibraryPage = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: '책 제목 1',
      author: '작가 1',
      description: '책에 대한 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      coverImage: '/images/book1.jpg',
    },
    {
      id: 2,
      title: '책 제목 2',
      author: '작가 2',
      description: '책에 대한 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      coverImage: '/images/book1.jpg',
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

export default LibraryPage;
