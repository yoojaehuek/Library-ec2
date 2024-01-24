const ReviewModel = require('../models/reviewModel');
const { Op } = require('sequelize');
const validationUtils = require('../../utils/validationUtils');
const {reviewFormat} = require('../../utils/dataUtils');


class ReviewService{
	
	static async createReview({newReview}){
		const result = await ReviewModel.createReview({newReview});
		return result;
	}
	
	static async getBookReview({book_id}){
		const result = await ReviewModel.getBookReview({book_id});
		return result;
	}

	static async getAllReview(){
		const tmpResult = await ReviewModel.getAllReview();
		const result = reviewFormat(tmpResult);
		return result;
	}

	static async getCategoryReview(options){
		const wheres = this.buildWhereClause(options);
		let result = await ReviewModel.getCategoryReview(wheres);
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

	static async getSearchReview(input){
		const validationInput = this.buildWhereClause(input);
		let result = await ReviewModel.getSearchReview(validationInput);
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

	static async getOneReview({review_id}){
		const result = await ReviewModel.getOneReview({review_id});
		return result;
	}
	
	static async reviewCheck({book_id, user_id}){
		const result = await ReviewModel.reviewCheck({book_id, user_id});
		// if (result==null) {
			
		// }
		return result;
	}

	static async updateReview({ review_id, toUpdate }){
		console.log("서비스에서: ",toUpdate);
		const result = await ReviewModel.updateReview({ review_id, toUpdate });
		return result;
	}

	static async deleteReview({ review_id }){
    const result = await ReviewModel.deleteReview({ review_id });
    return result;
  }


	static buildWhereClause(options){
		const wheres = {};

		//책 id 조회
		if (options.review_id && validationUtils.validateString(options.review_id)) {
			wheres.review_id = {
				[Op.eq]: options.review_id,
			};
		}

		//책 이름 조회
		if (options.review_name && validationUtils.validateString(options.review_name)) {
			wheres.review_name = {
				[Op.eq]: options.review_name,
			};
		}

		//저자 조회
		if (options.review_author) {
			wheres.review_author = {
				[Op.eq]: options.review_author,
			};
		}

		//출판사 조회
		if (options.review_publisher) {
			wheres.review_publisher = {
				[Op.eq]: options.review_publisher,
			};
		}

		//장르 조회
		if (options.review_genre && validationUtils.isValidGenre(options.review_genre)) { //장르가 존재하고 진짜 있는 장르인지
			wheres.review_genre = options.review_genre;
		}
	
		//도서 대출 여부
		if (options.review_availability !== undefined) { //장르 쿼리스트링에 넣었으면
			wheres.review_availability = Boolean(options.review_availability); //뭘 입력하든 불린으로 강제 변환해서 안전
		}
	
		//도서 고유 번호
		if (options.review_ISBN && validationUtils.validateString(options.review_ISBN)) {
			wheres.review_ISBN = {
				[Op.eq]: options.review_ISBN,
			};
		}
		return wheres;
	}

	
}
module.exports = ReviewService;