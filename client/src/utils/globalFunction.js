export const errHandler = (err) => {
  const errRes = err.response.data; 

  if (errRes.message === '다시로그인') {
    console.log("errHandler 진입");
    
    alert(errRes.message);
    // window.location.replace('/app1'+errRes.url);
    window.location.replace(errRes.url);
  }
  return;
}
