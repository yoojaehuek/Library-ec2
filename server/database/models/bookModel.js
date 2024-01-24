const {Book, Review, sequelize} = require('../schemas'); 
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

  static async getCategoryBook({limit, ...wheres}){
    console.log("wheres: ", wheres);
    const ratingAvgRound = sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('Reviews.review_rating')));
    const result = await Book.findAll({
      attributes: [
        'book_id',
        'book_name',
        'book_img_url',
        'book_author',
        'book_publisher',
        'book_genre',
        'book_availability',
        'book_description',
        'book_ISBN',
        'created_at',
        [ratingAvgRound, 'average_rating'],
      ],
      include: [{
        model: Review,
        attributes: [],
        duplicating: false,
      }],
      where: wheres,
      limit: limit,
      group: ['Book.book_id'],
      raw:true,
    });
    return result;
  }

  static async getSearchBook(input){
    console.log("input: ", input);
    const result = await Book.findAll({
      where: {
        [Op.or]: [
          {book_name: {[Op.like]: `%${input}%`}},
          {book_author: {[Op.like]: `%${input}%`}},
          {book_publisher: {[Op.like]: `%${input}%`}},
          {book_genre: {[Op.like]: `%${input}%`}},
          {book_ISBN: {[Op.like]: `%${input}%`}},
        ]
      },
      // order: [ ['book_id', 'ASC'] ],
      raw:true,
    });
    return result;
  }

  // static async getOneBook({book_id}){
  //   const result = await Book.findOne({
  //     where: {
  //       book_id: book_id,
  //     },
  //   });
  //   return result;
  // }
  
  static async updateBook({ book_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Book.update({
      ...toUpdate 
    }, {
      where: {
        book_id: book_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteBook({ book_id }){
    // console.log("bookId",bookId);
    const result = await Book.destroy({
      where: {
        book_id: book_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = BookModel; 