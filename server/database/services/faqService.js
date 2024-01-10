const FaqModel = require('../models/faqModel')
const {formatDate} = require('../../utils/dateUtils');

class FaqService{
	
	static async createFaq({newFaq}){
		const result = await FaqModel.createFaq({newFaq});
		return result;
	}

	static async getAllFaq(){
		const tmpResult = await FaqModel.getAllFaq();
		const result = formatDate(tmpResult);
		return result;
	}
	
	static async getCategoryFaq(category){
		const tmpResult = await FaqModel.getCategoryFaq(category);
		const result = formatDate(tmpResult)
		return result;
	}
	
	static async getOneFaq(faq_id){
		const tmpResult = await FaqModel.getOneFaq(faq_id);
		console.log("tmpResult:", tmpResult);
		const result = formatDate([tmpResult])
		return result;
	}


	static async updateFaq({ faq_id, toUpdate }){
		console.log("서비스에서: ",toUpdate);
		const result = await FaqModel.updateFaq({ faq_id, toUpdate });
		return result;
	}

	static async deleteFaq({ faq_id }){
    const result = await FaqModel.deleteFaq({ faq_id });
    return result;
  }

//   static formatDate = (result) => {	
// 	const tmp = result.map(el => el.get({ plain: true }));
// 	// console.log(result);
// 	tmp.map((order, index) => {
// 		const { created_at } = tmp[index];
	
// 		// console.log(`${created_at.getFullYear()}-${created_at.getMonth()+1}-${created_at.getDate()}`);
// 		tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
// 		tmp[index].created_at = tmp[index].created_at.toISOString().split('T')[0];
// 	})
// 	return tmp
//   }
}
module.exports = FaqService;