//커트롤러 역할
//req수신
//req 데이터 및 내용 검증
//서버에서 수행된 결과 클라이언트에게 반환(res)
const LoansService = require("../services/loansService");

class LoansController {
  /** 등록 */
  static async addLoans(req,res,next){
    try {
        const tmp = req.body;
        // tmp.userId = req.userId;
        tmp.user_id = "ee@ee.com";
        console.log("컨트롤러대출등록에서 받은 tmp: ",tmp);
        const newLoans = await LoansService.addLoans(tmp);
        
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
			const loans_id = req.params.loans_id;
			const { state, cancel } = req.query;
      console.log(state);
      console.log(cancel);
      // const toUpdate = {...props}

			const result = await LoansService.updateLoans({loans_id, state, cancel});
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