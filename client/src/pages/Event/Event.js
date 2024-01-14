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
              <NavLink to={'/event/'+event.event_id}>
                <img src={`${API_URL}${event.event_img_url}`} alt="" />
              </NavLink>
              <p>상태: {event.event_status}</p>
            </div>
            <div>
              <NavLink to={'/event/'+event.event_id}>
                <p key={index}>{event.event_title}</p>
              </NavLink>
              <div className='event-date-kjh'>
                <span>{event.event_start_date}</span>
                {event.event_end_date && <span>~{event.event_end_date}</span>}
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