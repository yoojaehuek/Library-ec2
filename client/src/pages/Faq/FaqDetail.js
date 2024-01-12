import React, { useEffect, useState } from "react";
import { Typography, Box, IconButton, Button } from "@mui/material";
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/contansts";
import axios from "axios";

const adminAnswer = {
  author: "관리자",
  date: "2024-01-10",
  answer: "이 질문에 대한 답변입니다.",
};

const FaqDetail = () => {
  const [detailfaq, setDetailFaq] = useState("");
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get(`${API_URL}/api/faq/${id}`)
      .then((res) => {
        setDetailFaq(res.data[0]);
        console.log(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const goBack = () => {
    window.history.length > 1 ? window.history.back() : window.location.href = "/";
  };

  const handleDelete = () => {
    const userConfirmed = window.confirm("삭제하시겠습니까?");
  
    if (userConfirmed) {
      const Checkpassword = window.prompt("비밀번호를 입력하세요.");
  
      if (Checkpassword) {
        axios.delete(`${API_URL}/api/faq/${id}`, { data: { faq_password: Checkpassword } })
          .then(() => {
            goBack();
            alert("삭제되었습니다.");
          })
          .catch((error) => {
            console.error("에러:", error);
            alert(error.response.data.message);
          });
      } else {
        console.log("삭제가 취소되었습니다.");
      }
    } else {
      console.log("삭제가 취소되었습니다.");
    }
  };
  
  return (
    <Box
      maxWidth="35vw"
      mx="auto"
      p={4}
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      backgroundColor="#f8f8f8"
      borderRadius="2vw"
      margin= "5vw auto"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid #ddd"
        paddingBottom="10px"
        marginBottom="20px"
        borderRadius="8px"
        backgroundColor="#fff"
        padding="10px"
      >
        <Typography variant="subtitle1" style={{ color: "#333" }}>
          카테고리: {detailfaq.faq_tags}
        </Typography>
        <Typography variant="subtitle1" style={{ color: "#555" }}>
          작성자: {detailfaq.User && detailfaq.User.user_name}
          {/* 작성자: {detailfaq.User.user_name} */}
        </Typography>
        <Typography variant="subtitle1" style={{ color: "#555" }}>
          날짜: {detailfaq.created_at}
        </Typography>
        <Button onClick={handleDelete}>삭제</Button>
      </Box>
      <Box
        borderBottom="1px solid #ddd"
        paddingBottom="20px"
        marginBottom="20px"
        borderRadius="8px"
        backgroundColor="#fff"
        padding="20px"
        maxHeight="30vh"
        overflowY="auto"
      >
        <Typography
          variant="h4"
          style={{
            marginBottom: "20px",
            color: "#333",
            fontSize: "1rem",
          }}
        >
          제목: {detailfaq.faq_title}
        </Typography>
        <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>
        <Typography variant="body1" style={{ color: "#555" }}>
          {detailfaq.faq_content}
        </Typography>
      </Box>
      {detailfaq && ![1, 2, 3, 4].includes(detailfaq.faq_id) && (
  <Box
    borderBottom="1px solid #ddd"
    paddingBottom="20px"
    borderRadius="8px"
    backgroundColor="#fff"
    padding="20px"
  >
    {detailfaq.faq_status === 1 ? (
      <>
        <Typography
          variant="h5"
          style={{
            color: "#007bff",
            marginBottom: "10px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px"
          }}
        >
          관리자 답변
        </Typography>
        <Typography variant="subtitle1" style={{ marginBottom: "10px", color: "#555" }}>
          작성자: {adminAnswer.author}
        </Typography>
        <Typography variant="subtitle1" style={{ marginBottom: "10px", color: "#555" }}>
          날짜: {adminAnswer.date}
        </Typography>
        <Typography variant="body1" style={{ color: "#555" }}>
          내용: {adminAnswer.answer}
        </Typography>
      </>
    ) : (
      <Typography variant="subtitle1" style={{ color: "#555" }}>
        아직 관리자 답변이 없습니다.
      </Typography>
    )}
  </Box>
)}
      <IconButton style={{ position: 'absolute', top: '30%', left: '25%' }} onClick={goBack}>
        {/* <ArrowBackIcon style={{fontSize: '2.5rem'}} /> */}
      </IconButton>
    </Box>
  );
}   

export default FaqDetail;
