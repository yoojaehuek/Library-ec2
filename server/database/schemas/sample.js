const Sequelize = require("sequelize");


class Sample extends Sequelize.Model {
  static initiate(sequelize) {
    Sample.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Sample',
        tableName: 'sample',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }

    )
  }
  static associate(db) {
    //???
  }

}

module.exports = Sample;