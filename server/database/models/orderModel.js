const { Product, Store, Option, sequelize } = require('../schemas');
const Order = require('../schemas/order'); 
const OrderMenu = require('../schemas/orderMenu'); 
const OrderOption = require('../schemas/orderOption'); 
const { Op, QueryTypes } = require('sequelize');

class OrderModel {

  static async createOrder({newOrder}){
    // console.log("newOrder: ",newOrder);
    const createNewOrder = await Order.create({
      user_id: newOrder.userId,
      store_id: newOrder.store_id,
      total_price: newOrder.total_price,
    });
    return createNewOrder;
  }

  static async createOrderMenu({order_id, item}){
    // console.log("OrderMenu: ",order_id);
    const createNewOrderMenu = await OrderMenu.create({
      'order_id': order_id,
      product_id: item.menu_id,
      quantity: item.quantity,
    });
    return createNewOrderMenu;
  }

  static async createOrderOption({orderMenu_id, option}){
    // console.log("option: ",option);
    const createNewOrderMenu = await OrderOption.create({
      'orderMenu_id': orderMenu_id,
      option_id: option.option_id,
      quantity: option.quantity,
    });
    return createNewOrderMenu;
  }


 //조회 쿼리
  static async getAllOrder(){
    // console.log("orderId",id);
    const order = await Order.findAll();
    return order;
  }

  static async findOneOrderUserId({id}){
    // console.log("orderId",id);
    const order = await Order.findAll({
      where: {
        user_id: id,
      },
    }); //where: {id: asdf} 형태가 들어와야함
    return order;
  }

  static async getOrderByOrderId({order_id}){
    const result = await Order.findAll({
      where: {
        id: order_id,
      },
    });
    return result;
  }
  
  static async findAllOrderMenuByOrderId({orderId}){
    const orderMenus = await OrderMenu.findAll({
      where: {
        order_id: orderId,
      }
    });
    return orderMenus;
  }

  static async findAllOrderOptionByOrderId({orderMenuId}){
    const orderOptions = await OrderOption.findAll({
      where: {
        orderMenu_id: orderMenuId,
      }
    });
    return orderOptions;
  }

  static async findAllOrderDate({userId, date}){
    
    console.log(userId, date);
    const result = await Order.findAll({
      where: {
        user_id: userId,
        created_at: {
          [Op.between]: [date, new Date()],
        }
      },
      attributes: ['id', 'total_price', 'status', 'created_at'],
      // raw: true,
      include: [
        { 
          model: OrderMenu,
          attributes: ['quantity'],
          include: [
            {
              model: Product,
              attributes: ['k_name', 'price', 'thumbnail_img_url'],
            },
            {
              model: OrderOption,
              attributes: ['quantity'],
              required: false,
              include: [
                {
                  model: Option,
                  attributes: ['name', 'price'],
                }
              ],
            },
          ]
        },
        {
          model: Store,
          attributes: ['store_name']
        },
      ],
      /*--  위 시퀄문 sql버전 
      SELECT 
        `Order`.`id`, 
          `Order`.`status`, 
          `Order`.`created_at`, 
          `OrderMenus`.`id` AS `OrderMenus.id`, 
          `OrderMenus`.`quantity` AS `OrderMenus.quantity`, 
          `OrderMenus->Product`.`id` AS `OrderMenus.Product.id`, 
          `OrderMenus->Product`.`k_name` AS `OrderMenus.Product.k_name`, 
          `OrderMenus->Product`.`price` AS `OrderMenus.Product.price`, 
          `OrderMenus->Product`.`thumbnail_img_url` AS `OrderMenus.Product.thumbnail_img_url`, 
          `OrderMenus->OrderOptions`.`id` AS `OrderMenus.OrderOptions.id`, 
          `OrderMenus->OrderOptions`.`quantity` AS `OrderMenus.OrderOptions.quantity`, 
          `OrderMenus->OrderOptions->Option`.`id` AS `OrderMenus.OrderOptions.Option.id`, 
          `OrderMenus->OrderOptions->Option`.`name` AS `OrderMenus.OrderOptions.Option.name`, 
          `OrderMenus->OrderOptions->Option`.`price` AS `OrderMenus.OrderOptions.Option.price`, 
          `Store`.`id` AS `Store.id`, 
          `Store`.`store_name` AS `Store.store_name` 
      FROM `Order` AS `Order`
      LEFT OUTER JOIN `OrderMenu` AS `OrderMenus` ON `Order`.`id` = `OrderMenus`.`order_id` 
      LEFT OUTER JOIN `Product` AS `OrderMenus->Product` ON `OrderMenus`.`product_id` = `OrderMenus->Product`.`id` 
      LEFT OUTER JOIN `OrderOption` AS `OrderMenus->OrderOptions` ON `OrderMenus`.`id` = `OrderMenus->OrderOptions`.`orderMenu_id` 
      LEFT OUTER JOIN `Option` AS `OrderMenus->OrderOptions->Option` ON `OrderMenus->OrderOptions`.`option_id` = `OrderMenus->OrderOptions->Option`.`id` 
      LEFT OUTER JOIN `Store` AS `Store` ON `Order`.`store_id` = `Store`.`id` 
      WHERE `Order`.`user_id` = 1 AND `Order`.`created_at` BETWEEN '2023-12-15 09:26:08' AND '2023-12-17 09:26:08';
      */
    });
    return result;
  }

  static async rankMenu() {
    const query = `
      SELECT
        ordermenu.product_id,
        prod.k_name,
        prod.thumbnail_img_url,
        COUNT(ordermenu.product_id) AS product_count
      FROM
        mcdonalddb.ordermenu
      LEFT JOIN
        mcdonalddb.product AS prod ON prod.id = ordermenu.product_id
      GROUP BY
        ordermenu.product_id
      LIMIT 3;
    `;
    const result = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    console.log("result: ", result);
    return result;
  }


  static async updateOrder({order_id, state, cancel}){
    console.log("update: ",state);
    const result = await Order.update({
      "status": state, 
      "cancel_yn": cancel, 
    }, {
      where: {
        id: order_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

//삭제 쿼리
  static async deleteOrder({order_id}){
    // console.log("orderId",orderId);
    const order = await Order.destroy({
      where: {
        id: order_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return order;
  }

}

module.exports = OrderModel;