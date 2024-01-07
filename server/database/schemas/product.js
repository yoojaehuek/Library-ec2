const Sequelize = require("sequelize");

class Product extends Sequelize.Model {
  static initiate(sequelize) {
    return Product.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: "상품 아이디 (기본키)",
        },
        sub_category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "서브카테고리 아이디 참조",
        },
        admin_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "admin테이블의 id참초",
        },
        product_category:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          comment: "세트, 단품 여부",
        },
        k_name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "한국어 상품 이름",
        },
        e_name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "영어 상품 이름",
        },
        thumbnail_img_url: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "썸네일 이미지 경로",
        },
        seq: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "표시될 순서"
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "상품 설명",
        },
        sale_start_time: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "판매 시작 시간",
        },
        sale_end_time: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "판매 종료 시간",
        },
        llergen_information: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "알러지 정보",
        },
        cuntry_of_origin: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "원산지",
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "상품 가격",
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
          comment: "등록일",
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Product',
        tableName: 'product',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    //참조키로 OrderMenu모델에 id(sourceKey)를 product_id(foreignKey)라는 이름으로 보냄
    db.Product.hasMany(db.OrderMenu, { foreignKey: 'product_id', sourceKey: 'id'});

    //참조키로 Admin모델의 id(targetKey)를 admin_id(foreignKey)라는 이름으로 가져옴
    db.Product.belongsTo(db.Admin, { foreignKey: 'admin_id', targetKey: 'id'});

    //참조키로 SubCategory모델의 id(targetKey)를 sub_category_id(foreignKey)라는 이름으로 가져옴
    db.Product.belongsTo(db.SubCategory, { foreignKey: 'sub_category_id', targetKey: 'id'});
  }
}

module.exports = Product;
