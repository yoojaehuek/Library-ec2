const Sequelize = require('sequelize');
const Admin = require('./admin');
const Category = require('./category');
const Crew = require('./crew');
const Effort = require('./effort');
const Faq = require('./faq');
const Material = require('./material');
const Option = require('./option');
const Order = require('./order');
const OrderOption = require('./orderOption');
const OrderMenu = require('./orderMenu');
const Product = require('./product');
const WhatsNew = require('./whatsNew');
const Store = require('./store')
const SubCategory = require('./subCategory');
const User = require('./user'); //user파일을 User로 불러옴 
const Slider = require('./slider');
const Banner = require('./banner');

const env = process.env.NODE_ENV || 'development'; //상수 env에 NODE_ENV없으면 'development' 넣음
const config = require('../../config/config.json')[env]; //상수config에 ../config/config파일에서 env(development) 불러옴
const db = {}; //상수 db라는 빈 객체 생성

//sequelize 인스턴스 생성../config/config파일의 development 내용들 넣음  
const sequelize = new Sequelize(config.database, config.username, config.password, config); 

//생성된 인스턴스를 나중에 재사용하기 위해 db.sequelize에 넣음
db.sequelize = sequelize;

//만든 모델들 추가
db.Admin = Admin;
db.Category = Category;
db.SubCategory = SubCategory;
db.Banner = Banner;
db.Store = Store;
db.User = User;
db.Effort = Material;
db.Faq = Faq;
db.Material = Material;   
db.Crew = Crew;
db.Option = Option;
db.Product = Product;
db.Order = Order;
db.OrderMenu = OrderMenu;
db.OrderOption = OrderOption;
db.WhatsNew = WhatsNew;
db.Slider = Slider;



Admin.initiate(sequelize);
Category.initiate(sequelize);
SubCategory.initiate(sequelize);
Banner.initiate(sequelize);
Store.initiate(sequelize);
User.initiate(sequelize);
Effort.initiate(sequelize);
Faq.initiate(sequelize);
Material.initiate(sequelize);
Crew.initiate(sequelize);
Option.initiate(sequelize);
Product.initiate(sequelize);
Order.initiate(sequelize);
OrderMenu.initiate(sequelize);
OrderOption.initiate(sequelize);
WhatsNew.initiate(sequelize);
Slider.initiate(sequelize);


Admin.associate(db);
Category.associate(db);
SubCategory.associate(db);
Banner.associate(db);
Store.associate(db);
User.associate(db);
Effort.associate(db);
Faq.associate(db);
Material.associate(db);
Crew.associate(db);
Option.associate(db);
Product.associate(db);
Order.associate(db);
OrderMenu.associate(db);
OrderOption.associate(db);
WhatsNew.associate(db);
Slider.associate(db);

module.exports = db;