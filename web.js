const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 8001;
const { sequelize } = require("./server/database/schemas"); //DB테이블
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./server/utils/errorMiddleware");
const adminRouter = require("./server/routers/admin");
const bookRouter = require("./server/routers/book");
const reviewRouter = require("./server/routers/review");
const faqRouter = require("./server/routers/faq");
const loansRouter = require("./server/routers/loans");
const userRouter = require("./server/routers/user");
const bannerRouter = require("./server/routers/banner");
const eventRouter = require("./server/routers/event");
const naverRouter = require("./server/routers/naver");
const event_applicantsRouter = require("./server/routers/event_applicants");
const googleRouter = require('./server/routers/google');
const kakaoRouter = require('./server/routers/kakao');
const multer = require("multer"); //파일 업로드

//시퀄라이즈 연결 부분
sequelize
  .sync({ force: false}) //force가 true면 킬때마다 DB 새로 만듬
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 브라우저 cors 이슈를 막기 위해 사용(모든 브라우저의 요청을 일정하게 받겠다)
var cors = require("cors");
app.use(cors());

// '/server/upload'경로로 뭔가 요청이오면 여기서 걸리고 server/upload폴더의 정적 파일을 제공하겠다
// 예: "/server/upload/image.jpg")에 액세스하면 Express.js는 "server/upload" 디렉터리에서 정적 파일을 찾아 제공
// app.use("/app4/api/server/upload", express.static(__dirname + "/server/upload"));
// app.use("/app4/api/server/upload", express.static("server/upload"));
app.use("/app4/api/server/upload", express.static("server/upload"));

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("멀터 req: ", req);
      console.log("멀터 file: ", file);
      if (file.fieldname == "bannerimg") {
        cb(null, "server/upload/banner/");
      }
      else if (file.fieldname == "bookimg") {
        cb(null, 'server/upload/book/');
      }else if (file.fieldname == "eventimg") {
        cb(null, 'server/upload/event/');
      }else {
        cb(null, 'server/upload/');
      }
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

app.post("/app4/api/bannerimg", upload.single("bannerimg"), (req, res) => {
  const file = req.file;
  console.log("post(/image) file:", file);
  res.send({
    imageUrl: "/api/server/upload/banner/" + file.filename,
  });
});

app.post("/app4/api/eventimg", upload.single("eventimg"), (req, res) => {
  const file = req.file;
  console.log("post(/image) file:", file);
  res.send({
    imageUrl: "/api/server/upload/event/" + file.filename,
  });
});

app.post("/app4/api/bookimg", upload.single("bookimg"), (req, res) => {
  const file = req.file;
  console.log("post(/image) file:", file);
  res.send({
    imageUrl: "/api/server/upload/book/" + file.filename,
  });
});

app.use("/app4/api/admin", adminRouter);
app.use("/app4/api/book", bookRouter);
app.use("/app4/api/review", reviewRouter);
app.use("/app4/api/faq", faqRouter);
app.use("/app4/api/loans", loansRouter);
app.use("/app4/api/user", userRouter);
app.use("/app4/api/banner", bannerRouter);
app.use("/app4/api/event", eventRouter);
app.use("/app4/api/naver", naverRouter);
app.use("/app4/api/event_applicants", event_applicantsRouter);
app.use("/app4/api/google", googleRouter);
app.use("/app4/api/kakao", kakaoRouter);

app.use(errorMiddleware);

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

app.listen(port, () => {
  console.log(`${port}에서 대기중....`);
});
