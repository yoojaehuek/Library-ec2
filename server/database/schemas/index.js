const Sequelize = require('sequelize');
const Admin = require('./admin');
const Faq = require('./faq');
const User = require('./user'); //user파일을 User로 불러옴 
const Book = require('./book');
const Loans = require('./loans');

const env = process.env.NODE_ENV || 'development'; //상수 env에 NODE_ENV없으면 'development' 넣음
const config = require('../../config/config.json')[env]; //상수config에 ../config/config파일에서 env(development) 불러옴
const db = {}; //상수 db라는 빈 객체 생성

//sequelize 인스턴스 생성../config/config파일의 development 내용들 넣음  
const sequelize = new Sequelize(config.database, config.username, config.password, config); 

//생성된 인스턴스를 나중에 재사용하기 위해 db.sequelize에 넣음
db.sequelize = sequelize;

//만든 모델들 추가
db.Admin = Admin;
db.User = User;
db.Faq = Faq;
db.Book = Book;
db.Loans = Loans;



Admin.initiate(sequelize);
User.initiate(sequelize);
Faq.initiate(sequelize);
Book.initiate(sequelize);
Loans.initiate(sequelize);


Admin.associate(db);
User.associate(db);
Faq.associate(db);
Book.associate(db);
Loans.associate(db);

module.exports = db;