const Sequelize = require("sequelize");


class Order extends Sequelize.Model {
  static initiate(sequelize) {
    Order.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "누가 주문했는지(user테이블의 id 가져옴)",
        },
        store_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "어느 지점에서 주문했는지(store테이블의 id 가져옴)",
        },
        status: {
          type: Sequelize.ENUM('주문대기', '조리중', '배달중', '배달완료'),
          allowNull: false,
          defaultValue: "주문대기",
          comment: "주문 상태(ENUM은 ()안에 있는 값만 넣을 수 있음)"
        },
        total_price:{
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "총 가격",
        },
        cancel_yn: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: '주문 취소 여부(기본 false)'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
          comment: "주문한 DATE",
        }
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Order',
        tableName: 'order',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //참조키로 OrderMenu모델에 id(sourceKey)를 order_id(foreignKey)라는 이름으로 보냄
    db.Order.hasMany(db.OrderMenu, { foreignKey: 'order_id', sourceKey: 'id'});

    //참조키로 User모델의 id(targetKey)를 user_id(foreignKey)라는 이름으로 가져옴
    db.Order.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'});

    //참조키로 Store모델의 id(targetKey)를 store_id(foreignKey)라는 이름으로 가져옴
    db.Order.belongsTo(db.Store, {foreignKey: 'store_id', targetKey: 'id'});
  }

}

module.exports = Order;