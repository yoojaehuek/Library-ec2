const User = require('../schemas/user'); 

class UserModel {
  
  static async createUser({newUser}){
    console.log("newUser",newUser);
    const createNewUser = await User.create(newUser);
    return createNewUser;
  }

  //있으면 조회, 없으면 가입
  static async naverLogin(newUser){
    // console.log("newUser",newUser);
    const result = await User.findOrCreate({
      where: {user_email: newUser.user_email},
      defaults: newUser
    });

    return result;
  }

  static async findOneUserId({id}){
    // console.log("userId",id);
    const user = await User.findOne({
      where: {
        user_email: id
      }
    }); //where: {id: asdf} 형태가 들어와야함
    return user;
  }

  static async findOneUserEmail({email}){
    console.log("userId",typeof(email));
    const user = await User.findOne({
      where: {
        user_email: email
      }
    }); //where: {id: asdf} 형태가 들어와야함
    console.log("찾음: ",user);
    return user;
  }
  
  static async patchUser({update, userId}){
    console.log("update: ",update);
    const user = await User.update({
      ...update
    }, {
      where: {
        user_email: userId
      }
    });//where: {id: asdf} 형태가 들어와야함
    return user;
  }

  static async destroyUser({userId}){
    // console.log("userId",userId);
    const user = await User.destroy({
      where: {
        user_email: userId
      }
    });//where: {id: asdf} 형태가 들어와야함
    return user;
  }

}

module.exports = UserModel; 