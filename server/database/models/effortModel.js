const Effort = require('../schemas/effort'); 
const { Op } = require('sequelize');

class EffortModel {
  static async createEffort({newEffort}){
    console.log("newEffort",newEffort);
    const result = await Effort.create(newEffort);
    return result;
  }

  static async getAllEffort(){
    const result = await Effort.findAll();
    return result;
  }
  
  static async updateEffort({ effort_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Effort.update({
      ...toUpdate
    }, {
      where: {
        id: effort_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteEffort({ effort_id }){
    // console.log("effortId",effortId);
    const result = await Effort.destroy({
      where: {
        id: effort_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = EffortModel; 