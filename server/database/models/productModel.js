const Product = require('../schemas/product'); 
const { Op } = require('sequelize');

class ProductModel {
  static async createProduct({newProduct}){
    console.log("newProduct",newProduct);
    const result = await Product.create(newProduct);
    return result;
  }

  static async getOneProduct({product_id}){
    const result = await Product.findOne({
      where: {
        id: product_id,
      },
    });
    return result;
  }

  static async getCategoryProduct({category_id}){
    const result = await Product.findAll({
      where: {
        sub_category_id: category_id,
      },
      order: [ ['id', 'ASC'] ],
      raw:true,
    });
    return result;
  }
  
  static async updateProduct({update, product_id}){
    console.log("update: ",update);
    const result = await Product.update({
      ...update
    }, {
      where: {
        id: product_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteProduct({product_id}){
    // console.log("productId",productId);
    const result = await Product.destroy({
      where: {
        id: product_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = ProductModel; 