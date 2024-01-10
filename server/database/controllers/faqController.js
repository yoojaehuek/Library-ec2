const FaqService = require("../services/faqService");

class FaqController {

	static async createFaq(req, res, next){
		try {
			const newFaq = req.body;
			console.log(newFaq);
			const result = await FaqService.createFaq({newFaq});
			res.status(201).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getAllFaq(req, res, next){
		try {
			const result = await FaqService.getAllFaq();		
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
			const {...props} = req.body;
      const toUpdate = {...props}

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