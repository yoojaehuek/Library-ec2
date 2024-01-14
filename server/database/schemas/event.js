const Sequelize = require("sequelize");

class Event extends Sequelize.Model {
  static initiate(sequelize) {
    Event.init(
      {
        event_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          comment: "event_id",
        },
        event_title: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "이벤트 제목",
        },
        event_img_url: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "이벤트 썸네일 이미지 경로", 
        },
        event_status: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
          comment: "이벤트 상태 (0: 종료, 1: 진행중, 2: 상시)"
        },
        event_start_date: {
          type: Sequelize.DATE,
          allowNull: false,
          comment: "이벤트 시작일"
        },
        event_end_date: {
          type: Sequelize.DATE,
          allowNull: false,
          comment: "이벤트 종료일"
        },
        read_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: "이벤트 조회 수"
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
        modelName: 'Event',
        tableName: 'event',
        paranoid: true, //true : softdelete 1 (deleted_at column 생성 후 복원에 이용 가능)
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
  }
}

module.exports = Event;
