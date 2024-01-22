import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config/contansts';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  TextareaAutosize,
  Typography,
  Select,
  MenuItem,
  Fab,
  Input,
  FormControl,
  InputLabel,

  Pagination,
  ButtonGroup,
} from '@mui/material';

const ABook = () => {
  const [axiosResult, setAxiosResult] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editBookId, setEditBookId] = useState(null);
  const [bookName, setBookName] = useState('');
  const [bookImgurl, setBookImgurl] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookPublisher, setBookPublisher] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookAvailability, setBookAvailability] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [bookISBN, setBookISBN] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = () => {
    axios
      .get(`${API_URL}/api/book`)
      .then((res) => {
        setAxiosResult(res.data);
        const uniqueGenres = [...new Set(res.data.map((book) => book.book_genre))];
        setGenres(uniqueGenres);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleGenreClick = (genre) => {
    const booksByGenre = axiosResult.filter((book) => book.book_genre === genre);
    setFilteredBooks(booksByGenre);
    setCurrentPage(1); // 장르를 바꿀 때 페이지를 1로 초기화
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEditClick = (book) => {
    setEditBookId(book.book_id);
    setSelectedBook(book);
    setBookName(book.book_name);
    setBookImgurl(book.book_img_url);
    setBookAuthor(book.book_author);
    setBookPublisher(book.book_publisher);
    setBookGenre(book.book_genre);
    setBookDescription(book.book_description);
    setBookISBN(book.book_ISBN);
    setBookAvailability(book.book_availability);
    setOpenEditDialog(true);
  };

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setBookName('');
    setBookAuthor('');
    setBookPublisher('');
    setBookGenre('');
    setBookDescription('');
    setBookISBN('');
    setBookAvailability('');
    setImageUrl(''); // 이미지 URL 초기화
  }
  

  const handleSaveEdit = () => {
    if (editBookId) {
      const updatedItem = {
        book_name: bookName,
        book_img_url: bookImgurl,
        book_author: bookAuthor,
        book_publisher: bookPublisher,
        book_genre: bookGenre,
        book_availability: bookAvailability,
        book_description: bookDescription,
        book_ISBN: bookISBN,
      };
  
  
      console.log('update:', updatedItem);
      const userConfirmed = window.confirm('수정하시겠습니까?');
  
      if (userConfirmed) {
        console.log(editBookId)
        axios
          .patch(`${API_URL}/api/book/${editBookId}`, updatedItem)
          .then(() => {
            alert('수정되었습니다.');
            fetchBookData(); // 데이터 갱신
            handleCloseEditDialog();
          })
          .catch((err) => {
            console.error(err);
            alert('수정에 실패했습니다.');
          });
      } else {
        return;
      }
    }
  };

  const handleDelete = (bookId) => {
    const userConfirmed = window.confirm('삭제하시겠습니까?');
  
    if (userConfirmed) {
      axios
        .delete(`${API_URL}/api/book/${bookId}`)
        .then(() => {
          alert('삭제되었습니다.');
          fetchBookData(); // 데이터 갱신
          setFilteredBooks(filteredBooks.filter(book => book.book_id !== bookId)); // filteredBooks 업데이트
        })
        .catch((err) => {
          console.error(err);
          alert('삭제에 실패했습니다.');
        });
    }
  };

  const onChangeImage = async (info) => {
    // 파일이 업로드 중일 때
    // console.log("upload/index.js/onChangeImage() info.file: ", info.file);

    console.log('info', info.target.files[0]);
    const file = info.target.files[0];

    try {
      const formData = new FormData();
      formData.append('bookimg', file);
  
      const res = await axios.post(`${API_URL}/api/bookimg`, formData);
      console.log("res: ", res);
      setImageUrl(res.data.imageUrl)
    } catch (error) {
      console.error("에러발생: ", error);
    }
  };


  const handleAdd = () => {
    const createItem = {
      book_name: bookName,
      book_img_url: imageUrl,
      book_author: bookAuthor,
      book_publisher: bookPublisher,
      book_genre: bookGenre,
      book_availability: bookAvailability,
      book_description: bookDescription,
      book_ISBN: bookISBN,
    };
    

    const userConfirmed = window.confirm('추가하시겠습니까?');
    if (userConfirmed) {
      axios
        .post(`${API_URL}/api/book`, createItem)
        .then(() => {
          alert('추가되었습니다.');
          fetchBookData();
          handleCloseAddDialog();
        })
        .catch((err) => {
          console.error(err);
          alert('추가에 실패했습니다.');
        });
        
    }
  };


  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setOpenAddDialog(false);
    setBookName('');
    setBookAuthor('');
    setBookPublisher('');
    setBookGenre('');
    setBookDescription('');
    setBookISBN('');
    setBookAvailability('');
    setImageUrl(''); // 이미지 URL 초기화
  };

  const renderBooks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToRender = filteredBooks.length > 0 ? filteredBooks : axiosResult;

    return booksToRender.slice(startIndex, endIndex).map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.book_id}</TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" ,whiteSpace: "nowrap",}}>{item.book_name}</TableCell>
        <TableCell>  
          <img
            src={ API_URL + item.book_img_url}
            alt={item.book_title}
            style={{ width: '80px', height: '120px' }}
          />
        </TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" ,whiteSpace: "nowrap",}}>{item.book_author}</TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px" ,whiteSpace: "nowrap",}} >{item.book_publisher}</TableCell>
        <TableCell>{item.book_genre}</TableCell>
        <TableCell>
          {item.book_availability === 1 ? "가능" : "불가능"}
        </TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px" ,whiteSpace: "nowrap",}}>{item.book_description}</TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" ,whiteSpace: "nowrap"}}>{item.book_ISBN}</TableCell>
        <TableCell>{item.created_at}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(item)}
          >
            수정
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(item.book_id)}
          >
            삭제
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div style={{ textAlign: 'center',maxWidth: "80vw", margin: "auto", overflowX: 'auto'  }}>
      <ButtonGroup>
        {genres.map((genre, index) => (
          <Button key={index} onClick={() => handleGenreClick(genre)}>
            {genre}
          </Button>
        ))}
      </ButtonGroup>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>표지</TableCell>
              <TableCell>저자</TableCell>
              <TableCell>출판사</TableCell>
              <TableCell>장르</TableCell>
              <TableCell>대출여부</TableCell>
              <TableCell>줄거리</TableCell>
              <TableCell>고유번호</TableCell>
              <TableCell>작성시간</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >{renderBooks()}</TableBody>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={handleOpenAddDialog}
          >
            <AddIcon/>
          </Fab>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredBooks.length > 0 ? filteredBooks.length / itemsPerPage : axiosResult.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
      />

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>책 추가</DialogTitle>
        <DialogContent>
        <TextField
            label="책 이름"
            value={bookName}
            fullWidth
            margin="normal"
            onChange={(e) => setBookName(e.target.value)}
          />
          <InputLabel>이미지 업로드</InputLabel>
          {/* <form method="post" name='accountFrm' action={`${API_URL}/api/bannerimg`} encType='multipart/form-data'> */}
            <Input
              type="file"
              // action={`${API_URL}/api/bannerimg`}
              accept="image/*"
              name='bookimg'
              onChange={onChangeImage}
            />
            {/* <Input type='submit' value='확인' /> */}
          {/* </form> */}
          {imageUrl && (
            <img
              src={ API_URL + imageUrl}
              alt="Banner"
              style={{ width: '100%', height:"500px", marginTop: '10px' }}
            />
          )}
          <TextField
            label="저자"
            value={bookAuthor}
            fullWidth
            margin="normal"
            onChange={(e) => setBookAuthor(e.target.value)}
          />
          <TextField
            label="출판사"
            value={bookPublisher}
            fullWidth
            margin="normal"
            onChange={(e) => setBookPublisher(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>장르</InputLabel>
            <Select
              label='장르'
              value={bookGenre}
              onChange={(e) => setBookGenre(e.target.value)}
            >
              {genres.map((genre, index) => (
                <MenuItem key={index} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>대출여부</InputLabel>
            <Select
              label="대출여부"
              value={bookAvailability}
              onChange={(e) => setBookAvailability(e.target.value)}
            >
              <MenuItem value="1">대출 가능</MenuItem>
              <MenuItem value="0">대출 불가능</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle1" gutterBottom>
            줄거리
          </Typography>
          <TextareaAutosize
            value={bookDescription}
            onChange={(e) => setBookDescription(e.target.value)}
            label="줄거리"
            minRows={3} // 최소 높이 지정
            maxRows={10} // 최대 높이 지정
            style={{
              width: '97%',
              resize: 'vertical', // 수직 크기 조절만 가능하도록 설정
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <TextField
            label="고유번호"
            value={bookISBN}
            fullWidth
            margin="normal"
            onChange={(e) => setBookISBN(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleAdd} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>책 수정</DialogTitle>
        <DialogContent>
          <TextField
            label="책 이름"
            value={bookName}
            fullWidth
            margin="normal"
            onChange={(e) => setBookName(e.target.value)}
          />
          <InputLabel>이미지 업로드</InputLabel>
          {/* <form method="post" name='accountFrm' action={`${API_URL}/api/bannerimg`} encType='multipart/form-data'> */}
            <Input
              type="file"
              // action={`${API_URL}/api/bannerimg`}
              accept="image/*"
              name='bookimg'
              onChange={onChangeImage}
            />
            {/* <Input type='submit' value='확인' /> */}
          {/* </form> */}
          {imageUrl && (
            <img
              src={ API_URL + imageUrl}
              alt="Banner"
              style={{ width: '100%', height:"500px", marginTop: '10px' }}
            />
          )}
          <TextField
            label="저자"
            value={bookAuthor}
            fullWidth
            margin="normal"
            onChange={(e) => setBookAuthor(e.target.value)}
          />
          <TextField
            label="출판사"
            value={bookPublisher}
            fullWidth
            margin="normal"
            onChange={(e) => setBookPublisher(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>장르</InputLabel>
            <Select
              label='장르'
              value={bookGenre}
              onChange={(e) => setBookGenre(e.target.value)}
            >
              {genres.map((genre, index) => (
                <MenuItem key={index} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>대출여부</InputLabel>
            <Select
              label="대출여부"
              value={bookAvailability}
              onChange={(e) => setBookAvailability(e.target.value)}
            >
              <MenuItem value="1">대출 가능</MenuItem>
              <MenuItem value="0">대출 불가능</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle1" gutterBottom>
            줄거리
          </Typography>
          <TextareaAutosize
            value={bookDescription}
            onChange={(e) => setBookDescription(e.target.value)}
            label="줄거리"
            minRows={3} // 최소 높이 지정
            maxRows={10} // 최대 높이 지정
            style={{
              width: '97%',
              resize: 'vertical', // 수직 크기 조절만 가능하도록 설정
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <TextField
            label="고유번호"
            value={bookISBN}
            fullWidth
            margin="normal"
            onChange={(e) => setBookISBN(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ABook;
