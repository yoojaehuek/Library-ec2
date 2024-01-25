import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ACalendar = () => {
  const [date, setDate] = useState(new Date());
  const [memo, setMemo] = useState('');
  const [memos, setMemos] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const localMemos = localStorage.getItem('memos');
    if (localMemos) {
      setMemos(JSON.parse(localMemos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  const handleDateChange = (newDate) => {
    console.log("newDate:", newDate);
    setDate(newDate);
    setMemo(memos[newDate.toDateString()] || '');
    setEditMode(false);
  };

  const handleMemoChange = (e) => {
    const newMemo = e.target.value;
    setMemo(newMemo);
  };

  const handleSaveClick = () => {
    setMemos((prevMemos) => ({
      ...prevMemos,
      [date.toDateString()]: memo,
    }));
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = () => {
    const { [date.toDateString()]: deletedMemo, ...restMemos } = memos;
    setMemos(restMemos);
    setMemo('');
    setEditMode(false);
  };

  const handleAddClick = () => {
    setEditMode(true);
  };

  const tileContent = ({ date, view }) => {
    const dateString = date.toDateString();
    if (memos[dateString] && view === 'month') {
      return (
        <div>
          <span role="img" aria-label="marker" style={{ cursor: 'pointer' }} onClick={handleEditClick}>
            ✏️
          </span>
        </div>
      );
    }
    return null;
  };


  return (
    <div style={{ textAlign: 'center' }}>
      <h2>일정 체크.</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        onClickDay={handleEditClick}
        tileContent={tileContent}
      />
      {editMode ? (
        <div style={{ marginTop: '2vw', textAlign: 'center' }}>
          <h3>{date.toDateString()}</h3>
          <textarea
            rows="4"
            cols="50"
            placeholder="뭐 이리 안되는게 많아."
            value={memo}
            onChange={handleMemoChange}
            style={{ marginBottom: '10px' }}
          />
          <br />
          <button onClick={handleSaveClick} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', marginRight: '5px' }}>
            저장
          </button>
          {memos[date.toDateString()] && (
            <button onClick={handleDeleteClick} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 15px', marginLeft: '5px' }}>
              삭제
            </button>
          )}
        </div>
      ) : (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>{date.toDateString()}</h3>
          {memos[date.toDateString()] ? (
            <div>
              <p style={{ fontSize: '18px', marginBottom: '10px' }}>{memo}</p>
              <button onClick={handleEditClick} style={{ backgroundColor: '#2196F3', color: 'white', padding: '10px 15px', marginRight: '5px' }}>
                수정
              </button>
              <button onClick={handleDeleteClick} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 15px', marginLeft: '5px' }}>
                삭제
              </button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '18px', marginBottom: '10px', color: '#888' }}>메모 없음</p>
              <button onClick={handleAddClick} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px' }}>
                메모하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ACalendar;
