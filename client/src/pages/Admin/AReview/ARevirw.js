import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config/contansts';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";

const AReview = () => {
  const [axiosResult, setAxiosResult] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchReviewData();
  }, []);

  const fetchReviewData = () => {
    axios
      .get(`${API_URL}/api/review`)
      .then((res) => {
        setAxiosResult(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

	const handleDelete = (review_id) => {
		const deleteUser = window.confirm("리뷰를 삭제하시겠습니까?");
		
		if (deleteUser) {
			axios
				.delete(`${API_URL}/api/review/${review_id}`)
				.then(() => {
					console.log(`리뷰 사용자 삭제 완료.`);
					fetchReviewData();
				})
				.catch((err) => {
					console.error(`리뷰 삭제 중 에러:`, err);
				});
		} else {
			console.log('삭제 취소');
		}
	};
	

  return (
    <>
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "90%", margin: "auto", textAlign: "center" }}
    >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>리뷰 ID</TableCell>
              <TableCell>책 ID</TableCell>
              <TableCell>리뷰 제목</TableCell>
              <TableCell>유저 ID</TableCell>
              <TableCell>평점</TableCell>
              <TableCell>리뷰 내용</TableCell>
              <TableCell>생성일</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? axiosResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : axiosResult
            ).map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.review_id}</TableCell>
                <TableCell>{item.book_id}</TableCell>
                <TableCell>{item.review_title}</TableCell>
                <TableCell>{item.user_id}</TableCell>
                <TableCell>{item.review_rating}</TableCell>
                <TableCell>{item.review_content}</TableCell>
                <TableCell>{item.created_at}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(item.user_id)} variant="contained" color="secondary">
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
				<TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={axiosResult.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>
    </>
  );
};

export default AReview;
