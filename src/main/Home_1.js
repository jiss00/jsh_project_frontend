import '../css/main.css'
import video from "../video/home1.mp4"
import Login from "./main"
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Join from '../Join/join'
import Recommend from './recommend';
import Cart from './cart';
import axios from 'axios';
import Purchase from './purchase';
import BoardList from './boardList';

function Home_1() {
  const navigate = useNavigate();
  const [reviewing,setReview] = useState(false);
  const [book, setBook] = useState(false);
  const [carting, setCart] = useState(false);
  const [purchasing, setPurchase] = useState(false);
  const [data, setData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://jshtoy.shop/order/cart';
        const response = await axios.get(url, {
          params: {
            id: localStorage.getItem("memberid"),
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [carting]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/order/purchase';
        const response = await axios.get(url, {
          params: {
            id: localStorage.getItem("memberid"),
          },
        });
        setPurchaseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const review = () => {
    setReview(true);
    setCart(false);
    setPurchase(false);
    setBook(false);
  }
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/")
  }
  const cart = () => {
    setCart(true);
    setPurchase(false);
    setBook(false);
    setReview(false);
  }
  const purchase = () => {
    setCart(false);
    setPurchase(true);
    setBook(false);
    setReview(false);
  }
  const recommend = () => {
    setCart(false);
    setPurchase(false);
    setBook(true);
    setReview(false);
  }
  return (
    <div>
      <div>
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        <div className='Home_grid'>
          <div onClick={review} className='home_div'>나의 리뷰</div>
          <div onClick={logout} className='home_div'>로그아웃</div>
          <div onClick={cart} className='home_div'>장바구니</div>
          <div onClick={purchase} className='home_div'>구매내역</div>
        </div>
        <h1>점수 별 토익책<br></br> 추천해드립니다</h1>
        <div onClick={recommend} className='home_button'>도서 보러가기</div>
        <div className={`home_book ${book ? 'show' : ''}`}>
          {book && <Recommend />}
        </div>
        <div className={`home_book ${carting ? 'show' : ''}`}>
          {carting && <Cart data={data} />}
        </div>
        <div className={`home_book ${purchasing ? 'show' : ''}`}>
          {purchasing && <Purchase data={purchaseData} />}
        </div>
        <div className={`home_review ${reviewing ? 'show' : ''}`}>
          {reviewing && <BoardList reviewing={reviewing} setReview={setReview}/>}
        </div>
      </div>
    </div>
  )
}
export default Home_1;