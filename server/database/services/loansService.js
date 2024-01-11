const LoansModel = require('../models/loansModel');

class LoansService{

  static async addLoans(one){
    const newLoans = one;
		console.log("서비스에서 받은 newLoans: ",newLoans);
		const createNewLoans = await LoansModel.createLoans({newLoans});
		return createNewLoans
  }

  static async getAllLoans(){
    let loansData = await LoansModel.getAllLoans();
    loansData = loansData.map(el => el.get({ plain: true }));
    
    loansData.map((loans, index) => {
      const { created_at } = loansData[index];

      // console.log(`${created_at.getFullYear()}-${created_at.getMonth()+1}-${created_at.getDate()}`);
      loansData[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
      loansData[index].format_date = loansData[index].created_at.toISOString().split('T')[0];
    })  
    console.log(loansData);

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

	static async updateLoans({loans_id, state, cancel}){
    console.log("service:",loans_id, state, cancel);
		const result = await LoansModel.updateLoans({loans_id, state, cancel});
		return result;
	}

  static async deleteLoans({loans_id}){
    const result = await LoansModel.deleteLoans({loans_id});
    return result;
  }
}

module.exports = LoansService;