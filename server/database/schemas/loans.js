const Sequelize = require("sequelize");

class Loans extends Sequelize.Model {
  static initiate(sequelize) {
    Loans.init(
      { 
        loans_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        book_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "book테이블의 id참초",
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        loan_date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
          comment: "대출일",
        },
        due_date: {
          type: Sequelize.DATE,
          allowNull: false,
          comment: "반납일",
        },
        is_returned: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false, 
          comment: "반환 여부 표시",
        },
        returned_date: {
          type: Sequelize.DATE,
          allowNull: true,
          comment: "실제 반납일",
        }
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Loans',
        tableName: 'loans',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // //참조키로 Admin 모델의 admin_id(targetKey)를 admin_id(foreignKey)라는 이름으로 가져옴
    // db.Loans.belongsTo(db.Admin, {foreignKey: 'admin_id', targetKey: 'admin_id'});

    //참조키로 Admin 모델의 admin_id(targetKey)를 admin_id(foreignKey)라는 이름으로 가져옴
    db.Loans.belongsTo(db.Book, {foreignKey: 'book_id', targetKey: 'book_id'});
    
    //참조키로 User 모델의 user_id(targetKey)를 user_id(foreignKey)라는 이름으로 가져옴
    db.Loans.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'user_id'});
  }
}

module.exports = Loans;
