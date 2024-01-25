import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Main.scss";
import axios from "axios";
import Slider1 from "./Slider";
import MainBook from "./MainBook";
import { API_URL } from "../../config/contansts";
import Genre from "./Genre";

const Main = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);
  const [axiosResult, setAxiosResult] = useState([]);
  // const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWelcome(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/event`)
      .then((res) => {
        console.log("응답 데이터: ", res.data);
        setAxiosResult(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const genre = [
    { genre: "문학", content: "문학", contentall: "더 보기" },
    { genre: "기술과학", content: "기술과학" },
    { genre: "역사", content: "역사" },
  ];
  const genrebottom = [
    { genre: "문학", content: "문학", img_url: "/images/main/literature.png" },
    { genre: "철학", content: "철학", img_url: "images/main/philosophy.png" },
    { genre: "역사", content: "역사", img_url: "images/main/history.png" },
    { genre: "종교", content: "역사", img_url: "images/main/religious.png" },
    { genre: "예술", content: "역사", img_url: "images/main/art.png" },
    { genre: "언어", content: "역사", img_url: "images/main/language.png" },
  ];

  return (
    <div className={`main-container-lhs ${showWelcome ? "show" : ""}`}>
      <div className={`main-content-kjh ${showWelcome ? "show" : ""}`}>
        <div className={`main-welcome-lhs ${showWelcome ? "visible" : ""}`}>
          <span>
            환영합니다<br></br>찾아주셔서 감사합니다.
          </span>
        </div>
        <div className={`main-top-lhs ${showWelcome ? "show" : ""}`}>
          <NavLink to="/booklist">
            <div className="main-top-name-lhs">
              <img src="/images/main/resource.png" alt="" />
              <span>쉿, 지금 제일 핫한 작품 🔥</span>
              <img
                src="/images/main/resource2.png"
                className="main-top-img-lhs"
                alt=""
              />
            </div>
          </NavLink>
        </div>
        <div className={`main-slider-lhs ${showWelcome ? "show" : ""}`}>
          <Slider1 />
        </div>
        <div className="mid-content-lhs">
          <div className={`main-mid-content-lhs  ${showWelcome ? "show" : ""}`}>
            <div className="main-mid-img-lhs">
              {axiosResult.slice(0, 5).map((item, index) => (
                <NavLink
                  to={"/event/" + item.event_id}
                  key={index}
                  className="grid-item-lhs"
                >
                  <img
                    src={API_URL + item.event_img_url}
                    alt={`grid${index + 1}`}
                  />
                  <div className="image-text-lhs">{item.event_title}</div>
                </NavLink>
              ))}
            </div>
          </div>
          
          {genre.map((item, index) => (
            <div className={`main-mid-content-lhs ${showWelcome ? 'show' : ''}`}>
              <div className="genre-container">
                <MainBook key={index} Genre={item.genre} />
              </div>
            </div>
          ))}
          <div
            className={`main-bottom1-content-lhs ${showWelcome ? "show" : ""}`}
          >
            <div className="main-bottom-container-lhs">
              <NavLink to="/booklist" className="main-bottom-fullbooktop-lhs">
                <div className="main-bottom-fullbook-lhs">
                  <p>전체 도서 보러가기</p>
                </div>
              </NavLink>
            </div>
          </div>
          <div
            className={`main-bottom-content-lhs ${showWelcome ? "show" : ""}`}
          >
            {genrebottom.map((item, index) => (
              <Genre key={index} index={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
