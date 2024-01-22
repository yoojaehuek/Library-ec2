const Event_applicants = require('../schemas/event_applicants'); 
const { Op } = require('sequelize');
const User = require('../schemas/user');
const Event = require('../schemas/event');

class Event_applicantsModel {
  static async createEvent_applicants(newEvent_applicants){
    console.log("newEvent_applicants",newEvent_applicants);
    const result = await Event_applicants.create(newEvent_applicants);
    return result;
  }
  static async deleteEvent_applicants(deleteEvent_applicants){
    console.log("deleteEvent_applicants",deleteEvent_applicants);
    const result = await Event_applicants.destroy(deleteEvent_applicants);
    return result;
  }

  static async getAllEvent_applicants(query){
    const result = await Event_applicants.findAll({
      where: query,
      include: [
        {
          model: User,    
          attributes: ['user_email','user_name'],
        },
        {
          model: Event, 
        }
      ],
    });
    return result;
  }

  static async getCategoryEvent_applicants(wheres){
    console.log("wheres: ", wheres);
    const result = await Event_applicants.findAll({
      where: wheres,
      // order: [ ['event_id', 'ASC'] ],
      // raw:true,
    });
    return result;
  }

  // static async getSearchEvent_applicants(validationInput){
  //   console.log("validationInput: ", validationInput);
  //   const result = await Event_applicants.findAll({
  //     where: {
  //       [Op.or]: [
  //         {event_name: {[Op.like]: `%${validationInput}%`}},
  //         {event_author: {[Op.like]: `%${validationInput}%`}},
  //         {event_publisher: {[Op.like]: `%${validationInput}%`}},
  //         {event_genre: {[Op.like]: `%${validationInput}%`}},
  //         {event_ISBN: {[Op.like]: `%${validationInput}%`}},
  //       ]
  //     },
  //     // order: [ ['event_id', 'ASC'] ],
  //     raw:true,
  //   });
  //   return result;
  // }

  static async getOneEvent_applicants({event_id}){
    const result = await Event_applicants.findOne({
      where: {
        event_id: event_id,
      },
    });
    return result;
  }

  static async getOneEvent_applicantsByID({event_id, user_id}){
    const result = await Event_applicants.findOne({
      where: {
        event_id: event_id,
        user_id: user_id,
      },
    });
    return result;
  }
  
  static async updateEvent_applicants({ event_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Event_applicants.update({
      ...toUpdate 
    }, {
      where: {
        event_id: event_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteEvent_applicants({ event_id }){
    // console.log("eventId",eventId);
    const result = await Event_applicants.destroy({
      where: {
        event_id: event_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async getAllByUser({ user_id }){
    const result = await Event_applicants.findAll({
      where: {
        user_id: user_id
      },
      include: [
        {
          model: Event 
        }
      ],
    });
    console.log("ModelgetAllByUserresult", result);
    return result;
  }

}

module.exports = Event_applicantsModel; 