import axios from "axios";
import KakaoLogin from "react-kakao-login";
import { API_URL } from "../../../config/contansts";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../../recoil/atoms/State";

const KakaoLoginButton =()=>{
  const navigate = useNavigate();
  const kakaoClientId = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
  const [islogin, setIslogin] = useRecoilState(loginState); //useState와 거의 비슷한 사용법

  const kakaoOnSuccess = async (data)=>{
    // console.log(data)
    const access_token = data.response.access_token;  // 엑세스 토큰 백엔드로 전달

    const res = await axios.post(`${API_URL}/api/kakao`, {access_token});
    kakaoLogin(res.data);
  }

  const kakaoLogin = async (userData) => {
		console.log("kakaoLogin(): ", userData);
		const res = await axios.post(`${API_URL}/api/user/kakao-login`, {userData});
		console.log(res.data);

		if(res.status == 200){
			console.log('로그인성공!');
			// alert("로그인성공!");
			setIslogin(true);// 로컬스토리지에 저장. 브라우저닫아도 유지
			navigate('/'); 
		}
	}

  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return(
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
        render={({ onClick }) => (
          <div
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
          >
            <img src={API_URL+"/images/KakaoLogin_icon/kakao_login_medium_narrow.png"} alt="카카오로그인" />
          </div>
        )}
      />
    </>
  )
}

export default KakaoLoginButton;