const Sequelize = require("sequelize");
//고객(id, pw, name, phone, 생일, 성별, companionName, companionPhone)
class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "(기본키)",
      },
      email: {
        type: Sequelize.STRING,
        unique: true, //중복되면 안됨
        allowNull: false,
        comment: "ID(이메일)",
      },
      pwd: {
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
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "회원 전화번호",
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "주소",
      },
      detail_address: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "상세주소",
      },
      birth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        comment: "생년월일",
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
    //참조키로 Order모델에 id(sourceKey)를 user_id(foreignKey)라는 이름으로 보냄
    db.User.hasMany(db.Order, { foreignKey: 'user_id', sourceKey: 'id'});
    // db.User.hasMany(db.PlayHistory, { foreignKey: 'userId', sourceKey: 'id'});
    // db.User.hasMany(db.PlayList, { foreignKey: 'userId', sourceKey: 'id'});
    // db.User.hasMany(db.Reservation, { foreignKey: 'userId', sourceKey: 'id'});//Reservation로 보냄 hasMany 가 보낸다 라는뜻
  }
};

module.exports = User;