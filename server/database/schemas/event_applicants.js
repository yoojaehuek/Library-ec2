const Sequelize = require("sequelize");

class Event_applicants extends Sequelize.Model {
  static initiate(sequelize) {
    Event_applicants.init(
      {
        event_applicants_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          comment: "event_applicants_id",
        },
        event_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "event_id",
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "user_id", 
        },            
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
          comment: "작성일",
        }
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Event_applicants',
        tableName: 'event_applicants',
        paranoid: true, //true : softdelete 1 (deleted_at column 생성 후 복원에 이용 가능)
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    //참조키로 Event_applicants 모델의 Event_applicants_id(targetKey)를 Event_applicants_id(foreignKey)라는 이름으로 가져옴
    db.Event_applicants.belongsTo(db.Event, {foreignKey: 'event_id', targetKey: 'event_id'});

    //참조키로 User 모델의 user_id(targetKey)를 user_id(foreignKey)라는 이름으로 가져옴
    db.Event_applicants.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'user_id'});
  }
}

module.exports = Event_applicants;
