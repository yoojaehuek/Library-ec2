
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import axios from "axios";
import { API_URL } from "../../config/contansts";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";

const GoogleLoginButton = () => {   
	const navigate = useNavigate();
	const clientId = '224284524130-bon8sv624psparrbeoucngp1q3it4d7b.apps.googleusercontent.com';
	const [islogin, setIslogin] = useRecoilState(loginState); //useState와 거의 비슷한 사용법

	const decodeToken = async (token) => {
		console.log("decodeToken(): ", token);
		const res = await axios.post(`${API_URL}/api/google`, {token});
		console.log(res.data);
		googleLogin(res.data);
	}

	const googleLogin = async (decodeToken) => {
		console.log("googleLogin(): ", decodeToken);
		const res = await axios.post(`${API_URL}/api/user/google-login`, {decodeToken});
		console.log(res.data);

		if(res.status == 200){
			console.log('로그인성공!');
			// alert("로그인성공!");
			setIslogin(true);// 로컬스토리지에 저장. 브라우저닫아도 유지
			navigate('/'); 
		}
	}
	
	return (
		<>
			<GoogleOAuthProvider clientId={clientId}>
				<GoogleLogin
					onSuccess={(res) => {
						decodeToken(res.credential);
					}}
					onFailure={(err) => {
						console.log(err);
					}}
				/>
			</GoogleOAuthProvider>
		</>
	);
};

export default GoogleLoginButton