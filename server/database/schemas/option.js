const Sequelize = require("sequelize");


class Option extends Sequelize.Model {
  static initiate(sequelize) {
    Option.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "옵션 이름(양상추, 피클 등등)"
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "개당 가격",
        }
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Option',
        tableName: 'option',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //참조키로 OrderMenu모델에 id(sourceKey)를 order_id(foreignKey)라는 이름으로 보냄
    db.Option.hasMany(db.OrderOption, { foreignKey: 'option_id', sourceKey: 'id'});
  }

}

module.exports = Option;