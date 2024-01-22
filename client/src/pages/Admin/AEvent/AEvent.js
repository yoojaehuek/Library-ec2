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

const AEvent = () => {
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

  const fetchEventData = () => {
    axios
      .get(`${API_URL}/api/event`)
      .then((res) => {
        setAxiosResult(res.data);        
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEditClick = (book) => {
    setEditEventId(event.event_id);
    setSelectedEvent(event);
    setEventTitle(event.event_title);
    setEventImgurl(event.event_img_url);
    setEventStatus(event.event_status);
    setEventStartDate(event.event_start_date);
    setEventEndDate(event.event_end_date);
    setEventMaxApplicants(event.event_max_applicants);
  };

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setEventTitle('');
    setEventImgurl('');
    setEventStatus('');
    setEventStartDate('');
    setEventEndDate('');
    setEventMaxApplicants('');
    // setImageUrl(''); // 이미지 URL 초기화
  }
  

  const handleSaveEdit = () => {
    if (editBookId) {
      const updatedItem = {
        // book_name: bookName,
        // book_img_url: bookImgurl,
        // book_author: bookAuthor,
        // book_publisher: bookPublisher,
        // book_genre: bookGenre,
        // book_availability: bookAvailability,
        // book_description: bookDescription,
        // book_ISBN: bookISBN,
        event_title: eventTitle,
        event_img_url: eventImgurl,
        event_status: eventStatus,
        event_start_date: eventStartDate,
        event_end_date: eventEndDate,
        event_max_applicants: eventMaxApplicants,
      };
  
  
      console.log('update:', updatedItem);
      const userConfirmed = window.confirm('수정하시겠습니까?');
  
      if (userConfirmed) {
        console.log(editEventId)
        axios
          .patch(`${API_URL}/api/event/${editEventId}`, updatedItem)
          .then(() => {
            alert('수정되었습니다.');
            fetchEventData(); // 데이터 갱신
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
        .delete(`${API_URL}/api/event/${eventId}`)
        .then(() => {
          alert('삭제되었습니다.');
          fetchEventData(); // 데이터 갱신
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
};