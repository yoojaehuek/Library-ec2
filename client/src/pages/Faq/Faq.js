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
    const endpoint =
      selectedCategory === "전체" ? "/" : `/category/${selectedCategory}`;
    axios
      .get(`${API_URL}/api/faq${endpoint}`)
      .then((res) => {
        setFaqData(res.data);
        console.log(res.data);
        // setSelectedCategory('전체');
      })
      .catch((error) => console.error("에러:", error));
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

  const totalPages = Math.ceil(faqData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaqs = faqData.slice(startIndex, endIndex);

  return (
    <div style={{ maxWidth: "60vw", margin: "2vw auto" }}>
      <h1 style={{ textAlign: "center" }}>FAQ</h1>
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
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "2vw",
        }}
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
            to={`/faq/${faq.faq_id}`}
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              display="grid"
              gridTemplateColumns="1fr 2fr 1.2fr"
              alignItems="center"
              border={1}
              p={3}
              borderRadius={4}
              gap="16px"
            >
              <Typography variant="body1">{faq.tags}</Typography>
              <Typography variant="body1">{faq.title}</Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">{faq.User && faq.User.user_name}</Typography>
                {faq.status ? 
                <Typography variant="body1" style={{color: "green"}}>
                   답변완료
                </Typography> 
                : 
                <Typography variant="body1" style={{color: "red"}}>
                  답변 대기
                </Typography>}
                <Typography variant="body1">{faq.created_at}</Typography>
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
        <Button
          variant="contained"
          onClick={handleOpenModal}
          style={{ backgroundColor: "green" }}
        >
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
