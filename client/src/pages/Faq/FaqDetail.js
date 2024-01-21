import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/contansts";
import axios from "axios";

const FaqDetail = () => {
  const [detailfaq, setDetailFaq] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/faq/${id}`)
      .then((res) => {
        setDetailFaq(res.data[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const goBack = () => {
    window.history.length > 1
      ? window.history.back()
      : (window.location.href = "/");
  };

  const handleDelete = () => {
    const userConfirmed = window.confirm("삭제하시겠습니까?");

    if (userConfirmed) {
      const Checkpassword = window.prompt("비밀번호를 입력하세요.");

      if (Checkpassword) {
        axios
          .delete(`${API_URL}/api/faq/${id}`, {
            data: { faq_password: Checkpassword },
          })
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
      width={{ xs: "75%", sm: "70%", md: "60%", lg: "45%" }}
      mx="auto"
      p={4}
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      backgroundColor="#f8f8f8"
      borderRadius="2vw"
      margin="5vw auto"
      position="relative"
    >
      <Box
  display="flex"
  flexDirection={{ xs: "column", md: "row" }}  // Change here
  justifyContent={{ xs: "flex-start", md: "space-between" }}  // Change here
  alignItems={{ xs: "flex-start", md: "center" }}  // Change here
  borderBottom="1px solid #ddd"
  paddingBottom="10px"
  marginBottom="20px"
  borderRadius="8px"
  backgroundColor="#fff"
  padding="10px"
>
  <Typography variant="subtitle1" style={{ color: "#333", fontSize: "0.9rem" }}>
    카테고리: {detailfaq.faq_tags}
  </Typography>
  <Typography variant="subtitle1" style={{ color: "#555", fontSize: "0.9rem" }}>
    작성자: {detailfaq.User && detailfaq.User.user_name}
  </Typography>
  <Typography variant="subtitle1" style={{ color: "#555", fontSize: "0.9rem" }}>
    날짜: {detailfaq.created_at}
  </Typography>
  <Button variant="contained" style={{ backgroundColor: "green" }} onClick={handleDelete} size="small">
    삭제
  </Button>
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
        <div
          style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}
        ></div>
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
          {detailfaq.faq_status === true ? (
            <>
              <Typography
                variant="h5"
                style={{
                  color: "#007bff",
                  marginBottom: "10px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                }}
              >
                관리자 답변
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: "10px", color: "#555" }}
              >
                작성자: {detailfaq.admin_id}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: "10px", color: "#555" }}
              >
                날짜: {detailfaq.faq_response_time}
              </Typography>
              <Typography variant="body1" style={{ color: "#555" }}>
                내용: {detailfaq.faq_response}
              </Typography>
            </>
          ) : (
            <Typography variant="subtitle1" style={{ color: "#555" }}>
              아직 관리자 답변이 없습니다.
            </Typography>
          )}
        </Box>
      )}
      <Button
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50px",
          color: "white",
          fontSize: "1rem",
          backgroundColor: "green",
        }}
        onClick={goBack}
      >
        목록
      </Button>
    </Box>
  );
};

export default FaqDetail;
