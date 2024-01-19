import axios from "axios";
import KakaoLogin from "react-kakao-login";
import { API_URL } from "../../../config/contansts";

const KakaoLoginButton =()=>{
  const kakaoClientId = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
  
  const kakaoOnSuccess = async (data)=>{
    // console.log(data)
    const access_token = data.response.access_token;  // 엑세스 토큰 백엔드로 전달

    const res = await axios.post(`${API_URL}/api/kakao`, access_token);
    console.log('카카오 로그인 res: ', res);
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
      />
    </>
  )
}

export default KakaoLoginButton;