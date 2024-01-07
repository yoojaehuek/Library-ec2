const Sequelize = require("sequelize");


class OrderMenu extends Sequelize.Model {
  static initiate(sequelize) {
    OrderMenu.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        order_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "어떤 주문인지",
        },
        product_id: {
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
        modelName: 'OrderMenu',
        tableName: 'ordermenu',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //참조키로 OrderMenu모델에 id(sourceKey)를 order_id(foreignKey)라는 이름으로 보냄
    db.OrderMenu.hasMany(db.OrderOption, { foreignKey: 'orderMenu_id', sourceKey: 'id'});

    //참조키로 User모델의 id(targetKey)를 user_id(foreignKey)라는 이름으로 가져옴
    db.OrderMenu.belongsTo(db.Order, {foreignKey: 'order_id', targetKey: 'id'});

    //참조키로 Store모델의 id(targetKey)를 store_id(foreignKey)라는 이름으로 가져옴
    db.OrderMenu.belongsTo(db.Product, {foreignKey: 'product_id', targetKey: 'id'});
  }

}

module.exports = OrderMenu;