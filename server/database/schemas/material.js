const Sequelize = require("sequelize");

class Material extends Sequelize.Model {
  static initiate(sequelize) {
    Material.init(
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
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        additional_info: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        img_url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        background_img_url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Material',
        tableName: 'material',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    //참조키로 Admin모델의 id(targetKey)를 admin_id(foreignKey)라는 이름으로 가져옴
    db.Material.belongsTo(db.Admin, {foreignKey: 'admin_id', targetKey: 'id'});
  }
}

module.exports = Material;
