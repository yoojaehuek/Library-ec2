const LoansModel = require('../models/loansModel');

class LoansService{

  static async addLoans(one){
    const newLoans = one;
		console.log("서비스에서 받은 newLoans: ",newLoans);
    // newLoans 배열을 반복하면서 각 객체를 처리
    const createdLoans = await Promise.all(newLoans.map(async (loansData) => {
      const createNewLoans = await LoansModel.createLoans(loansData);
      return createNewLoans
    }));
    return createdLoans;
  }

  static async getAllLoans(){
    console.log("서비스 전체조회들어옴 ");
    let loansData = await LoansModel.getAllLoans();
    loansData = loansData.map(el => el.get({ plain: true }));
    
    loansData.map((loans, index) => {
      const { loan_date, due_date } = loansData[index];
      if (loan_date) {// 한국표준시로 변경, T뒷부분인 시간 값을 자르고 날짜만 가져옴
        loansData[index].loan_date = new Date(loan_date.setHours(loan_date.getHours() + 9));
        loansData[index].loan_date = loansData[index].loan_date.toISOString().split('T')[0];
      }
      if (due_date) {
        loansData[index].due_date = new Date(due_date.setHours(due_date.getHours() + 9));
        loansData[index].due_date = loansData[index].due_date.toISOString().split('T')[0];
      }
    }) 
    console.log("서비스 전체조회 받음 : ", loansData);

    return loansData;
  }

  static async getLoansByUserId({id}){
    const loansData = await LoansModel.findOneLoansUserId({id});
    // if (loansData.length === 0) {
    //   return [];
    // }
    return loansData;
  }

  static async getLoansByLoansId({loans_id}){
		const result = await LoansModel.getLoansByLoansId({loans_id});
		return result;
	}

  static async findAllLoansDate({userId, dateType}){

    const date = new Date();
    //월별 조회
    if (dateType.month) {
      // console.log(typeof(parseInt(dateType.month)));
      date.setMonth(date.getMonth()-parseInt(dateType.month));
    }
    // 일별 조회
    else if (dateType.day) {
      date.setDate(date.getDate()-parseInt(dateType.day));
    }
    // 주별 조회
    else if (dateType.week) {
      date.setDate(date.getDate()-(parseInt(dateType.week)*7));
    }
    //연별 조회
    else if (dateType.year) {
      date.setFullYear(date.getFullYear()-parseInt(dateType.year));
    }
    // 적절한 쿼리가 제공되지 않은 경우
    else {
      // throw new Error("'Invalid request. Please provide month, day, or week.'");
      const errorMessage = "잘못 요청";
      return errorMessage;
    }
    let result = await LoansModel.findAllLoansDate({userId, date});
    // console.log(result);
    // result.map((loans, index)=> {
    //   console.log(loans.LoansMenus);
    // })

    result = result.map(el => el.get({ plain: true }));
    // console.log(result);
    result.map((loans, index) => {
      const { created_at } = result[index];

      // console.log(`${created_at.getFullYear()}-${created_at.getMonth()+1}-${created_at.getDate()}`);
      result[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
      result[index].format_date = result[index].created_at.toISOString().split('T')[0];
    })
    
    console.log(result);

    return result;
  }

  static async rankMenu(){
		const result = await LoansModel.rankMenu();
		return result;
	}
  /** 대출 수정 */
	static async updateLoans({loans_id, state, cancel}){
    console.log("service:",loans_id, state, cancel);
		const result = await LoansModel.updateLoans({loans_id, state, cancel});
		return result;
	}
  /** 책 반납 */
	static async returnLoans({loans_id, returned, returnDate}){
    console.log("서비스에서 책반납 들어옴:",loans_id, returned, returnDate);
		const result = await LoansModel.returnLoans({loans_id, returned, returnDate});
		return result;
	}
  /** 대출기간 연장 */
	static async renewLoans({loans_id, due_date}){
    console.log("서비스에서 대출연장 들어옴:",loans_id, due_date);
		const result = await LoansModel.renewLoans({loans_id, due_date});
		return result;
	}
  /** 대출 삭제 */
  static async deleteLoans({loans_id}){
    const result = await LoansModel.deleteLoans({loans_id});
    return result;
  }
}

module.exports = LoansService;