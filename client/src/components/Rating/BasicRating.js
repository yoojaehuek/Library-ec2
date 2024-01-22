import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating({ratingValue, setRatingValue}) {
  

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      {/* <Typography component="legend">Controlled</Typography> */}
      <Rating
        name="simple-controlled"
        value={ratingValue}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
        }}
      />
    </Box>
  );
}