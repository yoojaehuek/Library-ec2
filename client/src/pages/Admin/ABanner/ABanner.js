import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/contansts';
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
} from '@mui/material';

const ABanner = () => {
  const [axiosResult, setAxiosResult] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editBannerId, setEditBannerId] = useState(null);
  const [bannerImg, setBannerImg] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerDescription, setBannerDescription] = useState('');

  const [title, setEditedType] = useState('image');

  useEffect(() => {
    fetchSliderData();
  }, []);

  const fetchSliderData = () => {
    axios
      .get(`${API_URL}/api/banner`)
      .then((res) => {
        console.log(res.data);
        setAxiosResult(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEdit = (banner_id) => {
    setEditBannerId(banner_id);
    console.log("Edit Banner ID:", banner_id); // 디버깅을 위한 라인 추가
    setOpenEditDialog(true);
    fetchBannerDetails(banner_id);
  };

  const fetchBannerDetails = (banner_id) => {
    axios
      .get(`${API_URL}/api/banner/${banner_id}`)
      .then((res) => {
        console.log("Banner Details:", res.data); // 디버깅을 위한 라인 추가
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
        title: bannerTitle,
        content_url: bannerImg,
        description: bannerDescription,
      };
      console.log(updatedItem);
      const userConfirmed = window.confirm('수정하시겠습니까?');
  
      if (userConfirmed) {
        axios
          .patch(`${API_URL}/api/banner/${editBannerId}`, updatedItem)
          .then(() => {
            alert('수정되었습니다.');
            fetchSliderData(); // 데이터 갱신
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


  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image URL</TableCell>
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
                <TableCell>{item.banner_img_url}</TableCell>
                <TableCell>{item.banner_title}</TableCell>
                <TableCell>{item.banner_description}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.updatedAt}</TableCell>
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
                    // onClick={() => handleDelete(item.banner_id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
          <TextField
            label="이미지"
            value={bannerImg}
            onChange={(e) => setBannerImg(e.target.value)}
            fullWidth
            margin="normal"
          />
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
