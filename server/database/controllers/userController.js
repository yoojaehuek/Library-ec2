//커트롤러 역할
//req수신
//req 데이터 및 내용 검증
//서버에서 수행된 결과 클라이언트에게 반환(res)

const UserService = require("../services/userService");

class UserController {
  static async createUser(req, res, next) {
    try {
      console.log(req.body);
      const tmp = req.body;
      console.log("유저컨트롤러에서 받은 tmp: ", tmp);
      const newUser = await UserService.createUser(tmp);

      if (newUser.errorMessage) {
        throw new Error(newUser.errorMessage);
      }
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      const tmp = req.body;
      console.log("컨트롤러에서 tmp: ", tmp );
      const user = await UserService.loginUser(tmp);
      console.log("userControll.loginUser: ", user);

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }

      res.cookie("accessToken", user.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  static async naverLogin(req, res, next) {
    try {
      //가입했는지 검사
        //if 신규
          //가입
        //else 신규 아님
          //if 이미 소셜
            //이미 있는 회원 - 로그인처리
          //else 소셜 아님 일반 회원
            //연동
      const tmp = req.body;
      console.log("컨트롤러에서 tmp: ", tmp);

      const serviceResult = await UserService.naverLogin(tmp);
      console.log("userControll.loginUser: ", serviceResult);

      if(serviceResult.errorMessage){
          throw new Error(serviceResult.errorMessage);
      };

      res.cookie('accessToken', serviceResult.accessToken, {
          httpOnly : true,
          secure : false,
          sameSite : 'strict',
      });
      res.cookie('refreshToken', serviceResult.refreshToken, {
          httpOnly : true,
          secure : false,
          sameSite : 'strict',
      });
      res.status(200).json({status: 'true'});
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      //가입했는지 검사
        //if 신규
          //가입
        //else 신규 아님
          //if 이미 소셜
            //이미 있는 회원 - 로그인처리
          //else 소셜 아님 일반 회원
            //연동
      const tmp = req.body.decodeToken;
      console.log("컨트롤러에서 tmp: ", tmp);

      const serviceResult = await UserService.googleLogin(tmp);
      console.log("userControll.loginUser: ", serviceResult);

      if(serviceResult.errorMessage){
          throw new Error(serviceResult.errorMessage);
      };

      res.cookie('accessToken', serviceResult.accessToken, {
          httpOnly : true,
          secure : false,
          sameSite : 'strict',
      });
      res.cookie('refreshToken', serviceResult.refreshToken, {
          httpOnly : true,
          secure : false,
          sameSite : 'strict',
      });
      res.status(200).json({status: 'true'});
    } catch (error) {
      next(error);
    }
  }
  static async kakaoLogin(req, res, next) {
    try {
      //가입했는지 검사
        //if 신규
          //가입
        //else 신규 아님
          //if 이미 소셜
            //이미 있는 회원 - 로그인처리
          //else 소셜 아님 일반 회원
            //연동
      const tmp = req.body.userData;
      console.log("컨트롤러에서 tmp: ", tmp);

      const serviceResult = await UserService.kakaoLogin(tmp);
      console.log("userControll.kakaoLogin: ", serviceResult);

      if(serviceResult.errorMessage){
          throw new Error(serviceResult.errorMessage);
      };

      res.cookie('accessToken', serviceResult.accessToken, {
          httpOnly : true,
          secure : false,
          sameSite : 'strict',
      });
      res.cookie('refreshToken', serviceResult.refreshToken, {
          httpOnly : true,
          secure : false,
          sameSite : 'strict',
      });
      res.status(200).json({status: 'true'});
    } catch (error) {
      next(error);
    }
  }

  static async checkPassword(req, res, next) {
    try {
      const user_id = req.user_id;
      const user_pwd = req.body.pwd;
      console.log("컨트롤러에서 pwd: ", user_pwd);
      const user = await UserService.checkPassword({user_id, user_pwd});
      console.log("userControll.loginUser: ", user);

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }

      res.status(200).json({"status": user});
    } catch (error) {
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const user = await UserService.getAllUser();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }


  static async detailUser(req, res, next) {
    try {
      const userId = req.user_id;
      // const id = "rlarorn@naver.com";
      console.log("userId: ", userId);
      const user = await UserService.detailUser({ userId });

      // console.log("res임니다요: ",res);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async patchUser(req, res, next) {
    try {
      const user_id = req.user_id;
      // const userId = 1;
      const toUpdate = { ...req.body };
      // const updateValue = req.body;
      console.log("userController/updateValue: ", toUpdate, user_id);
      const user = await UserService.patchUser({ toUpdate, user_id });

      // console.log("res임니다요: ",res);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const user_id = req.user_id;
      // const userId = 1;
      console.log("userController/deleteUser: ", user_id);
      const user = await UserService.deleteUser({ user_id });

      // console.log("res임니다요: ",res);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAdminUser(req, res, next) {
    try {
      const user_id = req.params.user_id;
      // const userId = 1;
      console.log("userController/deleteUser: ", user_id);
      const user = await UserService.deleteAdminUser({ user_id });

      // console.log("res임니다요: ",res);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;