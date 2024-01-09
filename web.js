const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
require('dotenv').config();
const { sequelize } = require('./server/database/schemas');//DB테이블
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./server/utils/errorMiddleware');
const adminRouter = require('./server/routers/admin');
const bookRouter = require('./server/routers/book');
const faqRouter = require('./server/routers/faq');
const loansRouter = require('./server/routers/loans');
const userRouter = require('./server/routers/user');
// const multer = require('multer'); //파일 업로드

//시퀄라이즈 연결 부분
sequelize.sync({ force: false }) //force가 true면 킬때마다 DB 새로 만듬
.then(() => { 
  console.log("DB연결 성공");
})
.catch((err) => {
  console.error(err);
});


app.use(cookieParser());

// URL-encoded방식 사용할수있게 설정 (.urlencoded()은 x-www-form-urlencoded형태의 데이터를 해석  )
// json형식의 데이터를 처리할 수 있게 설정 (.json()은 JSON형태의 데이터를 해석.)
// 자세한 설명: https://kirkim.github.io/javascript/2021/10/16/body_parser.html
app.use(express.urlencoded({extended: false}));  
app.use(express.json());

// 브라우저 cors 이슈를 막기 위해 사용(모든 브라우저의 요청을 일정하게 받겠다)
var cors = require('cors');
app.use(cors());



app.use('/api/admin', adminRouter);
app.use('/api/book', bookRouter);
app.use('/api/faq', faqRouter);
app.use('/api/loans', loansRouter);
app.use('/api/user', userRouter);

app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

app.listen(port, () => {
  console.log(`${port}에서 대기중....`);
})