import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Pagination,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import FaqModal from "./FaqModal";
import { API_URL } from "../../config/contansts";
import axios from "axios";

const categories = ["전체", "사이트이용", "계정", "대출", "도서", "기타"];

const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/faq`)
      .then(res => {
        setFaqData(res.data);
        console.log(res.data);
        // setSelectedCategory('전체');
      })
      .catch(error => console.error('에러:', error));
  }, [selectedCategory]);

  const itemsPerPage = 5;

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
    console.log("New:", newPost);
    setIsModalOpen(false);
  };

  const filteredFaqs = faqData.filter((faq) => {
    if (selectedCategory === "전체") {
      return (
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return (
        faq.category === selectedCategory &&
        (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  });

  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaqs = filteredFaqs.slice(startIndex, endIndex);

  return (
    <div style={{ maxWidth: "60vw", margin: "2vw auto" }}>
      <h1 style={{ textAlign: 'center'}}>FAQ</h1>
      <Box
        display="flex"
        alignItems="center"
        mb={2}
        style={{ maxWidth: "50vw", margin: "0 auto" }}
      >
        <FormControl
          style={{ flex: 0.7, marginTop: "8px", marginRight: "10px" }}
        >
          <Select
            value={selectedCategory}
            onChange={handleChangeCategory}
            fullWidth
            style={{ width: "100%" }}
          >
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
          style={{ flex: 1.3 }}
        />
      </Box>
      <RadioGroup
        value={selectedCategory}
        onChange={handleChangeCategory}
        row
        style={{ display: "flex", justifyContent: "center", gap: "10px", margin: '2vw' }}
      >
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            value={category}
            control={<Radio style={{ color: "green" }} />}
            label={category}
          />
        ))}
      </RadioGroup>
      <Box mt={2} style={{ display: "grid", gap: "16px" }}>
        {currentFaqs.map((faq, index) => (
          <Link
            to={`/faq/${faq.id}`}
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              display="grid"
              gridTemplateColumns="1fr 2fr 1fr"
              alignItems="center"
              border={1}
              p={2}
              borderRadius={4}
              gap="16px"
            >
              <Typography variant="body1">{faq.category}</Typography>
              <Typography variant="body1">{faq.question}</Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">{faq.author}</Typography>
                <Typography variant="body1">{faq.date}</Typography>
              </div>
            </Box>
          </Link>
        ))}
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleOpenModal} style={{backgroundColor: "green"}}>
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
