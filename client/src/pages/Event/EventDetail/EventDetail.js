import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config/contansts";
import './EventDetail.scss';


const EventDetail = () => {
  const [detailEvent, setDetailEvent] = useState("");
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/event/${id}`)
      .then((res) => {
        setDetailEvent(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className="eventDetail-container-kjh">
      <div className='event-kjh'>
        <div>
          <img src={`${API_URL}${detailEvent.event_img_url}`} alt="" className='event-img-button-kjh' />
        </div>
        <div>
          <h3>{detailEvent.event_title}</h3>
          <div className='event-date-kjh'>
            <div className='event-date-content-kjh'>
              <span>기간:&nbsp;</span>
              <p>{detailEvent.event_start_date}{detailEvent.event_end_date && ' ~ '+detailEvent.event_end_date}</p>
            </div>
            <div className='event-date-content-kjh'>
              <span>모집정원:&nbsp;</span>
              <p>{detailEvent.event_max_applicants}명</p>
            </div>
            <div className='event-date-content-kjh'>
              <p>상태: {detailEvent.event_status}</p>
            </div>
          </div>
        </div>
        <p className="read-count-kjh">조회수: {detailEvent.read_count}</p>
      </div>
      <div className="img-div-kjh">
        <img src={`${API_URL}${detailEvent.event_img_url}`} alt={detailEvent.event_title} className="content-img-kjh" />
      </div>
      <div className="listBtn-div-kjh">
        <NavLink to='/event' className='button btnPush eventlist-button-kjh'>목록</NavLink>
      </div>
    </div>
  )
}

export default EventDetail;