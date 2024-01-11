import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { API_URL } from "../../config/contansts";

const FaqModal = ({ isOpen, onClose, onSubmit, categories }) => {
  const [newPost, setNewPost] = useState({
    user_id: '123@naver.com',
    faq_password: '',
    faq_tags: '',
    faq_title: '',
    faq_content: '',
    faq_status: 0,
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    if (isOpen) {
      setNewPost({
        user_id: 'i1004902@naver.com',
        faq_password: '',
        faq_tags: '',
        faq_title: '',
        faq_content: '',
        faq_status: 0,
        created_at: new Date().toISOString(),
      });
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      if (newPost.faq_tags && newPost.faq_title && newPost.faq_content) {
        const faqData = {
          user_id: newPost.user_id,
          faq_password: newPost.faq_password,
          faq_tags: newPost.faq_tags,
          faq_title: newPost.faq_title,
          faq_content: newPost.faq_content,
          faq_status: newPost.faq_status,
          created_at: newPost.created_at,
        };
        const res = await axios.post(`${API_URL}/api/faq`, faqData);
        onSubmit(res.data);
        console.log(res.data);
        onClose();
      } else {
        alert('필수 입력.');
      }
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>카테고리</InputLabel>
          <Select value={newPost.faq_tags} onChange={(e) => setNewPost({ ...newPost, faq_tags: e.target.value })}>
            {categories.filter(faq_tags => faq_tags !== '전체')
            .map((tags) => (
              <MenuItem key={tags} value={tags}>
                {tags}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="작성자"
          fullWidth
          margin="normal"
          value={newPost.user_id}
          onChange={(e) => setNewPost({ ...newPost, user_id: e.target.value })}
        />
        <TextField
          label="비밀번호"
          fullWidth
          margin="normal"
          value={newPost.faq_password}
          onChange={(e) => setNewPost({ ...newPost, faq_password: e.target.value })}
        />
        <TextField
          label="제목"
          fullWidth
          margin="normal"
          value={newPost.faq_title}
          onChange={(e) => setNewPost({ ...newPost, faq_title: e.target.value })}
        />
        <TextField
          label="내용"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={newPost.faq_content}
          onChange={(e) => setNewPost({ ...newPost, faq_content: e.target.value })}
        />
        <Button variant="contained" style={{ margin: "auto", display: "block", backgroundColor: 'green' }} onClick={handleSubmit}>
          글 등록
        </Button>
      </Box>
    </Modal>
  );
};

export default FaqModal;
