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
			// const result = await FaqService.getAllFaq();
			const result = [
				  {
				    id: "1",
				    category: "사이트이용",
				    question: "1",
				    answer: "1",
				    author: "1",
				    date: "2024-01-08",
				  },
				  {
				    id: "2",
				    category: "계정",
				    question: "2",
				    answer: "2",
				    author: "2",
				    date: "2024-01-09",
				  },
				  {
				    id: "3",
				    category: "대출",
				    question: "3",
				    answer: "3",
				    author: "3",
				    date: "2024-01-10",
				  },
				  {
				    id: "4",
				    category: "도서",
				    question: "3",
				    answer: "3",
				    author: "3",
				    date: "2024-01-10",
				  },
				  {
				    id: "5",
				    category: "기타",
				    question: "3",
				    answer: "3",
				    author: "3",
				    date: "2024-01-10",
				  },
				  {
				    id: "6",
				    category: "기타",
				    question: "3",
				    answer: "3",
				    author: "3",
				    date: "2024-01-10",
				  },
				];			
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}

	static async getOneFaq(req, res, next){
		try {
			// const result = await FaqService.getAllFaq();
			const result = {question:"123", content: "123", category:"123", author:"123", date:"123", answer:"123"}			
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

			const result = await FaqService.deleteFaq({ faq_id });
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

}

module.exports = FaqController;