const Faq = require('../schemas/faq'); 
const User = require('../schemas/user');
const { Op } = require('sequelize');

class FaqModel {
  static async createFaq({newFaq}){
    console.log("newFaq",newFaq);
    const result = await Faq.create(newFaq);
    return result;
  }

  static async getAllFaq(){
    const result = await Faq.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        }
      ],
      // raw:true,
    });
    return result;
  }

  static async getCategoryFaq(category){
    const result = await Faq.findAll({
      where: {
        faq_tags : category,
      },
      include: [
        {
          model: User,
          attributes: ['user_name'],
        }
      ],
      // raw:true,
    });
    return result;
  }
  
  static async getAllFaqByUser({user_id}){
    const result = await Faq.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: User,    
          attributes: ['user_id'],
        }
      ],
      // raw:true,
    });
    return result;
  }

  static async getOneFaq(faq_id){
    const result = await Faq.findOne({
      where: {
        faq_id: faq_id,
      },
      include: [
        {
          model: User,    
          attributes: ['user_name'],
        }
      ],
      // raw:true,
    });
    return result;
  }
  

  static async updateFaq({ faq_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Faq.update({
      ...toUpdate
    }, {
      where: {
        "faq_id": faq_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteFaq({ faq_id, faq_password }){
    // console.log("faqId",faqId);
    const result = await Faq.destroy({
      where: {
        faq_id: faq_id,
        faq_password: faq_password
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = FaqModel; 