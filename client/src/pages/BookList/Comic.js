import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Button, Pagination, Stack } from '@mui/material';
import './BookList.scss';

const Comic = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 표시할 항목 수

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWelcome(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const gridData = [
    { 
      image: '/images/main/Book1/martial.png', 
      text: '전생한 태권도 9단', 
      author: '작가1', 
      publisher: '출판사1', 
      publicationDate: '2022-01-10', 
      rating: 4.5,
      description: '태권도 국가대표로 활약하던 김지환이 사고로 죽게 되어 다음 세계에서 다시 깨어납니다. 그리고 그는 전생한 태권도 9단이 되어 다양한 모험과 로맨스를 겪게 됩니다. 초월적인 능력과 예측 불가능한 전개로 독자들을 매료시키는 작품!',
      availability: '대출 불가능', // Adjust the availability status
    },
    { 
      image: '/images/main/Book1/web.png', 
      text: '전생한 태권도 9단', 
      author: '작가1', 
      publisher: '출판사1', 
      publicationDate: '2022-01-10', 
      rating: 4,
      description: '책의 소개글이 여기에 들어갑니다. 이 부분은 책의 내용에 대한 간단한 소개 또는 요약이 들어가게 됩니다.333333333333333333333333333333333',
      availability: '대출 불가능', // Adjust the availability status
    },
    { 
      image: '/images/main/Book1/web.png', 
      text: '전생한 태권도 9단', 
      author: '작가1', 
      publisher: '출판사1', 
      publicationDate: '2022-01-10', 
      rating: 4.5,
      description: '책의 소개글이 여기에 들어갑니다. 이 부분은 책의 내용에 대한 간단한 소개 또는 요약이 들어가게 됩니다.333333333333333333333333333333333',
      availability: '대출 가능', // Adjust the availability status
    },
    { 
      image: '/images/main/Book1/web.png', 
      text: '전생한 태권도 9단', 
      author: '작가1', 
      publisher: '출판사1', 
      publicationDate: '2022-01-10', 
      rating: 4.5,
      description: '책의 소개글이 여기에 들어갑니다. 이 부분은 책의 내용에 대한 간단한 소개 또는 요약이 들어가게 됩니다.333333333333333333333333333333333',
      availability: '대출 가능', // Adjust the availability status
    },
    { 
      image: '/images/main/Book1/web.png', 
      text: '전생한 태권도 9단', 
      author: '작가1', 
      publisher: '출판사1', 
      publicationDate: '2022-01-10', 
      rating: 4.5,
      description: '책의 소개글이 여기에 들어갑니다. 이 부분은 책의 내용에 대한 간단한 소개 또는 요약이 들어가게 됩니다.333333333333333333333333333333333',
      availability: '대출 가능', // Adjust the availability status
    },
    { 
      image: '/images/main/Book1/web.png', 
      text: '전생한 태권도 9단', 
      author: '작가1', 
      publisher: '출판사1', 
      publicationDate: '2022-01-10', 
      rating: 4.5,
      description: '책의 소개글이 여기에 들어갑니다. 이 부분은 책의 내용에 대한 간단한 소개 또는 요약이 들어가게 됩니다.333333333333333333333333333333333',
      availability: '대출 가능', // Adjust the availability status
    },
  ];

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gridData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 함수
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`BookList-container-lhs ${showWelcome ? 'show' : ''}`}>
      <div className={`BookList-content-lhs ${showWelcome ? 'show' : ''}`}>
        <div className={`BookList-Comic-welcome-lhs ${showWelcome ? 'visible' : ''}`}></div>
        <div className='BookList-content-lhs'>
          <div className={`BookList-main-content-lhs  ${showWelcome ? 'show' : ''}`}>
            <div className='BookList-main-img-lhs'>
              {currentItems.map((item, index) => {
                const availabilityStyle = {
                  backgroundColor: item.availability === '대출 가능' ? 'blue' : 'red',
                };

                return (
                  <NavLink to='/BookDetail' key={index} className={`grid-item-lhs ${item.availability === '대출 가능' ? 'available' : 'unavailable'}`}>
                    <div className='grid-item-info-lhs'>
                      <div className='book-image-lhs'>
                        <img src={item.image} alt={`grid${index + 1}`} />
                      </div>
                      <div className='book-details-lhs'>
                        <div className='book-detail-availability-lhs' style={availabilityStyle}>
                          <span>{item.availability}</span>
                        </div>
                        <h3>{item.text}</h3>
                        <p><span>저자:</span> {item.author}</p>
                        <p><span>출판사:</span> {item.publisher}</p>
                        <p><span>출판일:</span> {item.publicationDate}</p>
                        <div className='book-rating-lhs'>
                          <p>평점: {item.rating}</p>
                        </div>
                        <p className='book-description-lhs'>{item.description}</p>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
            <div className="pagination-container-lhs" style={{margin:"0 auto"}}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Pagination
                  count={Math.ceil(gridData.length / itemsPerPage)}
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

export default Comic;
