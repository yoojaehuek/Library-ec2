const Banner = require('../schemas/banner'); 

class BannerModel {
  static async createBanner({newbanner}){
    console.log("newBanner",newbanner);
    const result = await Banner.create(newbanner);
    return result;
  }

  static async getAllBanner(){
    const result = await Banner.findAll();
    return result;
  }

  static async getOneBanner(banner_id){
    const result = await Banner.findOne({
      where: {
        banner_id: banner_id,
      },
    });
    return result;
  }
  
  static async updateBanner({ banner_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Banner.update({
      ...toUpdate
    }, {
      where: {
        banner_id: banner_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteBanner({ banner_id }){
    // console.log("bannerId",bannerId);
    const result = await Banner.destroy({
      where: {
        banner_id: banner_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = BannerModel; 