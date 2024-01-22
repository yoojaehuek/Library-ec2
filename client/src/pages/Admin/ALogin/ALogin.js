import React from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

const ALogin = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10vh",
      }}
    >
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "16px" }}>
        <Typography variant="h4" style={{ marginBottom: "20px" }}>
          관리자 로그인
        </Typography>
        <TextField
          label="아이디"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          style={{ marginTop: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          로그인
        </Button>
      </Paper>
    </Container>
  );
};

export default ALogin;