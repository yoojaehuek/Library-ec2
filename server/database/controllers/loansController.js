//커트롤러 역할
//req수신
//req 데이터 및 내용 검증
//서버에서 수행된 결과 클라이언트에게 반환(res)
const LoansService = require('../services/loansService');

class LoansController {
  /** 대출 등록 */
  static async addLoans(req,res,next){
    try {
      const tmp = req.body;
      console.log("미들웨어 userId: ", req.user_id);
      
      tmp.order.forEach(orderItem => { //tmp.order 각각의 요소에 user_id를 추가시킴
        orderItem.user_id = req.user_id; // 로그인 되면 이걸로
      }); 
      const one = tmp.order
      console.log("tmp 안의 one: ", one);
      const newLoans = await LoansService.addLoans(one);
      
      if(newLoans.errorMessage){
        throw new Error(newLoans.errorMessage)
      }
      res.status(201).json(newLoans);
    } catch (error) {
        next(error)
    }
  }
  /** 전체조회 */
  static async getAllLoans(req, res, next){
    try {
      const result = await LoansService.getAllLoans();
      // console.log("컨트롤러 전체조회 받음: ",result);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  /** 최신순 전체조회  */
  static async getAllLoansDESC(req, res, next){
    try {
      const result = await LoansService.getAllLoansDESC();
      // console.log("컨트롤러 최신순 전체조회 받음: ",result);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  /** 최근대출순으로 책 , 유저 불러오기  */
  static async getRecentBorrowedBooksAndUsers(req, res, next){
    try {
      const result = await LoansService.getRecentBorrowedBooksAndUsers();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  /** 유저별 대출 목록 책만   */
  static async getBooksBorrowedByUser(req, res, next){
    try {
			const user_id = req.params.user_id;
      console.log("컨트롤러에서user_id 타입 : ",typeof(user_id));
      const result = await LoansService.getBooksBorrowedByUser(user_id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  /** 책을 대출한 유저 최신순으로 */
  static async getUsersByBookBorrowed(req, res, next){
    try {
			const book_id = req.params.book_id;
      console.log("컨트롤러에서user_id 타입 : ",typeof(book_id));
      const result = await LoansService.getUsersByBookBorrowed(book_id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  // 유저 대출정보 가져오기
  static async getLoansByUserId(req, res, next){
    console.log("유저 대출정보 조회 컨트롤러 들어옴");
    try {
      const finduserid = req.user_id;
      console.log("컨트롤러에서 유저대출정보 : ", finduserid);
      const result = await LoansService.getLoansByUserId(finduserid);
      console.log("loansController.js/getLoansByUserId()/result: ", result);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  /** 한개 조회 */
  static async getLoansByLoansId(req, res, next){
		try {
			const loans_id = req.params.loans_id;
			const result = await LoansService.getLoansByLoansId({loans_id});
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}
 
  static async getPageLoans(req, res, next){
		try {
			console.log(req.query);
			const option = req.query;
			console.log("req.query: ", option);
			const result = await LoansService.getPageLoans(option);
      console.log("대출컨트롤러에서 res: ",result);
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}

  static async findAllLoansDate(req, res, next){
    try {
      const user_id = req.user_id;
      // const userId = 1;
      const dateType = req.query;
      const result = await LoansService.findAllLoansDate({user_id, dateType});
      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  
  static async rankMenu(req, res, next){
    try {
      const result = await LoansService.rankMenu();
      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  /** 수정 */
  static async updateLoans(req, res, next){
		try {
			const loans_id = req.params.loans_id;// api_url 에서 가져옴
      const Return = req.body;
      console.log("Return: ", Return);
      console.log("loans_id: ", loans_id);
			// const { state, cancel } = req.query;
      // console.log("state: ", state);
      // console.log("cancel: ", cancel);
      // const toUpdate = {...props}
			const result = await LoansService.updateLoans({loans_id});
			res.status(200).json(result);
		} catch (error) {
      console.log(error);
			next(error);
		}
	}
  /** 책 반납 */
  static async returnLoans(req, res, next){
		try {
      console.log("책반납 컨트롤러 들어옴");
			const loans_id = req.params.loans_id;// api_url 에서 가져옴
			const { returned, returnDate } = req.query;
      console.log("loans_id: ", loans_id);
      console.log("returned: ", returned);
      console.log("returnDate: ", returnDate);
			const result = await LoansService.returnLoans({loans_id, returned, returnDate});
			res.status(200).json(result);
		} catch (error) {
      console.log(error);
			next(error);
		}
	}
  /** 대출연장 */
  static async renewLoans(req, res, next){
		try {
      console.log("대출연장 컨트롤러 들어옴");
			const loans_id = req.params.loans_id;// api_url 에서 가져옴
			const {due_date} = req.body;
      console.log("loans_id: ", loans_id);
      console.log("due_date: ", due_date);
			const result = await LoansService.renewLoans({loans_id, due_date});
			res.status(200).json(result);
		} catch (error) {
      console.log(error);
			next(error);
		}
	}
  /** 대출 삭제 */
  static async deleteLoans(req, res, next){
    try {
      // const loans_id = req.params.loans_id;
      // const {book_id} = req.body;
      const {loans_id, book_id} = req.query;
      console.log("반납 book_id: ", req.query);
      const result = await LoansService.deleteLoans({loans_id, book_id});
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = LoansController;