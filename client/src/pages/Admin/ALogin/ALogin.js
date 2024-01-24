import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/contansts";
import axios from "axios";
import {setCookie} from '../../../utils/cookie'

const ALogin = () => {
  const navigate = useNavigate();
  const setTime = 3600000; //1시간 (1000 = 1초)
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const { email, password } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onLogin = () => {
    console.log(email, password);
    axios.post(`${API_URL}/api/admin/login`, {email, password})
    .then(res => {
      console.log(res);
      setCookie('login', res.data.data,{
        expires: new Date(Date.now() + setTime),
      });
      navigate('/admin');
    }).catch(err => {
      console.error(err.response.data);
      alert('로그인 실패!');
    })
  }

  const heandleKeyUp = (e) => {
    console.log(e);
    if (e.key === 'Enter') {
      onLogin(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  }

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
          <p style={{ fontSize: '0.8rem'}}>ID: i1004902@naver.com<br/>pwd: 123</p>
        </Typography>
        <TextField
          label="이메일"
          variant="outlined"
          fullWidth
          margin="normal"
          autoFocus
          name="email"
          onChange={onChange}
          value={email}
          onKeyUp={heandleKeyUp}
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          style={{ marginTop: "10px" }}
          onChange={onChange}
          value={password}
          onKeyUp={heandleKeyUp}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={onLogin}
        >
          로그인
        </Button>
        {/* <Link to={'/'}>메인 페이지로</Link> */}
        {/* <a href="javascript:location.replace('/app1')">메인 페이지로</a> */}
        <a href="javascript:location.replace('/')">메인 페이지로</a>
      </Paper>
    </Container>
  );
};

export default ALogin;