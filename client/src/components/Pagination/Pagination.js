import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './Pagination.scss';

// total(데이터 총 갯수), limit(한 페이지에 보여줄 갯수)
const Pagination = ({ total, limit, page, setPage, getData, noPrev, noNext, startEvent_id, data_limit}) => {
  const [btnActive, setBtnActive] = useState(""); // 현재 페이지 활성화 여부
  const [pageHeadNum, setPageHeadNum] = useState(1); // 현재 페이지 활성화 여부
  const numPages = Math.ceil(total / limit); // 총 페이지 수는 올림해야 함
  // const [pageStartNum, setPageStartNum] = useState(Math.floor(startEvent_id/data_limit) * Math.floor(data_limit/limit)); 
  // console.log("pageStartNum: ", pageStartNum);

  const hadlePageBtn = (e, i) => {
    console.log(e.target.value);
    setBtnActive(e.target.value);
    setPage(i + 1);
  };

  const handleNext = (page) => {
    getData();
    setBtnActive(page);
    setPage(page+1);
    setPageHeadNum(pageHeadNum+1);
  }

  const handlePrevious = (page) => {
    getData('DESC');
    setBtnActive(page);
    setPage(page+1);
    setPageHeadNum(pageHeadNum-1);
  }

  return (
    <div className="pagination-container-kjh">
      {!noPrev && 
        <button onClick={() => handlePrevious(0)} disabled={noPrev}>
          <IoIosArrowBack />
        </button>
      }
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button 
            key={i + 1}
            value={i}
            className={i == btnActive ? "active" : ""} 
            onClick={(e) => hadlePageBtn(e, i)}
          >
            {pageHeadNum*(data_limit/limit)-(data_limit/limit-1)+i}
          </button>
        ))
      }
      {!noNext && 
        <button onClick={() => handleNext(0)} disabled={noNext} >
        <IoIosArrowForward />
        </button>
      }
    </div>
  );
};

export default Pagination;