const Sequelize = require("sequelize");


class OrderOption extends Sequelize.Model {
  static initiate(sequelize) {
    OrderOption.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        orderMenu_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "어떤 주문인지",
        },
        option_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "어떤 상품인지",
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "수량",
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'OrderOption',
        tableName: 'orderoption',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //참조키로 Option모델의 id(targetKey)를 option_id(foreignKey)라는 이름으로 가져옴
    db.OrderOption.belongsTo(db.Option, {foreignKey: 'option_id', targetKey: 'id'});

    //참조키로 OrderMenu모델의 id(targetKey)를 orderMenu_id(foreignKey)라는 이름으로 가져옴
    db.OrderOption.belongsTo(db.OrderMenu, {foreignKey: 'orderMenu_id', targetKey: 'id'});
  }

}

module.exports = OrderOption;