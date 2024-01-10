const Review = require('../schemas/review'); 
const { Op } = require('sequelize');

class ReviewModel {
  static async createReview({newReview}){
    console.log("newReview",newReview);
    const result = await Review.create(newReview);
    return result;
  }

  static async getAllReview(){
    const result = await Review.findAll();
    return result;
  }

  static async getCategoryReview(wheres){
    console.log("wheres: ", wheres);
    const result = await Review.findAll({
      where: wheres,
      // order: [ ['review_id', 'ASC'] ],
      raw:true,
    });
    return result;
  }

  static async getSearchReview(validationInput){
    console.log("validationInput: ", validationInput);
    const result = await Review.findAll({
      where: {
        [Op.or]: [
          {review_name: {[Op.like]: `%${validationInput}%`}},
          {review_author: {[Op.like]: `%${validationInput}%`}},
          {review_publisher: {[Op.like]: `%${validationInput}%`}},
          {review_genre: {[Op.like]: `%${validationInput}%`}},
          {review_ISBN: {[Op.like]: `%${validationInput}%`}},
        ]
      },
      // order: [ ['review_id', 'ASC'] ],
      raw:true,
    });
    return result;
  }

  static async getOneReview({review_id}){
    const result = await Review.findOne({
      where: {
        review_id: review_id,
      },
    });
    return result;
  }
  
  static async updateReview({ review_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Review.update({
      ...toUpdate 
    }, {
      where: {
        review_id: review_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteReview({ review_id }){
    // console.log("reviewId",reviewId);
    const result = await Review.destroy({
      where: {
        review_id: review_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = ReviewModel; 