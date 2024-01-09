const Faq = require('../schemas/faq'); 
const { Op } = require('sequelize');

class FaqModel {
  static async createFaq({newFaq}){
    console.log("newFaq",newFaq);
    const result = await Faq.create(newFaq);
    return result;
  }

  static async getAllFaq(){
    const result = await Faq.findAll();
    return result;
  }

  static async getOneFaq(faq_id){
    const result = await Faq.findOne({
      where: {
        faq_id: faq_id,
      },
    });
    return result;
  }
  
  static async updateFaq({ faq_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Faq.update({
      ...toUpdate
    }, {
      where: {
        faq_id: faq_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteFaq({ faq_id }){
    // console.log("faqId",faqId);
    const result = await Faq.destroy({
      where: {
        faq_id: faq_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = FaqModel; 