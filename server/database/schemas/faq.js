const Sequelize = require("sequelize");

class Faq extends Sequelize.Model {
  static initiate(sequelize) {
    Faq.init(
      {
        faq_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        admin_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          comment: "admin테이블의 id참초",
        },
        faq_tags: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isIn: [['기타', '사이트이용', '계정', '대출', '도서']],
          },
          comment: "문의 카테고리"
        },
        faq_title: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "문의 제목",
        },
        faq_content: {
          type: Sequelize.TEXT,
          allowNull: false,
          comment: "문의 내용",
        },
        faq_password: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "문의 비밀번호",
        },
        faq_response: {
          type: Sequelize.TEXT,
          allowNull: true,
          comment: "관리자 답변 내용",
        },
        faq_response_time: {
          type: Sequelize.DATE,
          allowNull: true,
          comment: "답변 작성일",
        },
        faq_status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: "문의 상태 대기[0], 완료[1]",
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
        modelName: 'Faq',
        tableName: 'faq',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    //참조키로 Admin 모델의 admin_id(targetKey)를 admin_id(foreignKey)라는 이름으로 가져옴
    db.Faq.belongsTo(db.Admin, {foreignKey: 'admin_id', targetKey: 'admin_id'});

    //참조키로 User 모델의 user_id(targetKey)를 user_id(foreignKey)라는 이름으로 가져옴
    db.Faq.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'user_id'});
  }
}

module.exports = Faq;
