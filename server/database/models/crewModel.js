const Crew = require('../schemas/crew'); 

class CrewModel {
  static async createCrew({newCrew}){
    console.log("newCrew",newCrew);
    const result = await Crew.create(newCrew);
    return result;
  }

  static async getAllCrew(){
    const result = await Crew.findAll();
    return result;
  }
  
  static async updateCrew({ crew_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Crew.update({
      ...toUpdate
    }, {
      where: {
        id: crew_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteCrew({ crew_id }){
    // console.log("crewId",crewId);
    const result = await Crew.destroy({
      where: {
        id: crew_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = CrewModel; 