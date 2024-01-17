import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config/contansts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  TablePagination,
  Typography,
} from "@mui/material";

const AFaq = () => {
  const [axiosResult, setAxiosResult] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFaqId, setEditFaqId] = useState(null);
  const [editAnswer, setEditAnswer] = useState("");
  const [editResponseTime, setEditResponseTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [editStatus, setEditStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchFaqData();
  }, []);

  const fetchFaqData = () => {
    axios
      .get(`${API_URL}/api/faq`)
      .then((res) => {
        setAxiosResult(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEdit = (faq_Id) => {
    setEditFaqId(faq_Id);
    setOpenEditDialog(true);

    axios
      .get(`${API_URL}/api/faq/${faq_Id}`)
      .then((res) => {
        const faqDetails = res.data[0];
        console.log(faqDetails);
        setEditTitle(faqDetails.faq_title);
        setEditContent(faqDetails.faq_content);
        setEditAnswer(faqDetails.faq_response);
        setEditResponseTime(faqDetails.faq_response_time);
        setEditStatus(faqDetails.faq_status);
      })
      .catch((err) => {
        console.error(`에러. ${faq_Id}:`, err);
      });
  };

  const handleSaveEdit = () => {
    axios
      .patch(`${API_URL}/api/faq/${editFaqId}`, {
        faq_response: editAnswer,
        faq_response_time: editResponseTime,
        faq_status: editStatus,
        //faq_status: editStatus === '1' ? '답변 완료' : '대기',
      })
      .then(() => {
        fetchFaqData();
        setOpenEditDialog(false);
        setEditFaqId(null);
        setEditAnswer("");
        setEditResponseTime(new Date().toISOString().slice(0, 16));
        setEditStatus("");
      })
      .catch((err) => {
        console.error(`업데이트 에러. ${editFaqId}:`, err);
      });
  };

  const handleCancelEdit = () => {
    setOpenEditDialog(false);
    setEditFaqId(null);
    setEditAnswer("");
    setEditResponseTime("");
    setEditStatus("");
  };

  const handleDelete = (faq_Id) => {
    const userPassword = prompt("비밀번호 입력하세요:");
    if (userPassword !== null) {
      axios
        .delete(`${API_URL}/api/faq/${faq_Id}`, {
          data: { faq_password: userPassword },
        })
        .then(() => {
          console.log(` ${faq_Id} 삭제 완료.`);
          fetchFaqData();
        })
        .catch((err) => {
          console.error(`에러 ${faq_Id}:`, err);
        });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "90%", margin: "auto", textAlign: "center" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>순번</TableCell>
            <TableCell>사용자</TableCell>
            <TableCell>관리자</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>내용</TableCell>
            <TableCell>비밀번호</TableCell>
            <TableCell>답변</TableCell>
            <TableCell>답변 시간</TableCell>
            <TableCell>답변 상태</TableCell>
            <TableCell>작성일</TableCell>
            <TableCell>관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {axiosResult.slice(startIndex, endIndex).map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.faq_id}</TableCell>
              <TableCell>{item.User.user_name}</TableCell>
              <TableCell>{item.admin_id}</TableCell>
              <TableCell>{item.faq_tags}</TableCell>
              <TableCell
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.faq_title}
              </TableCell>
              <TableCell
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.faq_content}
              </TableCell>
              <TableCell>{item.faq_password}</TableCell>
              <TableCell
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.faq_response}
              </TableCell>
              <TableCell>{item.faq_response_time}</TableCell>
              {/* <TableCell>{item.faq_status}</TableCell> */}
              <TableCell>{item.faq_status ? "답변 완료" : "대기"}</TableCell>
              <TableCell>{item.created_at}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(item.faq_id)}
                >
                  수정
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item.faq_id)}
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={openEditDialog}
        onClose={handleCancelEdit}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>FAQ 수정</DialogTitle>
        <DialogContent>
          <div style={{ float: "left", width: "50%" }}>
            <Typography variant="h6">Title:</Typography>
            <Typography>{editTitle}</Typography>
            <Typography variant="h6">Content:</Typography>
            <Typography>{editContent}</Typography>
          </div>
          <TextField
            label="답변"
            fullWidth
            margin="normal"
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
          />
          <TextField
            label="답변 시간"
            fullWidth
            margin="normal"
            type="datetime-local"
            value={editResponseTime}
            onChange={(e) => setEditResponseTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <RadioGroup
            row
            aria-label="답변 상태"
            name="editStatus"
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
          >
            <FormControlLabel value="false" control={<Radio />} label="대기" />
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="답변 완료"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>취소</Button>
          <Button onClick={handleSaveEdit} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>

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
  );
};

export default AFaq;
