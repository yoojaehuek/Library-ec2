import { API_URL } from "../../../config/contansts";
import { useState, useEffect } from "react";
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
} from '@mui/material';

const ARental = () => {
  const [axiosResult, setAxiosResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchLoanData();
  }, []);

  const handleChangePage = (loan, value) => {
    setCurrentPage(value);
  };

  const renderLoans = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const loansToRender = filteredLoans.length > 0 ? filteredLoans : axiosResult;

    return loansToRender.slice(startIndex, endIndex).map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.loan_id}</TableCell>
        <TableCell sx={{overrflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px", whiteSpace: "nowrap"}}>{item.book_name}</TableCell>
        <TableCell>
          <img
            src={ API_URL + item.book_img_url}
            alt={item.book_name}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </TableCell>
        <TableCell>{item.book_author}</TableCell>
        <TableCell>{item.book_description}</TableCell>
        <TableCell>{item.user_name}</TableCell>
        <TableCell>{item.due_date}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
          >
            기간 연장
          </Button>
          <Button
            variant="contained"
            color="error"
          >
            미반납
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: "75vw", margin: "auto", overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Loan ID</TableCell>
              <TableCell>Book Name</TableCell>
              <TableCell>Book Author</TableCell>
              <TableCell>Book Description</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderLoans()}</TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredLoans.length > 0 ? filteredLoans / itemsPerPage : axiosResult.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        />
    </div>
  );
};

export default ARental;