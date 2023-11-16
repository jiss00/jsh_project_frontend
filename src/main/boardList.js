import React from "react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import List from './list';
import BoardView1 from "./BoardView1";
//내가 적은 리뷰 화면!!!!!
function BoardList({reviewing,setReview}) {
  const navigate = useNavigate();
  const write = () => {
    navigate(`/board/${localStorage.getItem("boardId")}/write`);
  }
  const [data, setData] = useState([]);
  const [page, setPage] = useState(null);
  const [view, setView] = useState(false); //true 일 때 리뷰 내용 확인

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1)
  console.log("page", page);
  console.log("z", lastPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/board/review';
        const response = await axios.get(url, {
          params: {
            name: localStorage.getItem("name"),
            page: currentPage
          },
        });
        console.log(response.data);
        setData(response.data.boardlist);
        const num = parseInt(response.data.size, 10);
        setPage(num);
        setLastPage(Math.ceil(num / 10));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const onClick = (event) => {
    localStorage.setItem("id", `${event}`);
    setView(true);
  }

  return (
    <>
      {view?<BoardView1  reviewing={reviewing } setReview={setReview} setView={setView}></BoardView1>:
      <div className="myboard">
      <div className="myboard_text">나의 리뷰</div>
      <div className="search1">
        <input className="b_input"></input>
        <div></div>
        <div className="b_button1">검색</div>
      </div>
      <div className="b_grid">
        <div className="b_text">번호</div>
        <div className="b_text">제목</div>
        <div className="b_text">작성자</div>
        <div className="b_text">작성일</div>
      </div>
      <div style={{ height: '10px' }}></div>
      {data.map((data, index) => <List onClick={() => onClick(data.id)} key={index} text1={data.id} text2={data.title} text3={data.name} text4={data.date}></List>)}
      <div className="b_footer">
        <div className="b_page">
          <button
            className={`board_button ${currentPage === 1 ? 'disabled_button' : ''}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >이전</button>
          <span className="board_page">{currentPage}</span>
          <button
            className={`board_button ${currentPage === lastPage || lastPage === 0 ? 'disabled_button' : ''}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === lastPage || lastPage === 0}>다음</button>
        </div>
      </div>
    </div>
      }

    </>

  )
}

export default BoardList;