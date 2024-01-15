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

const AUser = () => {
  const [axiosResult, setAxiosResult] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get(`${API_URL}/api/user`)
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

  const handleDelete = (userId) => {
    axios
		.delete(`${API_URL}/api/user/${userId}`)
		.then(() => {
			console.log(` ${userId} 삭제 완료.`);
			fetchUserData();
		})
		.catch((err) => {
			console.error(` ${userId} 에러:`, err);
		})
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
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>전화번호</TableCell>
              <TableCell>SNS 타입</TableCell>
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
                <TableCell>{item.user_id}</TableCell>
                <TableCell>{item.user_email}</TableCell>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.user_phone}</TableCell>
                <TableCell>{item.sns_type ? item.sns_type : 'X'}</TableCell>
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

export default AUser;
