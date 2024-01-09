const Book = require('../schemas/book'); 
const { Op } = require('sequelize');

class BookModel {
  static async createBook({newBook}){
    console.log("newBook",newBook);
    const result = await Book.create(newBook);
    return result;
  }

  static async getAllBook(){
    const result = await Book.findAll();
    return result;
  }

  static async getCategoryBook(wheres){
    console.log("wheres: ", wheres);
    const result = await Book.findAll({
      where: wheres,
      // order: [ ['book_id', 'ASC'] ],
      raw:true,
    });
    return result;
  }

  static async getOneBook({book_id}){
    const result = await Book.findOne({
      where: {
        book_id: book_id,
      },
    });
    return result;
  }
  
  static async updateBook({ book_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Book.update({
      ...toUpdate
    }, {
      where: {
        id: book_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteBook({ book_id }){
    // console.log("bookId",bookId);
    const result = await Book.destroy({
      where: {
        id: book_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = BookModel; 