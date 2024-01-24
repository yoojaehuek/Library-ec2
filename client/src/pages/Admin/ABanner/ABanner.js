import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/contansts';
import Fab from '@mui/material/Fab';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Input,
  Pagination,
} from '@mui/material';

const ABanner = () => {
  const [axiosResult, setAxiosResult] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editBannerId, setEditBannerId] = useState(null);
  const [bannerImg, setBannerImg] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerDescription, setBannerDescription] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [newbannerImg, setnewBannerImg] = useState('');
  const [newbannerTitle, setnewBannerTitle] = useState('');
  const [newbannerDescription, setnewBannerDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;



  useEffect(() => {
    fetchBannerData();
  }, [currentPage]);

  const fetchBannerData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    axios
      .get(`${API_URL}/api/banner`)
      .then((res) => {
        setAxiosResult(res.data.slice(startIndex, endIndex));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setBannerTitle('');
    setImageUrl('');
    setBannerDescription('');
  };

  const handleEdit = (banner_id) => {
    setEditBannerId(banner_id);
    setOpenEditDialog(true);
    fetchBannerDetails(banner_id);
  };

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setnewBannerTitle('');
    setnewBannerImg('');
    setnewBannerDescription('');
    setImageUrl(''); // 이미지 URL 초기화
  }
  

  const fetchBannerDetails = (banner_id) => {
    axios
      .get(`${API_URL}/api/banner/${banner_id}`)
      .then((res) => {
        const bannerDetails = res.data;
        setBannerTitle(bannerDetails.banner_title);
        setBannerImg(bannerDetails.banner_img_url);
        setBannerDescription(bannerDetails.banner_description);
      })
      .catch((err) => {
        console.error(`에러. ${banner_id}:`, err);
      });
  };

  const handleSave = () => {
    if (editBannerId) {
      const updatedItem = {
        banner_title: bannerTitle,
        banner_img_url: imageUrl,
        banner_description: bannerDescription,
      };
  
      // 강제로 상태 업데이트를 동기적으로 수행
      setBannerTitle(updatedItem.title);
      setBannerImg(updatedItem.imageUrl);
      setBannerDescription(updatedItem.description);
  
      console.log('update:', updatedItem);
      const userConfirmed = window.confirm('수정하시겠습니까?');
  
      if (userConfirmed) {
        console.log(editBannerId)
        axios
          .patch(`${API_URL}/api/banner/${editBannerId}`, updatedItem)
          .then(() => {
            alert('수정되었습니다.');
            fetchBannerData(); // 데이터 갱신
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

  const handleDelete = (banner_id) => {
    const userConfirmed = window.confirm('삭제하시겠습니까?');

    if (userConfirmed) {
      axios
        .delete(`${API_URL}/api/banner/${banner_id}`)
        .then(() => {
          alert('삭제되었습니다.');
          fetchBannerData(); // 데이터 갱신
          window.location.reload();
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
      formData.append('bannerimg', file);
  
      const res = await axios.post(`${API_URL}/api/bannerimg`, formData);
      console.log("res: ", res);
      setImageUrl(res.data.imageUrl)
    } catch (error) {
      console.error("에러발생: ", error);
    }
    

    // // info.file이 정의되어 있는지 확인
    // if (info.file && info.file.status === "uploading") {
    //     return;
    // }

    // // 파일이 업로드 완료 되었을 때
    // if (info.file && info.file.status === "done") {
    //     const response = info.file.response;
    //     console.log(response);
    //     const imageUrl = response.imageUrl;
    //     // 받은 이미지경로를 imageUrl에 넣어줌
    //     setImageUrl(imageUrl); //이미지 선택하면 이미지 url넣음
    // }
};



  const handleAdd = () => {
    const createItem = {
      banner_title: newbannerTitle,
      banner_img_url: imageUrl,
      banner_description: newbannerDescription,
    };
    

    const userConfirmed = window.confirm('추가하시겠습니까?');
    if (userConfirmed) {
      axios
        .post(`${API_URL}/api/banner`, createItem)
        .then(() => {
          alert('추가되었습니다.');
          fetchBannerData();
          handleCloseAddDialog();

        })
        .catch((err) => {
          console.error(err);
          alert('추가에 실패했습니다.');
        });
        
    }
  };



  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "75vw", margin: "auto", overflowX: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>설명</TableCell>
              <TableCell>작성 시간</TableCell>
              <TableCell>업데이트 시간</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {axiosResult.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.banner_id}</TableCell>
                <TableCell>
                  <img
                    src={ API_URL + item.banner_img_url}
                    alt={item.banner_title}
                    style={{ width: '100px', height: '100px' }}
                  />
                </TableCell>
                <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px",whiteSpace: "nowrap",}}>{item.banner_title}</TableCell>
                <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px",whiteSpace: "nowrap",}}>{item.banner_description}</TableCell>
                <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px",whiteSpace: "nowrap",}}>{item.createdAt}</TableCell>
                <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px",whiteSpace: "nowrap",}}>{item.updatedAt}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(item.banner_id)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item.banner_id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={handleOpenAddDialog}
          >
            <AddIcon />
          </Fab>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(axiosResult.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        sx={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
      />
       {/* 추가하기 다이얼로그 */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>배너 추가</DialogTitle>
        <DialogContent>
          <TextField
            label="제목"
            value={newbannerTitle}
            onChange={(e) => setnewBannerTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <InputLabel>이미지 업로드</InputLabel>
          {/* <form method="post" name='accountFrm' action={`${API_URL}/api/bannerimg`} encType='multipart/form-data'> */}
            <Input
              type="file"
              // action={`${API_URL}/api/bannerimg`}
              accept="image/*"
              name='bannerimg'
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
            label="설명"
            value={newbannerDescription}
            onChange={(e) => setnewBannerDescription(e.target.value)}
            fullWidth
            margin="normal"
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

      {/* Edit Banner Modal */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>배너 수정</DialogTitle>
        <DialogContent>
          <TextField
            label="제목"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <InputLabel>이미지 업로드</InputLabel>
          {/* <form method="post" name='accountFrm' action={`${API_URL}/api/bannerimg`} encType='multipart/form-data'> */}
            <Input
              type="file"
              // action={`${API_URL}/api/bannerimg`}
              accept="image/*"
              name='bannerimg'
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
            label="설명"
            value={bannerDescription}
            onChange={(e) => setBannerDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleSave} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ABanner;
