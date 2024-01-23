# Library

> Library는 책 목록을 관리하고 도서 대출을 처리하는 곳으로, 사용자들이 다양한 도서 정보를 확인하고 책을 대출할 수 있는 편리한 서비스를 제공

<br/>

## 대표화면 - 보류
<table>
  <tr>
    <td><b>메인 페이지</b></td>
    <td><b>관리자 페이지</b></td>
  </tr> 
  <tr>
    <td><img src="/readme-file/main-page.png" alt="메인 페이지"></td>
    <td><img src="/readme-file/admin-page.png" alt="관리자 페이지"></td>
  </tr>
</table>

<br/>

## 어떤 서비스인가요?

- Library는 도서 목록을 체계적으로 관리하고 이용자들이 쉽게 이용할 수 있는 서비스 입니다. 사용자들은 온라인으로 책 목록을 검색하고 자신의 관심 도서를 쉽게 찾을 수 있습니다. 뿐만 아니라, 도서 대출 및 반납, 이벤트 기능을 통해 효율적으로 도서 이용을 할 수 있어서 더욱 편리한 서비스를 제공합니다.

## Contents

Click to scroll to that page

1. How to start? : 시작 가이드
2. Project Info : 프로젝트 소개

- ​Project intention : 프로젝트 기획 의도
- Service : 서비스
- How can use this project?

3. Stacks : 사용 기술 스택
4. WEB MVP & Project tree : 주요 기능 및 프로젝트 구조

- 기능 소개
- ERD
- Architecture

5. Trouble Shooting : 트러블 슈팅
6. END with Members: 프로젝트 멤버 및 역할 소개

## 1. How to start : 시작 가이드

For building and running the application you need :

