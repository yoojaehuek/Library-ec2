const { Product, Store, Option, sequelize } = require('../schemas');
const Loans = require('../schemas/loans'); 
// const LoansMenu = require('../schemas/loansMenu'); 
// const LoansOption = require('../schemas/loansOption'); 
const { Op, QueryTypes } = require('sequelize');

class LoansModel {

  static async createLoans({newLoans}){
    console.log("모델에서받은 newLoans: ",newLoans);

    // newLoans 배열을 반복하면서 각 객체를 처리
    const createdLoans = await Promise.all(newLoans.map(async (loansData) => {
      const createNewLoans = await Loans.create({
        book_id: loansData.book_id,
        user_id: loansData.user_id,
        due_date: loansData.due_date,
      });
      return createNewLoans;
    }));
    return createdLoans;
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
    // console.log("loansId",id);
    const loans = await Loans.findAll();
    return loans;
  }

  static async findOneLoansUserId({id}){
    // console.log("loansId",id);
    const loans = await Loans.findAll({
      where: {
        user_id: id,
      },
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

//삭제 쿼리
  static async deleteLoans({loans_id}){
    // console.log("loansId",loansId);
    const loans = await Loans.destroy({
      where: {
        id: loans_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return loans;
  }

}

module.exports = LoansModel;