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
        admin_id: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "참조해온 어드민 id", 
        },
        event_title: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "이벤트 제목",
        },
        event_thumbnail_img_url: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "이벤트 썸네일 이미지 경로", 
        },
        event_content_img_url: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "이벤트 내용 이미지 경로",
        },
        event_status: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "이벤트 상태 설정 (0: 종료, 1: 진행중 2: 상시)",
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
    //참조키로 admin 모델의 admin_id(sourceKey)를 admin_id(targetKey)라는 이름으로 받음
    db.Event.belongsTo(db.Admin, { foreignKey: 'admin_id', targetKey: 'admin_id'});
  }
}

module.exports = Event;
