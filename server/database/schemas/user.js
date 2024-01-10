const Sequelize = require("sequelize");
class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        comment: "ID(이메일)",
      },
      user_pwd: {
        type: Sequelize.STRING(128),
        allowNull: false,
        comment: "비밀번호",
      },
      salt: {
        type: Sequelize.STRING(200),
        allowNull: false,
        comment: "암호화할때 쓴 난수",
      }, 
      user_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "이름",
      },
      user_phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "회원 전화번호",
      },
      user_address: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "주소",
      },
      user_detail_address: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "상세주소",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "회원 가입일",
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'user',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    //참조키로 Faq 모델에 user_id(sourceKey)를 user_id(foreignKey)라는 이름으로 보냄
    db.User.hasMany(db.Faq, { foreignKey: 'user_id', sourceKey: 'user_id'});

    //참조키로 Loans 모델에 user_id(sourceKey)를 user_id(foreignKey)라는 이름으로 보냄
    db.User.hasMany(db.Loans, { foreignKey: 'user_id', sourceKey: 'user_id'});

    //참조키로 Loans 모델에 user_id(sourceKey)를 user_id(foreignKey)라는 이름으로 보냄
    db.User.hasMany(db.Review, { foreignKey: 'user_id', sourceKey: 'user_id'});
  }
};

module.exports = User;