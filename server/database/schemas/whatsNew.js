const Sequelize = require("sequelize");


class WhatsNew extends Sequelize.Model {
  static initiate(sequelize) {
    WhatsNew.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        sub_category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "서브카테고리 참조",
        },
        thumbnail_img_url: {
          type: Sequelize.STRING,
          allowNull: true, //null허용!!!!!!
          comment: "썸네일 이미지 주소"
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "타이틀"
        },
        seq: {
          type: Sequelize.INTEGER,
          // autoIncrement: true,
          allowNull: false,
          comment: "표시될 순서"
        },
        read_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: "조회수"
        },
        content_img_url: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "내용의 이미지 주소"
        },
        created_at: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_DATE'),
          comment: "글 생성일(YYYY-MM-DD)",
        }
        // created_at: {
        //   type: Sequelize.DATEONLY,
        //   allowNull: false,
        //   comment: "글 생성일(YYYY-MM-DD)",
        // }
      },
      {
        sequelize,
        timestamps: false,  
        modelName: 'WhatsNew',
        tableName: 'whatsnew',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    )
    // WhatsNew.beforeCreate((whatsNew, options) => {
    //   whatsNew.created_at = new Date().toISOString().split('T')[0];
    // });
  }
  // }

  static associate(db) {
    //참조키로 SubCategory모델의 id(targetKey)를 sub_category_id(foreignKey)라는 이름으로 가져옴
    db.WhatsNew.belongsTo(db.SubCategory, {foreignKey: 'sub_category_id', targetKey: 'id'});
  }
}
// }

module.exports = WhatsNew;