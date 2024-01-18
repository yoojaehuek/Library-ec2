import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './Pagination.scss';

// total(데이터 총 갯수), limit(한 페이지에 보여줄 갯수)
const Pagination = ({ total, limit, page, setPage, getData, noPrev }) => {
  const [btnActive, setBtnActive] = useState(""); // 현재 페이지 활성화 여부
  const numPages = Math.ceil(total / limit); // 총 페이지 수는 올림해야 함

  const hadlePageBtn = (e, i) => {
    console.log(e.target.value);
    setBtnActive(e.target.value);
    setPage(i + 1);
  };

  const handleNext = (page) => {
    getData();
    // setBtnActive(page);
    setPage(page+1)
  }

  const handlePrevious = (page) => {
    getData('DESC');
    // setBtnActive(page);
    setPage(page+1)
  }

  return (
    <div className="pagination-container-kjh">
      <button onClick={() => handlePrevious(0)} disabled={noPrev}>
        <IoIosArrowBack />
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button 
            key={i + 1}
            value={i}
            className={i == btnActive ? "active" : ""} 
            onClick={(e) => hadlePageBtn(e, i)}
          >
            ㅁ
          </button>
          // <PageBtn
          //   value={i}
          //   key={i + 1}
          //   {/*현재 페이지 비활성화하기 위해 클래스명 지정*/}
          //   className={i === btnActive ? "active" : ""} 
          //   onClick={(e) => hadlePageBtn(e, i)}
          //   aria-current={page === i + 1 ? "page" : null}
          // >
          //   {i + 1}
          // </PageBtn>
        ))
      }
      {/* <button onClick={() => setPage(page + 1)} disabled={page === numPages} > */}
      <button onClick={() => handleNext(0)} >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;