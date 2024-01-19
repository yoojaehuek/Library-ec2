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

const AEvent = () => {
  const [axiosResult, setAxiosResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchEventData();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const renderEvents = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const eventsToRender = filteredEvents.length > 0 ? filteredEvents : axiosResult;

    return eventsToRender.slice(startIndex, endIndex).map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.event_id}</TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px", whiteSpace: "nowrap"}}>{item.event_name}</TableCell>
        <TableCell>
          <img
            src={ API_URL + item.event_img_url}
            alt={item.event_title}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </TableCell>
        <TableCell>{item.event_status}</TableCell>
        <TableCell>{item.event_start_date}</TableCell>
        <TableCell>{item.event_end_date}</TableCell>
        <TableCell>{item.event_max_applicants}</TableCell>
        <TableCell>{item.event_read_count}</TableCell>
        <TableCell>{item.created_at}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
          >
            수정
          </Button>
          <Button
            variant="contained"
            color="error"
          >     
            삭제       
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: "75vw", margin: "auto", overflowX: 'auto '}}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event ID</TableCell>
              <TableCell>Event 타이틀</TableCell>
              <TableCell>Event 이미지</TableCell>
              <TableCell>Event 상태</TableCell>
              <TableCell>Event 시작일</TableCell>
              <TableCell>Event 종료일</TableCell>
              <TableCell>Event 최대인원</TableCell>
              <TableCell>Event 조회수</TableCell>
              <TableCell>Event 작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderEvents()}</TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredEvents.length > 0 ? filteredEvents / itemsPerPage : axiosResult.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        />
    </div>
  );
};

export default AEvent;