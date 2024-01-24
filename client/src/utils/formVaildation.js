/** 이메일 유효성검사 */
export const emailVaildation = (e) => {
  const email = e.target.value;
  // setEmail(currentEmail);
  const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  if (!emailRegExp.test(email)) {
    const emailMessage = "이메일의 형식이 올바르지 않습니다!";
    return {emailMessage, bool: false}
  } else {
    const emailMessage = "사용 가능한 이메일 입니다.";
    return {emailMessage, bool: true}
  }
};

/** 이름유효성검사 */
export const nameVaildation = (e) => {
  const name = e.target.value;
  // setName(currentName);
  if (name.length < 2 || name.length > 10) {
    const nameMessage = "닉네임은 2글자 이상 10글자 이하로 입력해주세요!";
    return {nameMessage, bool: false}
  } else {
    const nameMessage = "사용가능한 닉네임 입니다.";
    return {nameMessage, bool: true}
  }
};

/** 비밀번호 유효성검사 */
export const pwdVaildation = (e) => {
  const pwd = e.target.value;
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$&%^*+=-])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegExp.test(pwd)) {
    const pwdMessage = "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!";
    return {pwdMessage, bool: false};
  } else {
    const pwdMessage = "안전한 비밀번호 입니다.";
    return {pwdMessage, bool: true};
  }
};

/** 비밀번호 확인 유효성검사 */
export const pwdConfirmVaildation = ({e, pwd}) => {
	const pwdConfirm = e.target.value;
	// setPasswordConfirm(currentPasswordConfirm);
	if (pwd !== pwdConfirm) {
		const pwdConfirmMessage = "비밀번호가 똑같지 않아요!";
		return {pwdConfirmMessage, bool: false}
	} else {
		const pwdConfirmMessage = "똑같은 비밀번호를 입력했습니다.";
		return {pwdConfirmMessage, bool: true}
	}
};

/** 전화번호 유효성검사 */
export const phoneVaildation = (e) => {
  const phone = e.target.value;
  // setPhone(currentPhone);
  const phoneRegExp = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;

  if (!phoneRegExp.test(phone)) {
    const phoneMessage= "올바른 형식이 아닙니다!";
    return {phoneMessage, bool: false}
  } else {
    const phoneMessage = "사용 가능한 번호입니다:-)";
    return {phoneMessage, bool: true}
  }
};