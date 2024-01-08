import React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const FaqDetail = () => {
  const { faq } = useParams();

  if (!faq) {
    return <div>왜 안나오세요 ㅋㅋㅋ</div>;
  }

  return (
    <Box>
      <Typography variant="h4">{faq.question}</Typography>
      <Typography variant="body1">{faq.category}</Typography>
      <Typography variant="body1">{faq.author}</Typography>
      <Typography variant="body1">{faq.date}</Typography>
      <Typography variant="body1">{faq.answer}</Typography>
    </Box>
  );
};

export default FaqDetail;
