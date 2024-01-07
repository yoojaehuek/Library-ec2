const Option = require('../schemas/option'); 


class OptionModel {

  static async createOption({newOption}){
    console.log("newOption",newOption);
    const result = await Option.create(newOption);
    return result;
  }

  static async getAllOption(){
    const result = await Option.findAll();
    return result;
  }

  static async getOneOption({option_id}){
    const option = await Option.findOne({
      // attributes: ['name', 'price'],
      where: {
        id: option_id,
      }
    });
    return option;
  } 
  
  static async updateOption({ option_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Option.update({
      ...toUpdate
    }, {
      where: {
        id: option_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteOption({ option_id }){
    // console.log("optionId",optionId);
    const result = await Option.destroy({
      where: {
        id: option_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = OptionModel;