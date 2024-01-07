const Sequelize = require("sequelize");

class Effort extends Sequelize.Model {
  static initiate(sequelize) {
    Effort.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        admin_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "admin테이블의 id참초",
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        title_description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        img_url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        sub_title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        sub_title_description: {
          type: Sequelize.TEXT, //텍스트는 가변 길이 문자열(STRING보다 긴 데이터에 적합) 
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Effort',
        tableName: 'effort',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    //참조키로 SubCategory모델의 id(targetKey)를 sub_category_id(foreignKey)라는 이름으로 가져옴
    db.Effort.belongsTo(db.Admin, {foreignKey: 'admin_id', targetKey: 'id'});
  }
}

module.exports = Effort;
