import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import {API_URL} from '../../config/contansts'
import axios from 'axios'

const FaqDetail = () => {
  const [detailfaq, setDetailFaq] = useState('');
  const {id} = useParams();
  console.log(id);
  useEffect(()=>{
    axios.get(`${API_URL}/api/faq/${id}`)
    .then((res)=>{
      setDetailFaq(res.data);
    }) .catch((e)=>{
      console.error(e);
    })
  },[]);

  // if (!faq) {
  //   return <div>왜 안나오세요 ㅋㅋㅋ</div>;
  // }

  return (
    <Box>
      <Typography variant="h4">{detailfaq.question}</Typography>
      <Typography variant="body1">{detailfaq.category}</Typography>
      <Typography variant="body1">{detailfaq.author}</Typography>
      <Typography variant="body1">{detailfaq.date}</Typography>
      <Typography variant="body1">{detailfaq.answer}</Typography>
    </Box>
  );
};

export default FaqDetail;
