import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const ListItems = [
  {
    title: 'Book',
    value: 'book',
    sub_title: [
      { sub_title: '총류', value: '1'},
      { sub_title: '철학', value: '2' },
      { sub_title: '종교', value: '3' },
      { sub_title: '사회과학', value: '4' },
      { sub_title: '자연과학', value: '5' },
      { sub_title: '기술과학', value: '6' },
      { sub_title: '예술', value: '7' },
      { sub_title: '언어', value: '8' },
      { sub_title: '문학', value: '9' },
      { sub_title: '역사', value: '10' }
    ],
  },
  {
    title: 'User',
    value: 'user',
    sub_title: [
      { sub_title: '회원관리', value: 'user' },
    ],
  },
  {
    title: 'Rental',
    value: 'rental',
    sub_title: [
      { sub_title: '대출 관리', value: 'rental' },
    ],
  },
  {
    title: 'Faq',
    value: 'faq',
    sub_title: [
      { sub_title: 'Faq', value: 'faq' },
    ],
  },
  {
    title: 'Event',
    value: 'event',
    sub_title: [
      { sub_title: '이벤트', value: 'event' },
    ],
  },
  {
    title: 'Banner',
    value: 'banner',
    sub_title: [
      { sub_title: 'Banner 관리', value: 'banner' },
    ],
  },
  {
    title: 'Review',
    value: 'review',
    sub_title: [
      { sub_title: '리뷰 관리', value: 'review' },
    ],
  },
  {
    title: 'Manual',
    value: 'manual',
    sub_title: [
      { sub_title: 'Manual', value: 'manual' },
    ],
  },
];

const AListbar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSubtitleClick = (event, index, subIndex) => {
    event.stopPropagation();
  };

  const renderListItems = (items) => {
    return items.map((item, index) => (
      <div key={index}>
        <ListItem
          button
          onClick={() => handleClick(index)}
          sx={{
            pl: item.sub_title ? 0 : 4,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#000' }}></ListItemIcon>
          <ListItemText primary={item.title} sx={{ color: '#000' }} />
          {item.sub_title && (openIndex === index ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {item.sub_title && (
          <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.sub_title.map((subItem, subIndex) => (
                <ListItem
                  button
                  key={subIndex}
                  sx={{
                    pl: 4,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                  onClick={(event) => handleSubtitleClick(event, index, subIndex)}
                >
                  <ListItemIcon></ListItemIcon>
                  <NavLink to={`/admin/${item.value}/${subItem.value}`}>
                    <ListItemText primary={subItem.sub_title} sx={{ color: '#000' }} />
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </div>
    ));
  };

  return (
    <div id='AListbar-container-kjn'>
      {/* <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={`${process.env.PUBLIC_URL}/images/Footer/kakao.svg`} alt='로고' style={{ width: '50px', height: '50px' }} />
      </div> */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#81c147',
            paddingTop: 1,
          },
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <NavLink to='/admin'><img src={`${process.env.PUBLIC_URL}/images/Footer/kakao.svg`} alt='로고' style={{ width: '50px', height: '50px' }} /></NavLink>
        </div>
        <List>{renderListItems(ListItems)}</List>
      </Drawer>
    </div>
  );
};

export default AListbar;