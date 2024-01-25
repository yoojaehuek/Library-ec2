import React from 'react';
import { Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import DescriptionIcon from '@mui/icons-material/Description';

const StyledAmanual = styled('div')({
  padding: '3vw',
  border: '1px solid #ccc',
  borderRadius: '1vw',
  margin: '5vw auto',
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f8f8f8',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Title = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '25px',
  color: 'green',
  letterSpacing: '1px', 
  
});

const SubTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#666',
  marginTop: '20px',
});


const DownloadLink = styled('a')({
  textDecoration: 'none',
});

const DownloadButton = styled(Button)({
  fontSize: '1rem',
  padding: '10px 20px',
  marginTop: '20px',
  backgroundColor: 'red',
  color: '#fff',
  margin: '1vw',
  '&:hover': {
    backgroundColor: '#ff0000',
  },
});

const Amanual = () => {
  return (
    <StyledAmanual style={{ maxWidth: '40vw' }}>
      <Title gutterBottom>
        Manual
      </Title>
      <Typography>
        Library 사용 설명서
      </Typography>
      <SubTitle gutterBottom>
        Manual Download
      </SubTitle>
      <DownloadLink href="/library.pdf" download>
        <DownloadButton startIcon={<DescriptionIcon />}>
          pdf 다운로드
        </DownloadButton>
      </DownloadLink>
    </StyledAmanual>
  );
};

export default Amanual;
