const Sequelize = require("sequelize");

class Faq extends Sequelize.Model {
  static initiate(sequelize) {
    Faq.init(
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
        category: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false, 
        },
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
    //참조키로 SubCategory모델의 id(targetKey)를 sub_category_id(foreignKey)라는 이름으로 가져옴
    db.Effort.belongsTo(db.Admin, {foreignKey: 'admin_id', targetKey: 'id'});
  }
}

module.exports = Faq;
