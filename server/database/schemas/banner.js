const Sequelize = require("sequelize");


class Banner extends Sequelize.Model {
  static initiate(sequelize) {
    Banner.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        sub_category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "버튼에 들어갈 텍스트",
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "",
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "배너 타이틀",
        },
        content: {
          type: Sequelize.STRING,
          allowNull: true, //null 값 허용!!!
          comment: "서브메뉴별 비쥬얼 백그라운드 중간 내용",
        },
        background_img_url: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "서브메뉴별 비쥬얼 백그라운드 배경 이미지 경로",
        },
        link: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "서브메뉴별 비쥬얼 백그라운드 url들 배열형태",
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Banner',
        tableName: 'banner',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //참조키로 SubCategory모델의 id(targetKey)를 sub_category_id(foreignKey)라는 이름으로 가져옴
    db.Banner.belongsTo(db.SubCategory, {foreignKey: 'sub_category_id', targetKey: 'id'});
    
  }

}

module.exports = Banner;