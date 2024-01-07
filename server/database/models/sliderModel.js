const Slider = require('../schemas/slider'); 

class SliderModel {
  static async createSlider({newSlider}){
    console.log("newSlider",newSlider);
    const result = await Slider.create(newSlider);
    return result;
  }

  static async getAllSlider(){
    const result = await Slider.findAll();
    return result;
  }
  
  static async updateSlider({ slider_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Slider.update({
      ...toUpdate
    }, {
      where: {
        id: slider_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteSlider({ slider_id }){
    // console.log("sliderId",sliderId);
    const result = await Slider.destroy({
      where: {
        id: slider_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = SliderModel; 