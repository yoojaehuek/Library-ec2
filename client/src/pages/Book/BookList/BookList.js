// React에서 useState 및 useEffect를 가져옵니다
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Pagination } from '@mui/material';
import './BookList.scss';
import axios from 'axios';
import { API_URL } from '../../../config/contansts';

const BookList = () => {
  const {search} = useLocation();
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // const [genre, setGenre] = useState(decodeURI(search.split('=')[1]));
  const [books, setBooks] = useState([]);
  // console.log("url: ", genre);
  console.log("url: ", search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWelcome(true);
    }, 500);

    window.scrollTo(0, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const genre = decodeURI(search.split('=')[1]);
    // 데이터베이스에서 도서 목록을 가져오는 로직
    axios.get(`${API_URL}/api/book?book_genre=${genre}`)
      .then(res => {
        setBooks(res.data);
        console.log("관련 도서:", res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [search]);

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 페이지 변경 함수
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`BookList-container-lhs ${showWelcome ? 'show' : ''}`}>
      <div className={`BookList-content-lhs ${showWelcome ? 'show' : ''}`}>
        <div className={`BookList-SF-welcome-lhs ${showWelcome ? 'visible' : ''}`}></div>
        <div className='BookList-content-lhs'>
          <h2>{search.split('=')[1] === undefined ? "도서" : decodeURI(search.split('=')[1])}</h2>
          <div className={`BookList-main-content-lhs  ${showWelcome ? 'show' : ''}`}>
            <div className='BookList-main-img-lhs'>
              {books.slice(indexOfFirstItem,indexOfLastItem).map((item, index) => {
                return (
                  <NavLink to={`/BookDetail/${item.book_id}`} key={index} className={`grid-item-lhs ${item.book_availability === '대출 가능' ? 'available' : 'unavailable'}`}>
                    <div className='grid-item-info-lhs'>
                      <div className='book-image-lhs'>
                        <img src={API_URL + item.book_img_url} alt={`grid${index + 1}`} />
                      </div>
                      <div className='book-details-lhs'>
                          {item.book_availability == 1? 
                            <div className='book-detail-availability-lhs' style={{backgroundColor: "blue"}}> 
                              <span> 대출 가능 </span>
                            </div> 
                            : 
                            <div className='book-detail-availability-lhs' style={{backgroundColor: "red"}}> 
                              <span> 대출 불가 </span>
                            </div> 
                          }
                        <h3>{item.book_name}</h3>
                        <p><span>저자:</span> {item.book_author}</p>
                        <p><span>출판사:</span> {item.book_publisher}</p>
                        <p><span>출판일:</span> {item.created_at}</p>
                        <div className='book-rating-lhs'>
                          <span className='book-rating-name'>평점:</span>
                          {item.average_rating ? (
                            Array.from({ length: item.average_rating }, (_, index) => (
                              <span key={index} className="star-icon">★</span>
                            ))
                          ) : (
                            <span className='book-rating-name'>평점 없음</span>
                          )}
                        </div>
                        <p className='book-description-lhs'>{item.book_description}</p>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
            <div className="pagination-container-lhs" style={{ margin: "0 auto" }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Pagination
                  count={Math.ceil(books.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
