const Sequelize = require("sequelize");


class Store extends Sequelize.Model {
  static initiate(sequelize) {
    Store.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        store_name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "지점명",
        },
        phone: {
          type: Sequelize.STRING(20),
          allowNull: false,
          comment: "지점 전화번호",
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
          comment: "주소",
        },
        start_time: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "판매 시작 시간",
        },
        end_time: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "판매 종료 시간",
        },
        latitude: {
          type: Sequelize.FLOAT(11),
          allowNull: false,
          comment: "위도 좌표"
        },
        longitude: {
          type: Sequelize.FLOAT,
          allowNull: false,
          comment: "경도 좌표"
        },
        yn_24h: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: "24시간 운영 여부(시작시간이 00이고 종료시간이 24면 true넣고 아니면 false)"
        },
        yn_mcmorning: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: "맥모닝 파는지 여부"
        },
        yn_mcdrive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: "맥드라이브 여부"
        },
        yn_mcdelivery: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: "맥딜리버리 여부"
        },
        yn_parking: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: "주차 가능 여부"
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Store',
        tableName: 'store',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //참조키로 Crew모델에 id(sourceKey)를 store_id(foreignKey)라는 이름으로 보냄
    db.Store.hasMany(db.Crew, { foreignKey: 'store_id', sourceKey: 'id'});

    //참조키로 Crew모델에 id(sourceKey)를 store_id(foreignKey)라는 이름으로 보냄
    db.Store.hasMany(db.Order, { foreignKey: 'store_id', sourceKey: 'id'});
  }

}

module.exports = Store;