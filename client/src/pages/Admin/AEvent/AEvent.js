import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config/contansts';
// import { styled } from '@mui/material/styles';
// import Tooltip from '@mui/material/Tooltip';
// import Stack from '@mui/material/Stack';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DatePicker from 'react-datepicker';
import Calendar from '../../../components/Calendar/index.tsx';

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import {
  Tooltip,
  Stack,
  styled,
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

} from '@mui/material';

const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a href="https://mui.com/x/introduction/licensing/#pro-plan">
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

const AEvent = () => {
  const [axiosResult, setAxiosResult] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEventId, setEditEventId] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventImgurl, setEventImgurl] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventMaxApplicants, setEventMaxApplicants] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    fetchEventData();
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

  const handleEditClick = (event) => {
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
    if (editEventId) {
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

  const handleDelete = (eventId) => {
    const userConfirmed = window.confirm('삭제하시겠습니까?');
  
    if (userConfirmed) {
      axios
        .delete(`${API_URL}/api/event/${eventId}`)
        .then(() => {
          alert('삭제되었습니다.');
          fetchEventData(); // 데이터 갱신
          setFilteredBooks(filteredBooks.filter(event => event.event_id !== eventId)); // filteredBooks 업데이트
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
      setEventImgurl(res.data.eventImgurl)
    } catch (error) {
      console.error("에러발생: ", error);
    }
  };


  const handleAdd = () => {
    const createItem = {
      // book_name: bookName,
      // book_img_url: imageUrl,
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
    

    const userConfirmed = window.confirm('추가하시겠습니까?');
    if (userConfirmed) {
      axios
        .post(`${API_URL}/api/event`, createItem)
        .then(() => {
          alert('추가되었습니다.');
          fetchEventData();
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
    setEventTitle('');
    setEventStatus('');
    setEventStartDate('');
    setEventEndDate('');
    setEventMaxApplicants('');
  };
  const renderEvents = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const eventsToRender = filteredBooks.length > 0 ? filteredBooks : axiosResult;
    // const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return eventsToRender.slice(startIndex, endIndex).map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.event_id}</TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" ,whiteSpace: "nowrap",}}>{item.event_title}</TableCell>
        <TableCell>  
          <img
            src={ API_URL + item.event_img_url}
            alt={item.event_title}
            style={{ width: '80px', height: '120px' }}
          />
        </TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" ,whiteSpace: "nowrap",}}>{item.event_status}</TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px" ,whiteSpace: "nowrap",}} >{item.event_start_date}</TableCell>
        <TableCell>
        </TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px" ,whiteSpace: "nowrap",}}>{item.event_end_date}</TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" ,whiteSpace: "nowrap"}}>{item.event_max_applicants }</TableCell>
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>표지</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>시작일</TableCell>
              <TableCell>종료일</TableCell>
              <TableCell>신청가능인원</TableCell>
              <TableCell>작성시간</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >{renderEvents()}</TableBody>
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
        <DialogTitle>이벤트 추가</DialogTitle>
        <DialogContent>
        <TextField
            label="이벤트 이름"
            value={eventTitle}
            fullWidth
            margin="normal"
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <InputLabel>이미지 업로드</InputLabel>
          {/* <form method="post" name='accountFrm' action={`${API_URL}/api/bannerimg`} encType='multipart/form-data'> */}
            <Input
              type="file"
              // action={`${API_URL}/api/bannerimg`}
              accept="image/*"
              name='eventimg'
              onChange={onChangeImage}
            />
            {/* <Input type='submit' value='확인' /> */}
          {/* </form> */}
          {eventImgurl && (
            <img
              src={ API_URL + eventImgurl}
              alt="Banner"
              style={{ width: '100%', height:"500px", marginTop: '10px' }}
            />
          )}                    
          <FormControl fullWidth margin="normal">
            <InputLabel>이벤트 상태</InputLabel>
            <Select
              label="이벤트 상태"
              value={eventStatus}
              getDate={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}              
            >
              <MenuItem value="1">always</MenuItem>
              <MenuItem value="2">ongoing</MenuItem>
              <MenuItem value="3">expired</MenuItem>
            </Select>
          </FormControl>          
          <TextareaAutosize
            value={eventMaxApplicants}
            onChange={(e) => setEventMaxApplicants(e.target.value)}
            label="이벤트 신청 가능 인원"
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
          <Calendar
            selectedDate={eventStartDate} setSelectedDate={setEventStartDate}
            value={eventStartDate}
            onChange={(e) => setEventStartDate(e.target.value)}
            label="이벤트 시작일"
          />
          <Calendar
            selectedDate={eventEndDate} setSelectedDate={setEventEndDate}
            value={eventEndDate}
            onChange={(e) => setEventEndDate(e.target.value)}
            label="이벤트 시작일"
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
            label="이벤트 이름"
            value={eventTitle}
            fullWidth
            margin="normal"
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <InputLabel>이미지 업로드</InputLabel>
          {/* <form method="post" name='accountFrm' action={`${API_URL}/api/bannerimg`} encType='multipart/form-data'> */}
            <Input
              type="file"
              // action={`${API_URL}/api/bannerimg`}
              accept="image/*"
              name='eventimg'
              onChange={onChangeImage}
            />
            {/* <Input type='submit' value='확인' /> */}
          {/* </form> */}
          {eventImgurl && (
            <img
              src={ API_URL + eventImgurl}
              alt="Banner"
              style={{ width: '100%', height:"500px", marginTop: '10px' }}
            />
          )}                    
          <FormControl fullWidth margin="normal">
            <InputLabel>이벤트 상태</InputLabel>
            <Select
              label="이벤트 상태"
              value={eventStatus}
              onChange={(e) => setEventStatus(e.target.value)}
            >
              <MenuItem value="1">always</MenuItem>
              <MenuItem value="2">ongoing</MenuItem>
              <MenuItem value="3">expired</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle1" gutterBottom>
            줄거리
          </Typography>
          <TextareaAutosize
            value={eventMaxApplicants}
            onChange={(e) => setEventMaxApplicants(e.target.value)}
            label="이벤트 신청 가능 인원"
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
          <Calendar
            value={eventStartDate}
            onChange={(e) => setEventStartDate(e.target.value)}
            label="이벤트 시작일"
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

export default AEvent;

