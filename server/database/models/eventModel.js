const Event = require('../schemas/event'); 
const { Op } = require('sequelize');

class EventModel {
  static async createEvent({newEvent}){
    console.log("newEvent",newEvent);
    const result = await Event.create(newEvent);
    return result;
  }

  static async getAllEvent(){
    const result = await Event.findAll();
    return result;
  }

  static async getPageEvent({ event_id, event_limit, orderBy }){
    const result = await Event.findAll({
      where: {
        event_id: event_id
      },
      order: [ ['event_id', orderBy] ],
      limit: event_limit,
    });
    return result;
  }

  static async getCategoryEvent(wheres){
    console.log("wheres: ", wheres);
    const result = await Event.findAll({
      where: wheres,
      // order: [ ['event_id', 'ASC'] ],
      raw:true,
    });
    return result;
  }

  // static async getSearchEvent(validationInput){
  //   console.log("validationInput: ", validationInput);
  //   const result = await Event.findAll({
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

  static async getOneEvent({event_id}){
    console.log("EventModel getOneEvent: ", event_id);
    const result = await Event.findOne({
      where: {
        event_id: event_id,
      },
      raw:true,
    });
    return result;
  }
  
  static async updateEvent({ event_id, toUpdate }){
    console.log("update: ",toUpdate);    
    const result = await Event.update({
      ...toUpdate 
    }, {
      where: {
        event_id: event_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteEvent({ event_id }){
    // console.log("eventId",eventId);
    const result = await Event.destroy({
      where: {
        event_id: event_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async applyEvent({ event_id, user_id }){
    console.log(event_id, user_id);
    const result = await Event.apply({
      where: {
        event_id: event_id,
        user_id: user_id
      }
    });
    return result;
  }
  static async unapplyEvent({ event_id, user_id }){
    console.log(event_id, user_id);
    const result = await Event.unapply({
      where: {
        event_id: event_id,
        user_id: user_id
      }
    });
    return result;
  }
}

module.exports = EventModel; 