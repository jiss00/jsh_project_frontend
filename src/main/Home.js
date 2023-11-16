import '../css/main.css'
import video from "../video/home1.mp4"
import Login from "./main"
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Join from '../Join/join'
import Recommend from './recommend';
function Home() {
  const navigate = useNavigate();
  const [joining, setJoining] = useState(false);
  const [loinging, setLogining] = useState(false);
  const [book, setBook] = useState(false);


  const join = () => {
    setJoining(true);
    setLogining(false);
    setBook(false);
  }
  const login = () => {
    setJoining(false);
    setLogining(true);
    setBook(false);
  }
  const cart = () => {
    alert("로그인 후 이용가능");
  }
  const purchase = () => {
    alert("로그인 후 이용가능");
  }
  const recommend = () => {
    setJoining(false);
    setLogining(false);
    setBook(true);
  }
  return (
    <div>
      <div>
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        <div className='Home_grid'>
          <div onClick={join} className='home_div'>회원가입</div>
          <div onClick={login} className='home_div'>로그인</div>
          <div onClick={cart} className='home_div'>장바구니</div>
          <div onClick={purchase} className='home_div'>구매내역</div>
        </div>
        <h1>점수 별 토익책<br></br> 추천해드립니다</h1>
        <div onClick={recommend} className='home_button'>도서 보러가기</div>
        <div className={`home_log ${loinging ? 'show' : ''}`}>
          <Login />
        </div>
        <div className={`home_join ${joining ? 'show' : ''}`}>
          <Join />
        </div>
        <div className={`home_book ${book ? 'show' : ''}`}>
          {book && <Recommend />}
        </div>

      </div>
    </div>
  )
}
export default Home;