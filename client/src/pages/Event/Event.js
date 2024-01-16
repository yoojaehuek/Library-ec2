import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/contansts';
import './Event.scss';

const Event = () => {

  const [events, setEvents] = useState();

  useEffect(()=> {
    const getEvents = async () => {
      const res = await axios.get(`${API_URL}/api/event`);
      setEvents(res.data);

      console.log(res.data);
    }

    getEvents();
  },[]);

  return (
    <div className='event-container-kjh'>
      <h1>이벤트 페이지</h1>
      <div className='event-content-kjh'>
        {events && events.map((event, index) => (
          <div className='event-kjh'>
            <div>
              <NavLink to={'/event/'+event.event_id} className='event-img-button-kjh'>
                <img src={`${API_URL}${event.event_img_url}`} alt="" />
              </NavLink>
              <p>상태: {event.event_status}</p>
            </div>
            <div>
              <NavLink to={'/event/'+event.event_id}>
                <h3 key={index}>{event.event_title}</h3>
              </NavLink>
              <div className='event-date-kjh'>
                <div className='event-date-content-kjh'>
                  <span>기간:&nbsp;</span>
                  <p>{event.event_start_date}{event.event_end_date && ' ~ '+event.event_end_date}</p>
                </div>
                <div className='event-date-content-kjh'>
                  <span>모집정원:&nbsp;</span>
                  <p>{event.event_max_applicants}명</p>
                </div>
              </div>
            </div>
            <p>조회수: {event.read_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;