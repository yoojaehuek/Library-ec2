const Loans = require('../schemas/loans'); 
const Book = require('../schemas/book');
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

  // static async createLoansMenu({loans_id, item}){
  //   // console.log("LoansMenu: ",loans_id);
  //   const createNewLoansMenu = await LoansMenu.create({
  //     'loans_id': loans_id,
  //     product_id: item.menu_id,
  //     quantity: item.quantity,
  //   });
  //   return createNewLoansMenu;
  // }

  // static async createLoansOption({loansMenu_id, option}){
  //   // console.log("option: ",option);
  //   const createNewLoansMenu = await LoansOption.create({
  //     'loansMenu_id': loansMenu_id,
  //     option_id: option.option_id,
  //     quantity: option.quantity,
  //   });
  //   return createNewLoansMenu;
  // }


  //조회 쿼리
  static async getAllLoans(){
    // console.log("모델 전체조회 들어옴");
    const loans = await Loans.findAll();
    // console.log("전체조회로 찾은거: ",loans);
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
          attributes: ['book_name', 'book_author'],
        }
      ],
    }); //where: {id: asdf} 형태가 들어와야함
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
  
  // static async findAllLoansMenuByLoansId({loansId}){
  //   const loansMenus = await LoansMenu.findAll({
  //     where: {
  //       loans_id: loansId,
  //     }
  //   });
  //   return loansMenus;
  // }

  // static async findAllLoansOptionByLoansId({loansMenuId}){
  //   const loansOptions = await LoansOption.findAll({
  //     where: {
  //       loansMenu_id: loansMenuId,
  //     }
  //   });
  //   return loansOptions;
  // }

  // static async findAllLoansDate({userId, date}){
    
  //   console.log(userId, date);
  //   const result = await Loans.findAll({
  //     where: {
  //       user_id: userId,
  //       created_at: {
  //         [Op.between]: [date, new Date()],
  //       }
  //     },
  //     attributes: ['id', 'total_price', 'status', 'created_at'],
  //     // raw: true,
  //     include: [
  //       { 
  //         model: LoansMenu,
  //         attributes: ['quantity'],
  //         include: [
  //           {
  //             model: Product,
  //             attributes: ['k_name', 'price', 'thumbnail_img_url'],
  //           },
  //           {
  //             model: LoansOption,
  //             attributes: ['quantity'],
  //             required: false,
  //             include: [
  //               {
  //                 model: Option,
  //                 attributes: ['name', 'price'],
  //               }
  //             ],
  //           },
  //         ]
  //       },
  //       {
  //         model: Store,
  //         attributes: ['store_name']
  //       },
  //     ],
  //     /*--  위 시퀄문 sql버전 
  //     SELECT 
  //       `Loans`.`id`, 
  //         `Loans`.`status`, 
  //         `Loans`.`created_at`, 
  //         `LoansMenus`.`id` AS `LoansMenus.id`, 
  //         `LoansMenus`.`quantity` AS `LoansMenus.quantity`, 
  //         `LoansMenus->Product`.`id` AS `LoansMenus.Product.id`, 
  //         `LoansMenus->Product`.`k_name` AS `LoansMenus.Product.k_name`, 
  //         `LoansMenus->Product`.`price` AS `LoansMenus.Product.price`, 
  //         `LoansMenus->Product`.`thumbnail_img_url` AS `LoansMenus.Product.thumbnail_img_url`, 
  //         `LoansMenus->LoansOptions`.`id` AS `LoansMenus.LoansOptions.id`, 
  //         `LoansMenus->LoansOptions`.`quantity` AS `LoansMenus.LoansOptions.quantity`, 
  //         `LoansMenus->LoansOptions->Option`.`id` AS `LoansMenus.LoansOptions.Option.id`, 
  //         `LoansMenus->LoansOptions->Option`.`name` AS `LoansMenus.LoansOptions.Option.name`, 
  //         `LoansMenus->LoansOptions->Option`.`price` AS `LoansMenus.LoansOptions.Option.price`, 
  //         `Store`.`id` AS `Store.id`, 
  //         `Store`.`store_name` AS `Store.store_name` 
  //     FROM `Loans` AS `Loans`
  //     LEFT OUTER JOIN `LoansMenu` AS `LoansMenus` ON `Loans`.`id` = `LoansMenus`.`loans_id` 
  //     LEFT OUTER JOIN `Product` AS `LoansMenus->Product` ON `LoansMenus`.`product_id` = `LoansMenus->Product`.`id` 
  //     LEFT OUTER JOIN `LoansOption` AS `LoansMenus->LoansOptions` ON `LoansMenus`.`id` = `LoansMenus->LoansOptions`.`loansMenu_id` 
  //     LEFT OUTER JOIN `Option` AS `LoansMenus->LoansOptions->Option` ON `LoansMenus->LoansOptions`.`option_id` = `LoansMenus->LoansOptions->Option`.`id` 
  //     LEFT OUTER JOIN `Store` AS `Store` ON `Loans`.`store_id` = `Store`.`id` 
  //     WHERE `Loans`.`user_id` = 1 AND `Loans`.`created_at` BETWEEN '2023-12-15 09:26:08' AND '2023-12-17 09:26:08';
  //     */
  //   });
  //   return result;
  // }

  // static async rankMenu() {
  //   const query = `
  //     SELECT
  //       loansmenu.product_id,
  //       prod.k_name,
  //       prod.thumbnail_img_url,
  //       COUNT(loansmenu.product_id) AS product_count
  //     FROM
  //       mcdonalddb.loansmenu
  //     LEFT JOIN
  //       mcdonalddb.product AS prod ON prod.id = loansmenu.product_id
  //     GROUP BY
  //       loansmenu.product_id
  //     LIMIT 3;
  //   `;
  //   const result = await sequelize.query(query, {
  //     type: QueryTypes.SELECT,
  //   });
  //   console.log("result: ", result);
  //   return result;
  // }

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
    // 받은 값을 loans_id와 id가 일치하는 값을 찾아 그 값의 반환여부 와 실제 반납일 에 업데이트 함
    const result = await Loans.update({
      "is_returned": returned,
      "returned_date": returnDate,
    },{
      where: { 
        loans_id: loans_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    console.log("책반납성공!! result: ",result);
    return result;
  }
  /** 대출 기간연장 */
  static async renewLoans({loans_id, due_date}){
    console.log("모델에서 받음 대출연장 : ",loans_id, due_date);
    // 받은 값을 loans_id와 id가 일치하는 값을 찾아 그 값의 반환여부 와 실제 반납일 에 업데이트 함
    const result = await Loans.update({
      "due_date": due_date,
    },{
      where: { 
        loans_id: loans_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    console.log("대출연장성공!! result: ",result);
    return result;
  }

  //삭제 쿼리
  static async deleteLoans({loans_id}){
    // console.log("loansId",loansId);
    const loans = await Loans.destroy({
      where: {
        loans_id: loans_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    
    return loans;
  }

}

module.exports = LoansModel;