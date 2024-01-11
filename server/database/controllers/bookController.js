const BookService = require("../services/bookService");

class BookController {

	static async createBook(req, res, next){
		try {
			const newBook = req.body;
			console.log(newBook);
			const result = await BookService.createBook({newBook});
			res.status(201).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getAllBook(req, res, next){
		try {
			const result = await BookService.getAllBook();
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}
	
	static async getCategoryBook(req, res, next){ //장르별 조회
		try {
			const options = req.query;
			console.log("options: ", options);
			const result = await BookService.getCategoryBook(options);
			console.log(result);
			if (result.errorMessage) {
				console.log('에러걸림');
        throw new Error(result.errorMessage)
      }
			
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getSearchBook(req, res, next){ //장르별 조회
		try {
			const input = req.params.input;
			console.log("input: ", input);
			const result = await BookService.getSearchBook(input);
			console.log(result);
			if (result.errorMessage) {
				console.log('에러걸림');
        throw new Error(result.errorMessage)
      }
			
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}
	
	// static async getOneBook(req, res, next){
	// 	try {
	// 		const book_id = req.params.book_id;
	// 		const result = await BookService.getOneBook({book_id});
	// 		res.status(200).json(result);
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }

	static async updateBook(req, res, next){
		try {
			const book_id = req.params.book_id;
			const {...props} = req.body;
        const toUpdate = {...props}

			const result = await BookService.updateBook({ book_id, toUpdate });
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async deleteBook(req, res, next){
		try {
			const book_id = req.params.book_id;

			const result = await BookService.deleteBook({ book_id });
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

}

module.exports = BookController;
