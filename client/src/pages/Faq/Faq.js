import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography, Pagination, TextField, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FaqModal from './FaqModal';

const categories = ['1', '2', '3'];

const faqData = [
  { id: '1', category: '1', question: '1', answer: '1', author: '1', date: '2024-01-08' },
  { id: '2', category: '2', question: '2', answer: '2', author: '2', date: '2024-01-09' },
  { id: '3', category: '3', question: '3', answer: '3', author: '3', date: '2024-01-10' },
];

const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 3;

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreate = (newPost) => {
    console.log('New:', newPost);
    setIsModalOpen(false);
  };

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.category === selectedCategory &&
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaqs = filteredFaqs.slice(startIndex, endIndex);

  return (
    <div>
      <Box display="flex" alignItems="center" mb={2}>
        <FormControl>
          <InputLabel>카테고리</InputLabel>
          <Select value={selectedCategory} onChange={handleChangeCategory}>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </Box>
      <RadioGroup value={selectedCategory} onChange={handleChangeCategory} row>
        {categories.map((category) => (
          <FormControlLabel key={category} value={category} control={<Radio />} label={category} />
        ))}
      </RadioGroup>
      <Box mt={2}>
        {currentFaqs.map((faq, index) => (
          <Link to={`/faq/${faq.id}`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" border={1} p={2} borderRadius={4}>
              <Typography variant="body1">{faq.category}</Typography>
              <Typography variant="body1">{faq.question}</Typography>
              <Typography variant="body1">{faq.author}</Typography>
              <Typography variant="body1">{faq.date}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="contained" onClick={handleOpenModal}>
          글쓰기
        </Button>
      </Box>
      <FaqModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
        categories={categories}
      />
    </div>
  );
};

export default Faq;