const Sequelize = require("sequelize");


class Category extends Sequelize.Model {
  static initiate(sequelize) {
    Category.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "What's New 메뉴면 promotion",
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "버튼에 들어갈 텍스트",
        },
        link: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "클릭시 이동할 주소"
        },
        seq: {
          type: Sequelize.INTEGER,
          // autoIncrement: true,
          allowNull: false,
          unique: true,
          comment: "표시될 순서"
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Category',
        tableName: 'category',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //참조키로 SubCategory모델에 id(sourceKey)를 category_id(foreignKey)라는 이름으로 보냄
    db.Category.hasMany(db.SubCategory, { foreignKey: 'category_id', sourceKey: 'id'});
  }

}

module.exports = Category;