import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import video from "../video/home1.mp4"

function Write() {
  const navigate = useNavigate();
  const cancel = () => {
    navigate(`/board/${localStorage.getItem("boardId")}`);
  }
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState('');
  const date = getCurrentDateTime();
  const save = () => {
    const url = `http://localhost:8080/board/write`
    axios(
      {
        url: url,
        method: 'post',
        params: { id: localStorage.getItem("boardId") },
        data: {
          "title": title,
          "content": content,
          "name": localStorage.getItem('name'),
          "date": date
        }
      }
    ).then(function (response) {
      console.log(response);
      navigate(`/board/${localStorage.getItem("boardId")}`);
    });
  }
  const inputTitle = (e) => {
    setTitle(e.target.value);
  }
  const inputContent = (e) => {
    setContent(e.target.value);
  }
  return (
    <div>
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="board_write">
        <div>
          <input onChange={inputTitle} placeholder="제목을 입력하세요" className="input"></input>
        </div>
        <textarea onChange={inputContent} placeholder="내용을 입력하세요" className="textarea"></textarea>
        <div className="w_grid">
          <div onClick={cancel} className="w_button">취소</div>
          <div></div>
          <div onClick={save} className="w_button">저장</div>
        </div>
      </div>

    </div>
  )
}
function getCurrentDateTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // 현재 연도
  const month = currentDate.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1)
  const day = currentDate.getDate(); // 현재 일
  const hours = currentDate.getHours(); // 현재 시간 (0-23)
  const minutes = currentDate.getMinutes(); // 현재 분

  // 원하는 형식으로 반환
  const formattedDateTime = `${year}.${month}/${day}.${hours}.${minutes}`;

  return formattedDateTime;
}
export default Write;