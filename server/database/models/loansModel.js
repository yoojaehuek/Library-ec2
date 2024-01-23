const {Loans, Book, User, sequelize} = require('../schemas');
const { Op } = require('sequelize');

class LoansModel {

  static async createLoans(newLoans){
    console.log("모델에서받은 newLoans: ",newLoans);
    const createNewLoans = await Loans.create({
      book_id: newLoans.book_id,
      user_id: newLoans.user_id,
      due_date: newLoans.due_date,
    });
    return createNewLoans;
  }
  /** 조회 쿼리 */
  static async getAllLoans(){
    const loans = await Loans.findAll();
    console.log("전체조회로 찾은거: ",loans);
    return loans;
  }
  /** 최신순으로 대출 정보 조회 */
  static async getAllLoansDESC() {
    const loans = await Loans.findAll({
      // order: [['loan_date', 'DESC']], // 오래된순
      order: [['loan_date', 'ASC']], 
    });
    console.log("최신순 전체조회로 찾은거: ", loans);
    return loans;
  }
  /** 최근대출순으로 책 , 유저 불러오기*/
  static async getRecentBorrowedBooksAndUsers() {
    const loans = await Loans.findAll({
      // order: [['loan_date', 'DESC']], // 오래된순
      include: [
        {
          model: Book,
          attributes: ['book_name', 'book_author'],
        },
        {
          model: User,
          attributes: ['user_name'],
        }
      ], 
      order: [
        ['loan_date', 'ASC']
      ], 
    });
    console.log("최신순 전체조회로 찾은거: ", loans);
    return loans;
  }
  /** 유저대출정보조회 */
  static async findOneLoansUserId({id}){
    console.log("loansId",id);
    console.log("모델에서 받은 유저id: ", id);
    const loans = await Loans.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Book,
          attributes: ['book_id', 'book_name', 'book_author'], 
        }
      ],
    }); //where: {id: asdf} 형태가 들어와야함
    return loans;
  }
  /** 유저별 대출 목록 책만  */
  static async getBooksBorrowedByUser({id}){
    console.log("aa모델에서 받은 유저id: ", id);
    console.log("aa모델에서 받은 유저id: ", typeof(id));
    const loans = await Loans.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Book,
          attributes: ['book_name', 'book_author'],
        }
      ],
    }); 
    return loans;
  }
  /** 책을 대출한 유저 최신순으로   */
  static async getUsersByBookBorrowed({id}){
    console.log("aa모델에서 받은 book_id: ", id);
    console.log("aa모델에서 받은 book_id: ", typeof(id));
    const loans = await Loans.findAll({
      where: {
        book_id: id,
      },
      include: [
        {
          model: User,
          attributes: ['user_name'],
        }
      ],
      order: [
        ['loan_date', 'ASC']
      ], 
    });
    return loans;
  }

  static async getLoansByLoansId({loans_id}){
    const result = await Loans.findAll({
      where: {
        id: loans_id,
      },
    });
    return result;
  }
  
  static async getPageLoans({ data_id, data_limit, orderBy }){
    const result = await Loans.findAll({
      where: {
        loans_id: data_id
      },
      include: [
        {model: User}, {model: Book}
      ],
      order: [ ['loans_id', orderBy] ],
      limit: data_limit,
    });
    return result;
  }

  static async getMaxId(){
    const maxId = sequelize.fn('max', sequelize.col('loans_id'));
    const result = await Loans.findOne({
      attributes: [
        [maxId, 'maxId'],
      ],
      raw:true,
    });
    return result;
  }

  /** 대출 수정 */
  static async updateLoans({loans_id, state, cancel}){
    console.log("update: ",state);
    const result = await Loans.update({
      "status": state, 
      "cancel_yn": cancel, 
    }, {
      where: {
        id: loans_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }
  /** 책 반납 */
  static async returnLoans({loans_id, returned, returnDate}){
    console.log("모델에서 받음 책반납 : ",loans_id, returned, returnDate);
    // 받은 값을 loans_id와 id가 일치하는 값을 찾아 그 값의 반환여부 와 실제 반납일에 업데이트 함
    const result = await Loans.update({
      "is_returned": returned,
      "returned_date": returnDate,
    },{
      where: { 
        loans_id: loans_id
      }
    });
    console.log("책반납성공!! result: ",result);
    return result;
  }
  /** 대출 기간연장 */
  static async renewLoans({loans_id, renewDate}){
    console.log("모델에서 받음 대출연장 : ",loans_id, renewDate);
    // 받은 값을 loans_id와 id가 일치하는 값을 찾아 그 값의 반환여부 와 실제 반납일 에 업데이트 함
    const result = await Loans.update({
      "due_date": renewDate,
    },{
      where: { 
        loans_id: loans_id
      }
    });
    console.log("대출연장성공!! result: ",result);
    return result;
  }

  //삭제 쿼리
  static async deleteLoans({loans_id}){
    const loans = await Loans.destroy({
      where: {
        loans_id: loans_id
      }
    });
    return loans;
  }

}

module.exports = LoansModel;