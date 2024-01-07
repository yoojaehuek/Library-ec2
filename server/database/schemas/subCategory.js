const Sequelize = require("sequelize");


class SubCategory extends Sequelize.Model {
  static initiate(sequelize) {
    SubCategory.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: "버튼에 들어갈 텍스트",
        },
        // type: {
        //   type: Sequelize.STRING,
        //   allowNull: false,
        //   comment: "드롭다운될 서브메뉴",
        // },
        // h_title: {
        //   type: Sequelize.STRING,
        //   allowNull: false,
        //   comment: "서브메뉴별 비쥬얼 백그라운드 타이틀",
        // },
        // h_content: {
        //   type: Sequelize.STRING,
        //   allowNull: true, //null 값 허용!!!
        //   comment: "서브메뉴별 비쥬얼 백그라운드 중간 내용",
        // },
        // h_background_img_url: {
        //   type: Sequelize.STRING,
        //   allowNull: true,
        //   comment: "서브메뉴별 비쥬얼 백그라운드 배경 이미지 경로",
        // },
        // h_link: {
        //   type: Sequelize.STRING,
        //   allowNull: false,
        //   comment: "서브메뉴별 비쥬얼 백그라운드 url들 배열형태",
        // },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "버튼에 들어갈 텍스트",
        },
        seq: {
          type: Sequelize.INTEGER,
          // autoIncrement: true,
          allowNull: false,
          comment: "표시될 순서"
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'SubCategory',
        tableName: 'subcategory',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //참조키로 Product모델에 id(sourceKey)를 sub_category_id(foreignKey)라는 이름으로 보냄
    db.SubCategory.hasMany(db.Product, { foreignKey: 'sub_category_id', sourceKey: 'id'});

    //참조키로 Promotion모델에 id(sourceKey)를 sub_category_id(foreignKey)라는 이름으로 보냄
    db.SubCategory.hasMany(db.WhatsNew, { foreignKey: 'sub_category_id', sourceKey: 'id'});

    //참조키로 Banner모델에 id(sourceKey)를 sub_category_id(foreignKey)라는 이름으로 보냄
    db.SubCategory.hasMany(db.Banner, { foreignKey: 'sub_category_id', sourceKey: 'id'});


    //참조키로 SubCategory모델의 id(targetKey)를 sub_category_id(foreignKey)라는 이름으로 가져옴
    db.SubCategory.belongsTo(db.Category, {foreignKey: 'category_id', targetKey: 'id'});
  }

}

module.exports = SubCategory;