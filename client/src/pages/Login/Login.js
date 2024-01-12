import React, {useEffect, useState} from 'react';
import { API_URL } from '../../config/contansts';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms/State";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import axios from 'axios';
import './Login.scss';
import NaverLogin from '../../components/NaverLogin/NaverLogin';

const Login = () => {
	const [islogin, setIslogin] = useRecoilState(loginState); //useState와 거의 비슷한 사용법
	// const [getToken, setGetToken] = useState();
  // const [userInfo, setUserInfo] = useState();
	
	const navigate = useNavigate();
	
	const [naverLoginButton, setNaverLoginButton] = useState();

	const createMarkup = (html) => {
		return {__html: html};
	}
	const MyComponent = (html) => {
		return <div dangerouslySetInnerHTML={createMarkup(html)} />;
	}
	

	useEffect(()=> {
		axios.get(`${API_URL}/api/test/naverlogin`)
		.then(res => {
			console.log(res.data);
			// setNaverLoginButton(res.data);
			// setNaverLoginButton(createMarkup(res.data));
			setNaverLoginButton(MyComponent(res.data));
		}).catch(e => {
			console.error(e);
		})

		userAccessToken();
	}, []);

	// // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
	// useEffect(() => {
	// 	userAccessToken();
  //   // naverLogin();
	// }, [])

	const userAccessToken = () => {
    // window.location.href는 현재 페이지의 URL을 문자열로 반환하는 속성입니다.
    // includes 메소드를 사용하여 URL에 'code'이라는 문자열이 포함되어 있는지 확인합니다.
    // 만약 포함되어 있다면 getToken() 함수를 호출합니다.
    window.location.href.includes('code') && getToken();
	}
        
  const getToken = () => {
    //주소에서 엑세스토큰만 가져옴
    //?code=c4HdngWVGK3jEDwp2y&state=NAVER_STATE
    const code = window.location.href.split('=')[1].split('&')[0];
    const state = window.location.href.split('=')[2];
  
    // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!   
    localStorage.setItem('code', code);
    localStorage.setItem('state', state);

    //naverlogin에서 받은 code로 access_token 발급
    axios.get(`${API_URL}/api/test/callback?code=${code}&state=${state}`)
    .then(res => {
      console.log(res.data);
      if (res.data.access_token) {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);

        //callback에서 받은 access_token으로 유저 조회
        axios.get(`${API_URL}/api/test/member?access_token=${res.data.access_token}`)
        .then(res => {
          console.log('member: ', res.data);
          axios.post(`${API_URL}/api/user/naver-login`, res.data.response);
          navigate('/');
        }).catch(e => {
          console.error('member 에러: ',e);
        })
      }
    }).catch(e => {
      console.log(e);
    })
	}
        
  


	/** 로그인 */
	const onSubmitLogin = async (e) => {
		e.preventDefault();
		const email = e.target.email.value.trim();
		const pwd = e.target.pwd.value.trim();

		console.log("email:", email);
		console.log("pwd:", pwd);

		if( email !== "" && pwd !== ""){
			console.log(email);
			axios.post(
				`${API_URL}/api/user/login`,
				{email, pwd},
				// { withCredentials: true }// 쿠키 수정허용
			)
			.then(() =>{
				alert("로그인성공!");
				setIslogin(true);// 로컬스토리지에 저장. 브라우저닫아도 유지
				navigate('/');  
			})
			.catch(err =>{
				// console.error(err);
				console.error(err);
				alert(`로그인 실패!\n${err}`);
			})
		}else{
			return alert("전부 입력해주세요");
		}
	};

	// const naverLogout = () => {
  //   localStorage.removeItem("com.naver.nid.access_token");
  //   window.location.href='/test';
  // };

	return (
	<div className="login-container-yjh">
		<form id='login-form-yjh' onSubmit={onSubmitLogin}>
			<h1>로그인</h1>
			<ul id='login-input-yjh'>
				<div>
					<li className="input-li-yjh">
						<label>아이디(이메일주소)</label>
						<input
							type="text"
							id="email"
							placeholder="예) abc@gmail.com"
						/>
					</li>
					<li className="input-li-yjh">
						<label>비밀번호</label>
						<input
							type="password"
							id="pwd"
							placeholder="비밀번호"
						/>
					</li>
				</div>
				<button id='login-btn-yjh' type='submit'>로그인</button>
			</ul>
			<div id='login-tip-yjh'>
				<p><AiOutlineQuestionCircle className='icon' size={30}/>로그인이 안되시는 경우 한/영키와 Caps Lock이 켜져 있는지 확인해주세요</p>
				<p><AiOutlineQuestionCircle className='icon' size={30}/>계속 로그인이 안되시는 경우 관리자에게 문의 해주세요</p>
			</div>
			{/* <NaverLogin setGetToken={setGetToken} setUserInfo={setUserInfo} /> */}
			{naverLoginButton}
		</form>
	</div>
	);
}

export default Login;
