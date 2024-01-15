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
          <p>상태: {detailEvent.event_status}</p>
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
          </div>
          {/* <dl className='event-date-kjh'>
            <div className='event-date-content-kjh'>
              <dd><span>기간:&nbsp;</span></dd>
              <dt>
                <p>{detailEvent.event_start_date}{detailEvent.event_end_date && ' ~ '+detailEvent.event_end_date}</p>
              </dt>
            </div>
            <div className='event-date-content-kjh'>
              <dd><span>모집정원:&nbsp;</span></dd>
              <dt>
                <p>{detailEvent.event_max_applicants}명</p>
              </dt>
            </div>
          </dl> */}
        </div>
        <p>조회수: {detailEvent.read_count}</p>
      </div>
      <img src={`${API_URL}${detailEvent.event_img_url}`} alt={detailEvent.event_title} className="content-img-kjh" />
    </div>
  )
}

export default EventDetail;