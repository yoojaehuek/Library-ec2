const Banner = require('../schemas/banner'); 
const { Op } = require('sequelize');

class BannerModel {

  static async createBanner({newBanner}){
    console.log("newBanner",newBanner);
    const result = await Banner.create(newBanner);
    return result;
  }

  static async getAllBanner(){
    const result = await Banner.findAll();
    return result;
  }

  static async getOneBanner(subcategory){
    const result = await Banner.findOne({
      where: {
        [Op.or]: [
          {sub_category_id: subcategory},
          {type: subcategory},
        ]
      },
      raw:true
    });
    return result;
  }
  
  static async updateBanner({ banner_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Banner.update({
      ...toUpdate
    }, {
      where: {
        id: banner_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteBanner({ banner_id }){
    // console.log("bannerId",bannerId);
    const result = await Banner.destroy({
      where: {
        id: banner_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = BannerModel; 