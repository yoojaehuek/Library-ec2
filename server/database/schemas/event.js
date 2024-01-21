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
          type: Sequelize.DataTypes.ENUM('always', 'ongoing', 'expired'),
          defaultValue: 'ongoing',          
          comment: "이벤트 상태 설정( 1 : always, 2 : ongoing, 3 : expired)",
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
        event_max_applicants: {
          type: Sequelize.INTEGER,
          allowNull: true,
          comment: "이벤트 인원 제한"
        },
        event_current_applicants: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: "현재 이벤트 신청인원"
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
    //참조키로 Event_applicants 모델에 user_id(sourceKey)를 user_id(foreignKey)라는 이름으로 보냄
    db.Event.hasMany(db.Event_applicants, { foreignKey: 'event_id', sourceKey: 'event_id'});
  }
}

module.exports = Event;
