import React from "react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import List from './list';
import video from "../video/home1.mp4"
import BoardView from "./boardView";

function Board() {

  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const write = () => {
    navigate(`/board/${localStorage.getItem("boardId")}/write`);
  }
  const [data, setData] = useState([]);
  const [page, setPage] = useState(null);
  const [word, setWord] = useState('');
  const input_change = (e) => {
    setWord(e.target.value);
  }
  const [review, setReview] = useState(false); //true 일 때 리뷰 내용 확인

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState({})
  console.log("page", page);
  console.log("z", lastPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/board/write';
        const response = await axios.get(url, {
          params: {
            id: localStorage.getItem("boardId"),
            page: currentPage
          },
        });
        console.log(response.data);
        setData(response.data.boardlist);
        const num = parseInt(response.data.size, 10);
        setPage(num);
        setLastPage(Math.ceil(num / 5));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const onClick = (event) => {
    localStorage.setItem("id", `${event}`);
    setReview(true);
  }
  const home = () => {
    navigate(`/member/${localStorage.getItem("token")}`);
  }
  const search = () => {
    const url = `http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/board/search`
    axios(
      {
        url: url,
        method: 'post',
        params: {
          page: currentPage
        },
        data: {
          "board_id": localStorage.getItem("boardId"),
          "keyword": word
        }
      }
    ).then(function (response) {
      setSearching(true);
      setSearchData(response.data.boardlist);
      console.log(response);

    });
  }

  return (
    <div>
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      {review ?
        <div className={`board_review1 ${review ? 'show' : ''}`}>
          <BoardView setReview={setReview}></BoardView>
        </div>
        :
        <>
          <div className="board">
            <div className="search">
              <input onChange={input_change} className="b_input"></input>
              <div></div>
              <div onClick={search} className="b_button1">검색</div>
            </div>
            <div className="b_grid">
              <div className="b_text">번호</div>
              <div className="b_text">제목</div>
              <div className="b_text">작성자</div>
              <div className="b_text">작성일</div>
            </div>
            <div style={{ height: '20px' }}></div>
            {searching ? searchData.map((data, index) => <List setReview={setReview} onClick={() => onClick(data.id)} key={index} text1={data.id} text2={data.title} text3={data.name} text4={data.date}></List>)
              : data.map((data, index) => <List onClick={() => onClick(data.id)} key={index} text1={data.id} text2={data.title} text3={data.name} text4={data.date}></List>)}

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
              <div onClick={write} className="b_button">글쓰기</div>
            </div></div></>
          
      }
          <h1 className="board_h1">게시판</h1>
          <div className='home_button1' onClick={home}>홈</div>



    </div>
  )
}
export default Board