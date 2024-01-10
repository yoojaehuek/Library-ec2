const Sequelize = require("sequelize");

class Review extends Sequelize.Model {
  static initiate(sequelize) {
    Review.init(
      {
        review_id: { //컬럼명
          type: Sequelize.INTEGER, //타입
          primaryKey: true, //기본키
          autoIncrement: true, //하나씩 자동 증가
          allowNull: false, //null 금지 true면 허용
          comment: "review_id",
        },
        book_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "책 id",
        },
        user_id: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "유저 id",
        },
        review_reating: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            min: 0,
            max: 5,
          },
          comment: "별점", 
        },
        review_title: {
          type: Sequelize.STRING,
          allowNull: false, 
          comment: "리뷰 제목",
        },
        review_content: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "리뷰 내용",
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
          comment: "작성일",
        }
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Review',
        tableName: 'review',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    //참조키로 User 모델의 user_id(targetKey)를 user_id(foreignKey)라는 이름으로 가져옴
    db.Review.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'user_id'});

    //참조키로 User 모델의 user_id(targetKey)를 user_id(foreignKey)라는 이름으로 가져옴
    db.Review.belongsTo(db.Book, {foreignKey: 'book_id', targetKey: 'book_id'});
  }
}

module.exports = Review;
