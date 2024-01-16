import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config/contansts';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  ButtonGroup,
} from '@mui/material';

const ABook = () => {
  const [axiosResult, setAxiosResult] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = () => {
    axios
      .get(`${API_URL}/api/book`)
      .then((res) => {
        setAxiosResult(res.data);
        const uniqueGenres = [...new Set(res.data.map((book) => book.book_genre))];
        setGenres(uniqueGenres);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleGenreClick = (genre) => {
    const booksByGenre = axiosResult.filter((book) => book.book_genre === genre);
    setFilteredBooks(booksByGenre);
    setCurrentPage(1); // 장르를 바꿀 때 페이지를 1로 초기화
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const renderBooks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToRender = filteredBooks.length > 0 ? filteredBooks : axiosResult;

    return booksToRender.slice(startIndex, endIndex).map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.book_id}</TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" ,whiteSpace: "nowrap",}}>{item.book_name}</TableCell>
        <TableCell>  
          <img
            src={ API_URL + item.book_img_url}
            alt={item.book_title}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </TableCell>
        <TableCell>{item.book_author}</TableCell>
        <TableCell>{item.book_publisher}</TableCell>
        <TableCell>{item.book_genre}</TableCell>
        <TableCell>{item.book_availability}</TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px" ,whiteSpace: "nowrap",}}>{item.book_description}</TableCell>
        <TableCell>{item.book_ISBN}</TableCell>
        <TableCell>{item.created_at}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            // onClick={() => handleEdit(item.banner_id)}
          >
            수정
          </Button>
          <Button
            variant="contained"
            color="error"
            // onClick={() => handleDelete(item.banner_id)}
          >
            삭제
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div style={{ textAlign: 'center',maxWidth: "75vw", margin: "auto", overflowX: 'auto'  }}>
      <ButtonGroup>
        {genres.map((genre, index) => (
          <Button key={index} onClick={() => handleGenreClick(genre)}>
            {genre}
          </Button>
        ))}
      </ButtonGroup>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>표지</TableCell>
              <TableCell>저자</TableCell>
              <TableCell>출판사</TableCell>
              <TableCell>장르</TableCell>
              <TableCell>대출 여부</TableCell>
              <TableCell>줄거리</TableCell>
              <TableCell>고유 번호</TableCell>
              <TableCell>작성 시간</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >{renderBooks()}</TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredBooks.length > 0 ? filteredBooks.length / itemsPerPage : axiosResult.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default ABook;
