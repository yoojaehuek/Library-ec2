const BannerModel = require('../models/bannerModel')


class BannerService{
	
	static async createBanner({newBanner}){
		const result = await BannerModel.createBanner({newBanner});
		return result;
	}

	static async getAllBanner(){
		const result = await BannerModel.getAllBanner();
		return result;
	}

	static async getOneBanner(banner_id){
		const tmpResult = await BannerModel.getOneBanner(banner_id);
		console.log("tmpResult:", tmpResult);
		// const result = bannerFormatDate([tmpResult])
		return tmpResult;
	}

	static async updateBanner({ Banner_id, toUpdate }){
		console.log("서비스에서: ",toUpdate);
		const result = await BannerModel.updateBanner({ Banner_id, toUpdate });
		return result;
	}

	static async deleteBanner({ Banner_id }){
    const result = await BannerModel.deleteBanner({ Banner_id });
    return result;
  }

}
module.exports = BannerService;