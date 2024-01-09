import React, { useEffect, useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
        setDetailFaq(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const goBack = () => {
    window.history.length > 1 ? window.history.back() : window.location.href = "/";
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
          카테고리: {detailfaq.category}
        </Typography>
        <Typography variant="subtitle1" style={{ color: "#555" }}>
          작성자: {detailfaq.author}
        </Typography>
        <Typography variant="subtitle1" style={{ color: "#555" }}>
          날짜: {detailfaq.date}
        </Typography>
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
          제목: {detailfaq.question}
        </Typography>
        <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>
        <Typography variant="body1" style={{ color: "#555" }}>
          {detailfaq.content}
        </Typography>
      </Box>
      {detailfaq.answer ? (
        <Box
          borderBottom="1px solid #ddd"
          paddingBottom="20px"
          borderRadius="8px"
          backgroundColor="#fff"
          padding="20px"
        >
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
            {adminAnswer.answer}
          </Typography>
        </Box>
      ) : (
        <Box
          borderBottom="1px solid #ddd"
          paddingBottom="20px"
          borderRadius="8px"
          backgroundColor="#fff"
          padding="20px"
        >
          <Typography variant="subtitle1" style={{ color: "#555" }}>
            아직 관리자 답변이 없습니다.
          </Typography>
        </Box>
      )}
      <IconButton style={{ position: 'absolute', top: '20%', left: '22%' }} onClick={goBack}>
        <ArrowBackIcon style={{fontSize: '2.5rem'}} />
      </IconButton>
    </Box>
  );
  }  

export default FaqDetail;
