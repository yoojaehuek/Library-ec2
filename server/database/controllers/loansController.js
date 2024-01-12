//커트롤러 역할
//req수신
//req 데이터 및 내용 검증
//서버에서 수행된 결과 클라이언트에게 반환(res)
const LoansService = require('../services/loansService');

class LoansController {
  /** 등록 */
  static async addLoans(req,res,next){
    try {
      const tmp = req.body;
      // tmp.userId = req.userId;
      tmp.user_id = "ee@ee.com";
      tmp.order.forEach(orderItem => { //tmp.order 각각의 요소에 user_id를 추가시킴
        orderItem.user_id = tmp.user_id;
        // orderItem.user_id = req.userId; // 로그인 되면 이걸로
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
    console.log("컨트롤러 전체조회 들어옴");
    try {
      const result = await LoansService.getAllLoans();
      console.log("컨트롤러 전체조회 받음: ",result);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getLoansByUserId(req, res, next){
    try {
      console.log("req.userId: ", req.userId);
      const userId = req.userId;
      // const userId = 1;
      const result = await LoansService.getLoansByUserId({id: userId});
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

  static async findAllLoansDate(req, res, next){
    try {
      const userId = req.userId;
      // const userId = 1;
      const dateType = req.query;
      const result = await LoansService.findAllLoansDate({userId, dateType});
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
  /** 삭제 */
  static async deleteLoans(req, res, next){
    try {
      const loans_id = req.params.loans_id;
      // const loansId = 8;
      const result = await LoansService.deleteLoans({loans_id});
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = LoansController;