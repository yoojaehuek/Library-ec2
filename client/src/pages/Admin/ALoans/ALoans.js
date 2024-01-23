import { API_URL } from "../../../config/contansts";
import { useState, useEffect } from "react";
import axios from 'axios';
import Pagination from '../../../components/Pagination/Pagination.js';
import { FaPlus } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { FaBook } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import './ALoans.scss';
import { useNavigate } from "react-router-dom";

const ALoans = () => {
  const navigate = useNavigate()
  const [datas, setDatas] = useState([]); //받아온 데이터들
  const [endData_id, setEndData_id] = useState(0); //DB 다음 데이터 조회할때 어디서부터 읽을지 기준 값
  const [startData_id, setStartData_id] = useState(0); //DB 이전 데이터 조회할때 어디서부터 읽을지 기준 값
  const [data_limit, setData_limit] = useState(9); //DB조회할때 몇개 읽어 올지 값
  const [limit, setLimit] = useState(3); //한페이지에 몇개 보여줄지 값
  const [page, setPage] = useState(1); //현재 페이지
  const [lastPage, setLastPage] = useState(true); //마지막 페이지인지 bool값(다음 버튼 표시용)

  const [reRendering, setReRendering] = useState(true); //마지막 페이지인지 bool값(다음 버튼 표시용)
  const offset = (page - 1) * limit; // 데이터 시작 번호

  const [clickLoans, setClickLoans] = useState(); //클릭한 책


  const getData= async (PreviousOrNext) => {
    const endPoint = 
      PreviousOrNext && PreviousOrNext=='DESC' ? 
          `?data_id=${startData_id}&data_limit=${data_limit}&orderBy=DESC` 
        : 
          `?data_id=${endData_id}&data_limit=${data_limit}&orderBy=ASC`
      ;
    
    const res = await axios.get(`${API_URL}/api/loans/page${endPoint}`);
    console.log("불러온 데이터: ", res);
    console.log("불러온 데이터 개수: ", res.data.result.length);
    
    if (res.data.result.length >= 0) { //불러온 데이터가 0개 이상이면
      setDatas(res.data.result);
      setClickLoans(res.data.result[0]);
      if (res.data.result.length > 0) { //불러온 데이터가 0개 초과면 (이거 안하면 1개 남았을때 삭제해도 f5안하면 안없어짐)
        setLastPage(res.data.lastPage);
        setEndData_id(res.data.result[res.data.result.length-1].loans_id); 
        setStartData_id(res.data.result[0].loans_id); 
      }
    }
  }

  useEffect(()=> {
    getData();
  },[reRendering]);

  const handleReturnBook = async (data) => {
    try {
      const params = {
        loans_id: data.loans_id,
        book_id: data.Book.book_id
      };

      const res = await axios.delete(`${API_URL}/api/loans`, { params: params });
      console.log("삭제 후 res: ", res);
      setEndData_id(0);
      setReRendering(!reRendering);
    } catch (error) {
      console.error(error);
    }
  }

  const handleRenewLoan = async (loans) => {
    try {
      const res = await axios.patch(`${API_URL}/api/loans/renew/${loans.loans_id}`, {due_date: loans.due_date});
      console.log("연장 후 res: ", res);
      setEndData_id(0);
      setReRendering(!reRendering);
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div className="aloans-container-kjh">

      <div className="user-kjh">
        <div className="user-data-top-kjh">
          <div>
            <LuUser2 />
            <span>이용자 정보</span>
          </div>
          <FaPlus />
        </div>
        {clickLoans &&
          <div className="user-data-content-kjh">
            <LuUser2 />
            <div>
              {/* <h3> <label htmlFor="">이름: </label> {clickLoans.User.user_name}</h3> */}
              <div className="content-top-kjh">
                <h3>{clickLoans.User.user_name}</h3>
              </div>
              <p> <label htmlFor="">ID: </label> {clickLoans.User.user_email}</p>
              <p> <label htmlFor="">TEL: </label> {clickLoans.User.user_phone ? clickLoans.User.user_phone : "등록안함"}</p>
            </div>
          </div>
        }
      </div>

      <div className="book-kjh">
        {/* <p>{clickLoans && clickLoans.Book.book_name}</p> */}
        <div className="book-data-top-kjh">
          <div>
            <FaBook />
            <span>도서 정보</span>
          </div>
          <FaPlus />
        </div>
        {clickLoans &&
          <div className="book-data-content-kjh">
            <img src={API_URL+clickLoans.Book.book_img_url} alt="" />
            <div>
              <div className="content-top-kjh">
                <h3>{clickLoans.Book.book_name}</h3>
                <p>{clickLoans.Book.book_author}</p>
              </div>
              <p><label htmlFor="">출판사: </label>{clickLoans.Book.book_publisher}</p>
              <p><label htmlFor="">분류: </label>{clickLoans.Book.book_genre}</p>
              <p><label htmlFor="">ISBN: </label>{clickLoans.Book.book_ISBN}</p>
              {/* <p> <label htmlFor="">ID: </label> {clickLoans.User.user_email}</p>
              <p> <label htmlFor="">TEL: </label> {clickLoans.User.user_phone ? clickLoans.User.user_phone : "등록안함"}</p> */}
            </div>
          </div>
        }
      </div>

      <div className="loans-kjh">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>대출일자</TableCell>
                <TableCell>반납예정</TableCell>
                <TableCell>관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas && datas.slice(offset, offset + limit).map((data, index) => (
                <TableRow 
                  key={index}
                  onClick={()=>{setClickLoans(data);}}
                  className={clickLoans && clickLoans.loans_id == data.loans_id ? "rowActive" : ""}
                >
                  <TableCell>{data.loans_id}</TableCell>
                  <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" ,whiteSpace: "nowrap",}}>{data.Book.book_name}</TableCell>
                  <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" ,whiteSpace: "nowrap",}}>{data.loan_date}</TableCell>
                  <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px" ,whiteSpace: "nowrap",}}>{data.due_date}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReturnBook(data)}
                    >
                      반납
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleRenewLoan(data)}
                    >
                      연장
                    </Button>
                  </TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Pagination 
            total={datas.length}
            limit={limit}
            page={page}
            setPage={setPage}
            getData={getData}
            lastPage={lastPage}
            data_limit={data_limit}
          />
        </div>
      </div>
    </div>
  );
};

export default ALoans;