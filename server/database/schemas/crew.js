const Sequelize = require('sequelize');

class Crew extends Sequelize.Model {
  static initiate(sequelize) {
    Crew.init(
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
        store_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        img_url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        position: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "직책",
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Crew',
        tableName: 'crew',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    //참조키로 SubCategory모델의 id(targetKey)를 sub_category_id(foreignKey)라는 이름으로 가져옴
    db.Crew.belongsTo(db.Admin, {foreignKey: 'admin_id', targetKey: 'id'});

    //참조키로 SubCategory모델의 id(targetKey)를 sub_category_id(foreignKey)라는 이름으로 가져옴
    db.Crew.belongsTo(db.Store, {foreignKey: 'store_id', targetKey: 'id'});
  }
}

module.exports = Crew;
