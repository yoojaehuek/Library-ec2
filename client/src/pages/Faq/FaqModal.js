import React, { useState } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FaqModal = ({ isOpen, onClose, onSubmit, categories }) => {
  const [newPost, setNewPost] = useState({ category: '', title: '', content: '', author: '' });

  const handleSubmit = () => {
    if (newPost.category && newPost.title && newPost.content && newPost.author) {
      onSubmit(newPost);
      onClose();
    } else {
      alert('필수 입력.');
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
          <Select value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}>
            {categories.filter(category => category !== '전체')
            .map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="제목"
          fullWidth
          margin="normal"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <TextField
          label="내용"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <TextField
          label="작성자"
          fullWidth
          margin="normal"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
        />
        <Button variant="contained" onClick={handleSubmit}>
          글 등록
        </Button>
      </Box>
    </Modal>
  );
};

export default FaqModal;
