import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config/contansts';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Calendar from '../../../components/Calendar/index.tsx';
import { TbTilde } from "react-icons/tb";
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
  // const [imageUrl, setImageUrl] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventMaxApplicants, setEventMaxApplicants] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('이벤트 추가');
  const [saveButtonText, setSaveButtonText] = useState('추가');
  const itemsPerPage = 5;

  const handleOpenDialog = (isEdit, event) => {
    if(isEdit) {
      if(event.event_status == 'always'){
        setEventStatus(1);
      } else if (event.event_status == 'ongoing'){
        setEventStatus(2);
      } else {
        setEventStatus(3);
      }
      setEditEventId(event.event_id);
      setSelectedEvent(event);
      setEventTitle(event.event_title);
      setImageUrl(event.event_img_url);      
      setEventStartDate(new Date(event.event_start_date));
      setEventEndDate(new Date(event.event_end_date));
      setEventMaxApplicants(event.event_max_applicants);
      setDialogTitle('이벤트 수정');
      setSaveButtonText('저장');
    } else {
      setEventTitle('');
      setImageUrl('');
      setEventStatus('');
      setEventStartDate('');
      setEventEndDate('');
      setEventMaxApplicants('');
      setDialogTitle('이벤트 추가');
      setSaveButtonText('추가');
    }

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEventTitle('');
    setImageUrl('');
    setEventStatus('');
    setEventStartDate('');
    setEventEndDate('');
    setEventMaxApplicants('');
    setDialogTitle('이벤트 추가');
    setSaveButtonText('추가');
  };

  const handleSave = () => {

    const createItem = {
      event_title: eventTitle,
      event_img_url: imageUrl,
      event_status: eventStatus,
      event_start_date: eventStartDate,
      event_end_date: eventEndDate,
      event_max_applicants: eventMaxApplicants,

    };
    
    const userConfirmed = window.confirm(`${saveButtonText}하시겠습니까?`);
    if (userConfirmed) {
      if (saveButtonText == "저장") {
        axios
          .patch(`${API_URL}/api/event/${editEventId}`, createItem)
          .then(() => {
            alert('수정되었습니다.');
            fetchEventData();
            handleCloseDialog();
          })
          .catch((err) => {
            console.error(err);
            alert('수정에 실패했습니다.');
          });
      
      } else if (saveButtonText == "추가"){        
          axios
            .post(`${API_URL}/api/event`, createItem)
            .then(() => {
              alert('추가되었습니다.');
              fetchEventData();
              handleCloseDialog();
            })
            .catch((err) => {
              console.error(err);
              alert('추가에 실패했습니다.');
          });
      }
    }
  }

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
    console.log("upload/index.js/onChangeImage() info.file: ", info.file);

    console.log('info', info.target.files[0]);
    const file = info.target.files[0];

    try {
      const formData = new FormData();
      formData.append('eventimg', file);
  
      const res = await axios.post(`${API_URL}/api/eventimg`, formData);
      console.log("res: ", res);
      setImageUrl(res.data.imageUrl)
    } catch (error) {
      console.error("에러발생: ", error);
    }
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
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px" ,whiteSpace: "nowrap",}}>{item.event_end_date}</TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" ,whiteSpace: "nowrap"}}>{item.event_max_applicants }</TableCell>
        <TableCell>{item.created_at}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog(true, item)}
          >
            수정
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(item.event_id)}
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
            onClick={() => handleOpenDialog(false)}
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
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
          {imageUrl && (
            <img
              src={ API_URL + imageUrl}
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
          <TextareaAutosize
            value={eventMaxApplicants}
            onChange={(e) => setEventMaxApplicants(e.target.value)}
            label="이벤트 신청 가능 인원"            
            style={{
              width: '97%',
              resize: 'none',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            placeholder='이벤트 신청 가능 인원(숫자로 적어주세요)'
          />
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10vw"
          }}>      
            <label>시작일</label>         
            <label>종료일</label>
          </div> 
          <div className="calendarcont" 
            style={{
            display: "flex",
            gap: "1vw",
            justifyContent: "center"
            }}>        
          <Calendar
            selectedDate={eventStartDate}
            setSelectedDate={setEventStartDate}
            value={eventStartDate}
            onChange={(date) => setEventStartDate(date)}
            label="이벤트 시작일"            
          />
          <TbTilde style={{
            marginTop: "1vw"
          }}/>
          <Calendar
            selectedDate={eventEndDate}
            setSelectedDate={setEventEndDate}
            value={eventEndDate}
            onChange={(date) => setEventEndDate(date)}
            label="이벤트 종료일"
          />
          </div> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleSave} color="primary">
            {saveButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AEvent;

