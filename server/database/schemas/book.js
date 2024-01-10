const Sequelize = require("sequelize");

class Book extends Sequelize.Model {
  static initiate(sequelize) {
    Book.init(
      {
        book_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          comment: "book_id",
        },
        book_name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "책 제목",
        },
        book_img_url: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "책 표지 파일 경로", 
        },
        book_author: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "저자", 
        },
        book_publisher: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "출판사", 
        },
        // book_publication_date: {
        //   type: Sequelize.DATE,
        //   allowNull: false,
        //   comment: "저자",
        // },
        book_genre: {
          type: Sequelize.STRING,
          allowNull: false, 
          comment: "장르",
        },
        book_availability: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          comment: "도서 대출 가능 여부", 
        },
        book_description: {
          type: Sequelize.TEXT,
          allowNull: false, 
          comment: "책 요약",
        },
        book_ISBN: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "책 고유 번호",
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
        modelName: 'Book',
        tableName: 'book',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    //참조키로 Loans 모델에 book_id(sourceKey)를 book_id(foreignKey)라는 이름으로 보냄
    db.Book.hasMany(db.Loans, { foreignKey: 'book_id', sourceKey: 'book_id'});

    //참조키로 Loans 모델에 book_id(sourceKey)를 book_id(foreignKey)라는 이름으로 보냄
    db.Book.hasMany(db.Review, { foreignKey: 'book_id', sourceKey: 'book_id'});
  }
}

module.exports = Book;
