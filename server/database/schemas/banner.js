const Sequelize = require("sequelize");


class Banner extends Sequelize.Model {
  static initiate(sequelize) {
    Banner.init(
      {
        banner_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        banner_img_url: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "배너안에 들어갈 이미지 저장 경로"
        },
        banner_title: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "배너 제목",
        },
        banner_description: {
          type: Sequelize.TEXT,
          allowNull: false,
          comment: "배너 설명", 
        },
        banner_adress: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "배너 경로설정", 
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Banner',
        tableName: 'banner',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //???
  }

}

module.exports = Banner;