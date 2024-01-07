const Material = require('../schemas/material'); 

class MaterialModel {
  static async createMaterial({newMaterial}){
    console.log("newMaterial",newMaterial);
    const result = await Material.create(newMaterial);
    return result;
  }

  static async getAllMaterial(){
    const result = await Material.findAll();
    return result;
  }
  
  static async updateMaterial({ material_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Material.update({
      ...toUpdate
    }, {
      where: {
        id: material_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteMaterial({ material_id }){
    // console.log("materialId",materialId);
    const result = await Material.destroy({
      where: {
        id: material_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = MaterialModel; 