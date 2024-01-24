const BannerModel = require('../models/bannerModel')
const {bannerFormatDate} = require('../../utils/dataUtils');

class BannerService{
	
	static async createBanner({newbanner}){
		const result = await BannerModel.createBanner({newbanner});
		return result;
	}

	static async getAllBanner(){
		const tmpResult = await BannerModel.getAllBanner();
		const result = bannerFormatDate(tmpResult);
		return result;
	}

	static async getOneBanner(banner_id){
		const tmpResult = await BannerModel.getOneBanner(banner_id);
		console.log("tmpResult:", tmpResult);
		// const result = bannerFormatDate([tmpResult])
		return tmpResult;
	}

	static async updateBanner({ banner_id, toUpdate }){
		console.log("서비스에서: ",toUpdate);
		console.log("서비스에서: ",banner_id);
		const result = await BannerModel.updateBanner({ banner_id, toUpdate });
		return result;
	}

	static async deleteBanner({ banner_id }){
    const result = await BannerModel.deleteBanner({ banner_id });
    return result;
  }

}
module.exports = BannerService;