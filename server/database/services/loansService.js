const LoansModel = require('../models/loansModel');
const BookModel = require('../models/bookModel');
const { Op } = require('sequelize');
const {loansformatDate} = require('../../utils/dataUtils');

class LoansService{

  static async addLoans(one){
    const newLoans = one;
		console.log("서비스에서 받은 newLoans: ",newLoans);
    // newLoans 배열을 반복하면서 각 객체를 처리
    const createdLoans = await Promise.all(newLoans.map(async (loansData) => {
      const createNewLoans = await LoansModel.createLoans(loansData);
      await BookModel.updateBook({ book_id: loansData.book_id, toUpdate: {book_availability: 0} });
      return createNewLoans
    }));
    return createdLoans;
  }

  static async getAllLoans(){
    // console.log("서비스 전체조회들어옴 ");
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
    // console.log("서비스 전체조회 받음 : ", loansData);

    return loansData;
  }
  /** 최신순 전체조회  */
  static async getAllLoansDESC(){
    // console.log("서비스 전체조회들어옴 ");
    let loansData = await LoansModel.getAllLoansDESC();
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
    // console.log("서비스 전체조회 받음 : ", loansData);

    return loansData;
  }
  /** 최근대출순으로 책 , 유저 불러오기  */
  static async getRecentBorrowedBooksAndUsers(){
    // console.log("서비스 전체조회들어옴 ");
    let loansData = await LoansModel.getRecentBorrowedBooksAndUsers();
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
    // console.log("서비스 전체조회 받음 : ", loansData);

    return loansData;
  }

  /** 유저대출정보조회 */
  static async getLoansByUserId(id){
    console.log("서비스 들어옴 id: ", id);

    const loansData = await LoansModel.findOneLoansUserId({id});
    // if (loansData.length === 0) {
    //   return [];
    // }
    const result = loansformatDate(loansData);
    console.log("서비에서 찾은거 받음", result);
    return result;
  }

  static async getLoansByLoansId({loans_id}){
		const result = await LoansModel.getLoansByLoansId({loans_id});
		return result;
	}

  /**  유저별 대출 목록 책만  */
  static async getBooksBorrowedByUser(id){
    const loansData = await LoansModel.getBooksBorrowedByUser({id});
    return loansData;
  }
  /** 책을 대출한 유저 최신순으로  */
  static async getUsersByBookBorrowed(id){
    const loansData = await LoansModel.getUsersByBookBorrowed({id});
    return loansData;
  }

  static async getLoansByLoansId({loans_id}){
		const result = await LoansModel.getLoansByLoansId({loans_id});
		return result;
	}

  static async getPageLoans(option){
		const data_limit = parseInt(option.data_limit);
		const orderBy = option.orderBy;
		const data_id = orderBy == 'ASC' ? {[Op.gt]: parseInt(option.data_id),} : {[Op.lt]: parseInt(option.data_id),};
		
    const tmpResult = await LoansModel.getPageLoans({ data_id, data_limit, orderBy });

		const result = await loansformatDate(tmpResult);
    console.log("result: ", result);
    
    const {maxId} =  await LoansModel.getMaxId();
		console.log("maxId: ", maxId);

    const lastPage = result.some(data => data.loans_id === maxId);
    
		if (orderBy == 'DESC') {
			result.reverse(); //DESC 떄문에 뒤집혀서 오면 다시 원래 순서로 바꾸기
		}

		return {result, lastPage};
	}

  static async findAllLoansDate({user_id, dateType}){

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
    let result = await LoansModel.findAllLoansDate({user_id, date});
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
    const renewDate = new Date(due_date);
    renewDate.setDate(renewDate.getDate() + 7);
    console.log("7일 연장 날짜: ", renewDate);

    const result = await LoansModel.renewLoans({loans_id, renewDate});
    return result;
	}
  /** 대출 삭제 */
  static async deleteLoans({loans_id, book_id}){
    const result = await LoansModel.deleteLoans({loans_id});
    console.log("deleteLoans: 결과: ", result);
    await BookModel.updateBook({"book_id": book_id, toUpdate: {book_availability: 1} });
    return result;
  }
}

module.exports = LoansService;