const Sequelize = require("sequelize");


class HappyMeal extends Sequelize.Model {
  static initiate(sequelize) {
    HappyMeal.init(
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
          allowNull: false,
          comment: "썸네일 이미지 주소"
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "타이틀"
        },
        link: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "클릭시 이동할 주소"
        },
        seq: {
          type: Sequelize.INTEGER,
          // autoIncrement: true,
          allowNull: false,
          unique: true,
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
          type: Sequelize.DATEONLY, //YYYY-MM-DD만 들어가게
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_DATE'), // 현재 날짜를 기본값으로 사용
          comment: "글 생성일(YYYY-MM-DD)",
        }
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'HappyMeal',
        tableName: 'happymeal',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //참조키로 SubCategory모델의 id(targetKey)를 sub_category_id(foreignKey)라는 이름으로 가져옴
    db.HappyMeal.belongsTo(db.SubCategory, {foreignKey: 'sub_category_id', targetKey: 'id'});
  }

}

module.exports = HappyMeal;