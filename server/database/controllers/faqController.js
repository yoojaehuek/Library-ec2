const FaqService = require("../services/faqService");

class FaqController {

	static async createFaq(req, res, next){
		try {
			const newFaq = req.body;
			newFaq.user_id = req.user_id;
			console.log(newFaq);
			const result = await FaqService.createFaq({newFaq});
			res.status(201).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getAllFaq(req, res, next){
		try {
			const result = await FaqService.getAllFaq(); //async await = 응답이 올때까지 기다리겠다.(p.79)
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}
	
	static async getCategoryFaq(req, res, next){
		try {
			const category = req.params.category;
			const result = await FaqService.getCategoryFaq(category);
			// const result = {question:"123", content: "123", category:"123", author:"123", date:"123", answer:"123"}			
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}

	static async getOneFaq(req, res, next){
		try {
			const faq_id = req.params.faq_id;
			const result = await FaqService.getOneFaq(faq_id);
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}

	static async updateFaq(req, res, next){
		try {
			const faq_id = req.params.faq_id;
			// const toUpdate = { ...req.body }; // 이런식으로 한 줄로 써도 됨??????
			// const {...props} = req.body; // 새로운 개체를 만들어 할당하는 이유는 원본 객체를 직접 수정하지 않고
      		const toUpdate = {...req.body} // 복사본을 만들어 사용하는 것이 일반적으로 안전하다고 여겨지기 때문.
			const result = await FaqService.updateFaq({ faq_id, toUpdate });
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async deleteFaq(req, res, next){
		try {
			const faq_id = req.params.faq_id;
			const faq_password = req.body.faq_password;	
			// console.log("faq:", req.body.faq_password);

			const result = await FaqService.deleteFaq({ faq_id, faq_password });
			if(result.errorMessage){
                throw new Error(result.errorMessage)
            }
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

}

module.exports = FaqController;