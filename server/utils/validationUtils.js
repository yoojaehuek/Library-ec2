const pattern_num = /[0-9]/;	// 숫자 
const pattern_eng = /[a-zA-Z]/;	// 문자 
const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크

function isString(value) { //문자열인지 확인
  return typeof(value) === 'string';
}

function isNonEmptyString(value) { //주어진 값이 비어있지 않은 문자열인지 확인
  return isString(value) && value.trim().length > 0;
}

function validateString(title) { 
    if (typeof(title) !== 'string') {
      return false; // 문자열이 아닌 경우
    }
  
    // 최소 길이 검증
    if (title.length < 1) {
      return false;
    }
  
    // 특정 문자가 포함되는지 확인
    if (!/^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]+$/.test(title)) {
      return false;
    }
  
    // 이스케이핑 수행
    const sanitizedTitle = escapeHTML(title);
  
    // 이스케이핑 이후에도 제목이 유효한지 확인
    return sanitizedTitle.length > 0;
}

function escapeHTML(input) { //HTML 이스케이핑을 수행하는 함수
  return input.replace(/[&<>"']/g, function(match) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[match];
  });
}

function isValidGenre(genre) {
  const allowedGenres = ['총류', '철학', '종교', '사회과학','자연과학','기술과학', '예술', '언어', '문학','역사']; //장르 넣기
  const cleanedGenre = genre.trim().toLowerCase(); // 공백 및 대소문자에 대한 처리

  return allowedGenres.includes(cleanedGenre);
}

module.exports = {
  isString,
  isNonEmptyString,
  validateString,
  escapeHTML,
  isValidGenre,
};