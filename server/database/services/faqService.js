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

	static async deleteFaq({ faq_id, faq_password }){
    let result = await FaqModel.deleteFaq({ faq_id, faq_password });

	if (result == 0) {
		console.log('null걸림');
		result = {}; // null이면 속성 할당 안됨 그래서 {} 빈 객체 재할당
		result.errorMessage = "비밀번호 틀렸어요.";
		return result;
	}

	console.log("faqService/delete:", result);
    return result;
  }
}
module.exports = FaqService;