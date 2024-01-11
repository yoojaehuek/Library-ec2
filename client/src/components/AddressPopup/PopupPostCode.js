import React from 'react';
import DaumPostcode from "react-daum-postcode";
const PopupPostCode = (props) => {
	  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.jibunAddress;
        let extraAddress = ''; 

        // if (data.addressType === 'R') {
        //   if (data.bname !== '') {
        //     extraAddress += data.bname;
        //   }
        //   if (data.buildingName !== '') {
        //     extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        //   }
        //   fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        // }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        props.onSelectAddress(fullAddress);
        props.onClose();
    }
    const containerStyle = {
      position: 'fixed',
      top: '50%', // 세로 중앙
      left: '50%', // 가로 중앙
      transform: 'translate(-50%, -50%)', // 가운데 정렬
      zIndex: "9999"
    };
    const postCodeStyle = {
      border: '1px solid #000',
      width: '600px',
      height: '600px',
    };
    const closeButtonStyle = {
      position: 'absolute',
      top: '-50px', // 예시로 상단에서 10px 떨어진 위치에 배치
      right: '0px', // 예시로 오른쪽에서 10px 떨어진 위치에 배치
      padding:'10px',
      fontWeight: 'bold',
      fontSize:'20px'
    };
    const bg= {
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      backgroundColor:"gray",
      border:"1px solid #red",
      left: "0",
      top: "0",
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: "9998"
    }

    return(
      <>
        <div id='bg' style={bg}></div>
        <div style={containerStyle}>
          <div style={postCodeStyle}>
            {/* DaumPostcode component for address search */}
            <DaumPostcode style={{ width: '100%', height: '100%' }} onComplete={handlePostCode} />
    
            {/* 닫기 버튼 */}
            <button type="button" onClick={() => props.onClose()} style={closeButtonStyle} className="postCode_btn">
              닫기
            </button>
          </div>
        </div>
      </>
    
    )
}

export default PopupPostCode;