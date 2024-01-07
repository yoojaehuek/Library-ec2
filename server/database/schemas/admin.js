const Sequelize = require("sequelize");
//고객(id, pw, name, phone, 생일, 성별, companionName, companionPhone)
class Admin extends Sequelize.Model {
  static initiate(sequelize) {
    Admin.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID (기본키)",
      },
      email: {
        type: Sequelize.STRING,
        unique: true, //중복되면 안됨
        allowNull: false,
        comment: "이메일",
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
      admin_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "이름",
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "전화번호",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "가입일",
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Admin',
      tableName: 'admin',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    // 참조키로 Effort모델에 id(sourceKey)를 admin_id(foreignKey)라는 이름으로 보냄
    db.Admin.hasMany(db.Effort, { foreignKey: 'admin_id', sourceKey: 'id'});

    // 참조키로 Crew모델에 id(sourceKey)를 admin_id(foreignKey)라는 이름으로 보냄
    db.Admin.hasMany(db.Crew, { foreignKey: 'admin_id', sourceKey: 'id'});

    // 참조키로 Faq모델에 id(sourceKey)를 admin_id(foreignKey)라는 이름으로 보냄
    db.Admin.hasMany(db.Faq, { foreignKey: 'admin_id', sourceKey: 'id'});

    // 참조키로 Material모델에 id(sourceKey)를 admin_id(foreignKey)라는 이름으로 보냄
    db.Admin.hasMany(db.Material, { foreignKey: 'admin_id', sourceKey: 'id'});

    // 참조키로 Faq모델에 id(sourceKey)를 admin_id(foreignKey)라는 이름으로 보냄
    db.Admin.hasMany(db.Product, { foreignKey: 'admin_id', sourceKey: 'id'});
    
  }
};

module.exports = Admin;