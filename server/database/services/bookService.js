const BookModel = require('../models/bookModel');
const { Op } = require('sequelize');
const validationUtils = require('../../utils/validationUtils');

class BookService{
	
	static async createBook({newBook}){
		const result = await BookModel.createBook({newBook});
		return result;
	}

	static async getAllBook(){
		const result = await BookModel.getAllBook();
		return result;
	}

	static async getCategoryBook(options){
		const wheres = this.buildWhereClause(options);
		let result = await BookModel.getCategoryBook(wheres);
    if (result.length == 0) {
      result.errorMessage = "카테고리ID 잘못 입력 OR 카테고리에 등록된 상품이 없음";
			return result
    }

    // result = result.map(el => el.get({ plain: true }));

		result.map((order, index) => {
      const { created_at } = result[index];

      // console.log(`${created_at.getFullYear()}-${created_at.getMonth()+1}-${created_at.getDate()}`);
      result[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
      result[index].created_at = result[index].created_at.toISOString().split('T')[0];
    })
    
		return result;
	}

	static async getSearchBook(input){
		// const validationInput = this.buildWhereClause(input);
		let result = await BookModel.getSearchBook(input);
    if (result.length == 0) {
      result.errorMessage = "잘못 입력 OR 관련 도서 없음";
			return result
    }

    // result = result.map(el => el.get({ plain: true }));

		result.map((order, index) => {
      const { created_at } = result[index];

      // console.log(`${created_at.getFullYear()}-${created_at.getMonth()+1}-${created_at.getDate()}`);
      result[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
      result[index].created_at = result[index].created_at.toISOString().split('T')[0];
    })
    
		return result;
	}

	// static async getOneBook({book_id}){
	// 	const result = await BookModel.getOneBook({book_id});
	// 	return result;
	// }

	static async updateBook({ book_id, toUpdate }){
		console.log("서비스에서: ",toUpdate);
		const result = await BookModel.updateBook({ book_id, toUpdate });
		return result;
	}

	static async deleteBook({ book_id }){
    const result = await BookModel.deleteBook({ book_id });
    return result;
  }


	static buildWhereClause(options){
		console.log("options: ", options);
		const wheres = {};

		//책 id 조회
		if (options.book_id && validationUtils.validateString(options.book_id)) {
			wheres.book_id = {
				[Op.eq]: options.book_id,
			};
		}

		//책 이름 조회
		if (options.book_name && validationUtils.validateString(options.book_name)) {
			wheres.book_name = {
				[Op.eq]: options.book_name,
			};
		}

		//저자 조회
		if (options.book_author) {
			wheres.book_author = {
				[Op.eq]: options.book_author,
			};
		}

		//출판사 조회
		if (options.book_publisher) {
			wheres.book_publisher = {
				[Op.eq]: options.book_publisher,
			};
		}

		//장르 조회
		if (options.book_genre && validationUtils.isValidGenre(options.book_genre)) { //장르가 존재하고 진짜 있는 장르인지
			// wheres.book_genre = options.book_genre;
			wheres.book_genre = {
				[Op.eq]: options.book_genre,
			}
		}
	
		//도서 대출 여부
		if (options.book_availability !== undefined) { //장르 쿼리스트링에 넣었으면
			wheres.book_availability = Boolean(options.book_availability); //뭘 입력하든 불린으로 강제 변환해서 안전
		}
	
		//도서 고유 번호
		if (options.book_ISBN && validationUtils.validateString(options.book_ISBN)) {
			wheres.book_ISBN = {
				[Op.eq]: options.book_ISBN,
			};
		}

		//불러올 도서 개수
		if (options.limit) {
			wheres.limit = parseInt(options.limit);
		}
		return wheres;
	}

	
}
module.exports = BookService;