- [Node.js 18.16.1](https://nodejs.org/en)
- [npm 9.7.2](https://www.npmjs.com/)

Installation

```bash
git clone [https://github.com/KJH1225/mcdonald.git](https://github.com/KJH1225/library.git)
cd library
```

Front

```
cd client
npm install
npm start
```

Back

```
npm install
npm start
```

Back-end API test

- 보류


## 💻 2. Project Info : 프로젝트 소개

### ✔️개발 기간

- 2024.01.08 ~ 2024.01.23 (2주)

- [개발 일정 구글 시트](https://docs.google.com/spreadsheets/d/1R1KUtuODEuizrx0bBrmfxCxtfQW6UtqwfBAnY3XxS_I/edit#gid=205256937)

### ✔️ 배포 서버

- www.i1004902.com

### ✔️ 프로젝트 기획 의도

서비스 소개

- 책 목록: Library는 다양한 주제와 장르의 책을 손쉽게 찾아볼 수 있습니다. 직관적이고 정확한 검색 닝을 통해 사용자들은 자신에게 맞는 도서를 빠르게 찾을 수 있습니다.
- 도서 대출 및 반납: Library는 간편하고 빠른 도서 대출 및 반납 서비스를 제공합니다. 온라인으로 도서를 예약하고 대출 기간을 관리하는 것 뿐만 아니라, 편리한 반납을 통해 이용자들은 무리 없이 도서를 반환할 수 있습니다.
- 이벤트 및 프로모션: Libary에서는 다양한 도서 이벤트와 프로모션을 주기적으로 개최하여 이용자들에게 더 많은 도서를 경험할 수 있는 기회를 제공합니다. 할인 행사, 특별 이벤트 등 다양한 활동을 통해 도서관 이용을 더욱 즐겁게 만듭니다.
  
기능 소개

- 책 목록
- 책 설명
- 책 카트
- 이벤트
- 회원 가입 / 탈퇴
- SNS 회원가입, 로그인
- 로그인 / 로그아웃
- 마이페이지
- 대출 및 반납 서비스
- FAQ
- 관리자페이지
- 반응형 디자인

### ✔️ 서비스

#### 서비스 설명
1. 웹 서비스의 최종적인 메인 기능과 서브 기능 설명

   1. 책 목록
      - 다양한 장르 및 주제의 책 목록을 둘러보고 검색
      - 추천 서비스를 통해 새로운 책을 추천

    2. 책 설명 
        - 책 저자, 출판사, 소개 등 책 상세 설명
        - 대출 가능 여부 확인을 통해 예약 및 카트 기능
        - 리뷰를 통해 다른 이용자들의 평가 확인 가능
        
    3. 책 카트
        - 카트에 넣은 책 목록 확인
        - 선택을 통해 원하는 책 대출 신청 기능
    
    4. 이벤트
        - 주기적으로 진행되는 이벤트와 프로모션 기능
        - 할인 행사, 작가 강연, 도서 모임 등 다양한 기능
        - 신청 및 취소를 통해 인원 관리
    
    5. 회원가입/탈퇴 기능
        - 회원가입을 통해 서비스에 가입 및 이용 가능
        - 필요한 정보를 데이터베이스에 저장(아이디, 비밀번호 등)
        - 가입 후 로그인 가능
        - 마이페이지에서 회원 탈퇴 가능
        - 탈퇴 전 추가 확인 창이 표시되며, 확인 후 회원 정보 삭제
    
    6. 로그인/로그아웃 기능
        - 등록된 사용자 아이디, 비밀번호를 입력하여 로그인 가능
        - 서버는 입력된 정보를 검증 후 올바른 경우 인증 토큰 부여
        - 인증 토큰 확인하여 권한 있는지 확인 후 서비스 모든 기능 이용
        - 사용자는 세션 토큰을 통해 로그인 상태 유지
        - 서버에 요청을 보낼 때마다 토큰 유효성 확인/만료시 로그인 페이지로 리다이렉트
        - 로그아웃 클릭 시 세션 토큰을 무효화하여 로그아웃 처리
        - 로그아웃 후 일부 기능 접근 제한
        - SNS 로그인 기능
    
    7. FAQ
        - 공지사항 및 고객의 질문 답변
        - 카테고리별 질문 등록
        - 관리자 답변 시스템
        - 이용자가 작성한 질문 등록 및 관리 기능
    
    8. 마이페이지 기능
        - 마이페이지에서 개인 정보를 확인하고 수정 가능
        - 작성한 FAQ 내역 확인
        - 대출 중인 도서 목록 확인
        - 반납한 도서 리뷰 등록
        - 이벤트 참여 내역 확인

    9. 대출 및 반납
        - 원하는 책 대출 가능
        - 책 반납, 연장, 삭제 기능
        - 세션 스토리지에 책을 저장 후 대출신청 버튼을 클릭 시 DB에 저장
        - 책별 대출 유저 조회
          
    10. 관리자 페이지
        - 관리자 로그인을 통해 페이지 관리
        - 관리자 메인 페이지에 대시보드를 통해 실시간 데이터 확인 가능
        - 책 조회 및 관리
        - 이벤트 조회 및 관리
        - 배너 조회 및 관리
        - Faq 조회 및 관리
        - 대출 조회 및 관리
        - 유저 조회 및 관리
        - 관리자 사용설명서 
      
4. 유저 시나리오
  - WHO 
    - 책을 사랑하고 지식을 탐험하고자 하는 모든 이용자. 독서 애호가부터 새로운 취향을 찾고자 하는 이용자들까지 지적 성장을 추구하는 분들
  - WHAT
    - 다양한 장르와 주제를 아우르는 풍부한 도서 목록 제공, 온라인 상에서 손쉽게 책을 찾고 대여할 수 있으며, 이벤트 및 프로모션으 통해 독서 경험을 더욱 풍부하게
  - WHEN
    - 급하게 필요하거나 심심할 때. 짧은 시간을 이용해서 원하는 책을 바로 찾고 대출까지
  - WHERE
    - 온라인 플랫폼으로 어디서든 접속하여 이용. 사용자들은 휴대폰, 태블릿, 노트북 등 다양한 디바이스에서 이용하며 지역 제한 없이 서비스 이용
  - WHY
    - 도서를 효율적으로 관리하고 지식을 확장. 다양한 이벤트와 프로모션을 통해 책을 더욱 즐겁게 읽고 편리한 온라인 플랫폼을 통해 언제 어디서든 자유롭게 이용 가능


### ✔️ 프로젝트 구조

#### 🧩 front-end

![front-end](/readme-file/front-end.svg)

- [Figma](https://www.figma.com/file/HPMp3fH03gnm2DGoSrhoFp/Untitled?type=design&mode=design&t=ae8A2zEzPWDRUevB-0)

  
> 페이지별 구조

- Main : 페이지 기반으로 구현된 서비스.
* Main : 메인페이지/ 경로 접속 시 라우팅되는 메인 페이지
* booklist : 책 장르 리스트 보여주는 페이지
* bookdetail : 책 상세 정보 보여주는 페이지
* cart : 원하는 책 선택 후 대출하는 페이지
* event : 이달의 프로모션, 이벤트 보여주는 페이지
* faq : 관리자 공지사항 및 유저 질문 보여주는 페이지
* Login : 로그인 페이지
* Join : 회원가입 페이지
* Mypage: 회원 계정 정보, 대출 및 반납 목록, FAQ, 리뷰 작성 페이지
* Admin : 페이지 관리 페이지
<br/><br/>
#### 🧩 back-end
<br/>

![back-end](/readme-file/back-end.svg)

> 로직 구조

- config : 환경변수 설정
- model : DB와 연동하여 사용자가 입력한 데이터나 사용자에게 출력할 데이터 질의
- schemas : DB와 테이블 정의
- sqlFile : DB 파일 저장
- routes : 요청 받은 정보를 알맞게 가공 후 사용자가 입력한 데이터나 사용자에게 출력할 데이터 질의
- controllers : 서비스로 요청 전달 및 응답 
- utils/token: JWT토큰 생성, 회원 인증
- services : 요청받은 정보를 알맞게 가공하는 로직 수행

<br/>

#### 🧩 ERD

<br/>

![ERD](/readme-file/ERD.png)

- [ERD 다이어그램](https://dbdiagram.io/d/Library-6597ad0dac844320ae4b51b1)

<br/>

#### 🧩 Architecture

![Architecture](/readme-file/Architecture.svg)

<br/>

### ✔️ 페이지 구성

## 💻 3. Stacks

<img alt="Html" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/> <img alt="react" src ="https://img.shields.io/badge/react-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=white"/> <img alt="node.js" src ="https://img.shields.io/badge/node.js-339933.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="express" src ="https://img.shields.io/badge/express-000000.svg?&style=for-the-badge&logo=express&logoColor=white"/> <img alt="Sequelize" src ="https://img.shields.io/badge/sequelize-52B0E7.svg?&style=for-the-badge&logo=sequelize&logoColor=white"/> <img alt="MySQL" src ="https://img.shields.io/badge/mysql-4479A1.svg?&style=for-the-badge&logo=mysql&logoColor=white"/> <img alt="MUI" src ="https://img.shields.io/badge/mui-007FFF.svg?&style=for-the-badge&logo=mui&logoColor=white"/> 

### 💻 Dependencies

<img alt="npm" src ="https://img.shields.io/badge/npm-CB3837.svg?&style=for-the-badge&logo=npm&logoColor=white"/> <img alt="axios" src ="https://img.shields.io/badge/axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white"/> <img alt=".env" src ="https://img.shields.io/badge/.ENV-ECD53F.svg?&style=for-the-badge&logo=dotenv&logoColor=white"/> <img alt="multer" src ="https://img.shields.io/badge/multer-000000.svg?&style=for-the-badge&logo=multer&logoColor=White"/> <img alt="jsonwebtokens" src ="https://img.shields.io/badge/jsonwebtokens-000000.svg?&style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>

### 🔗 Cooperation

<img alt="github" src ="https://img.shields.io/badge/github-000000.svg?&style=for-the-badge&logo=github&logoColor=white"/> <img alt="discord" src ="https://img.shields.io/badge/discord-5662F6.svg?&style=for-the-badge&logo=discord&logoColor=white"/>

### 🌏 With Deploy

<img alt="Amazon" src ="https://img.shields.io/badge/Amazon EC2-FF9900.svg?&style=for-the-badge&logo=amazonec2&logoColor=white"/> <img alt="nginx" src ="https://img.shields.io/badge/nginx-009639.svg?&style=for-the-badge&logo=nginx&logoColor=white"/> <img alt="pm2" src ="https://img.shields.io/badge/pm2-2B037A.svg?&style=for-the-badge&logo=pm2&logoColor=white"/>

## 5. 트러블 슈팅
 
 ### 1. Multer 업로드 후 이미지 표시 이슈
 
  - 문제: upload 폴더에 여러 폴더를 만들고 경로에 맞게 업로드 시 이미지가 표시되지 않는 문제
  - 해결책: multer 설정에서 destination 속성을 사용하여 파일 저장될 동적인 폴더 경로를 설정함. 경로 생성 시 업로드된 파일의 속성 등을 활용하여 각각 다른 폴더에 저장하도록 함

```
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
        }else {
          cb(null, 'server/upload/');
        }
      },
      filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      },
    }),
  });
  
  app.post("/api/bannerimg", upload.single("bannerimg"), (req, res) => {
    const file = req.file;
    console.log("post(/image) file:", file);
    res.send({
      imageUrl: "/server/upload/banner/" + file.filename,
    });
  });

  ...
```
    
 ### 2. 반응형 디자인 및 코드 간소화

  - 문제: 다양한 화면 크기에 대응하지 않고 복잡한 코드 구조로 유지보수 어려움 문제
  - 해결책: 미디어 쿼리를 활용하여 화면 크기에 따라 스타일을 동적으로 설정 및 중복 코드를 제거하고 모듈화된 코드 구조를 채택하여 코드의 가독성을 높이고 유지보수를 용이하게 함.

## 6. END

- 한국정보교육원 웹 프론트엔드 클라우드 콘솔 개발자 양성과정 3회차 1조 

## ✔️프로젝트 멤버 구성

|  front-end   | back-end |
| :----------: | :------- |
| 김지환(팀장) | 김지환    |
|    김준녕    | 김준녕   |
|    임헌성    | 임헌성   |
|    박승균    |         |
|    백승준    | 백승준   |
|    김정혁    | 김정혁   |
|    유재혁    | 유재혁    |    
## 팀원별 역할

### 김지환(팀장)

- 이벤트 페이지
- 이벤트 상세 페이지
- 책, 로그인, 회원가입, (관)로그인, (관)회원관리 백엔드
- 반응형 디자인 및 UI 스타일링
- AWS EC2 활용하여 프로젝트 배포 (www.i1004902.com/app4)
- NginX 리버스 프록시, https 적용
- Node.js, React 폴더 구조 설계 (Controllers-Services-models 구조)
- JWT accessToken, refreshToken과 Redis를 사용한 사용자 인증 구현
- Recoil 상태관리 라이브러리를 사용해 사용자 로그인 상태 관리
- 백엔드 API 설계 및 DB 구조 설계


### 김준녕

- Faq 페이지
- 관리자 페이지 대시보드 구현
- 관리자 로그인 페이지
- 관리자 회원 관리 페이지
- 관리자 Faq 관리 페이지
- FAQ 백엔드
- 반응형 디자인 및 UI 스타일링


### 유재혁

- 로그인 페이지
- 회원가입 페이지
- 장바구니 페이지
- 장바구니, 대출관리 백엔드
- 반응형 디자인 및 UI 스타일링


### 김정혁

- 헤더, 푸터 컴포넌트
- 마이페이지 프론트엔드
- 관리자 리뷰 관리 페이지
- 리뷰 관리, 마이페이지 백엔드
- 반응형 디자인 및 UI 스타일링

  
### 임헌성

- 메인 페이지
- 책 목록 페이지
- 책 상세 페이지
- 관리자 책 관리 페이지
- 관리자 배너 관리 페이지
- 배너, 책 백엔드
- 반응형 디자인 및 UI 스타일링

### 박승균

- 설명서 작성
- 관리자 사용설명서 페이지


### 백승준

- 이벤트 백엔드
- 관리자 대출 관리 페이지
- 관리자 이벤트 관리 페이지
- 반응형 디자인 및 UI 스타일링

  


