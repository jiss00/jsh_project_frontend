import React, { useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import { useState } from 'react';
import pic from "../image/question-mark-1019820_1280.jpg"
import pic1 from '../image/free-icon-left-5166140.png'
import pic2 from '../image/free-icon-right-5166255.png'
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function Recommend() {
  const Jwttoken = localStorage.getItem("token");
  const [score, setScore] = useState("basic");
  const [bookname, setBookname] = useState([]);
  const [bookimg, setBookimg] = useState([]);
  const [bookid, setBookid] = useState([]);
  const [bookprice, setBookprice] = useState([]);

  const [cnt, setCnt] = useState(0);
  const [render_img, setImg] = useState();
  const [render_name, setName] = useState();
  const [onSearch, setSearch] = useState(false);
  const [boardId, setBoardId] = useState("");
  const [price,setPrice] = useState();

  const navigate = useNavigate();


  useEffect(() => {
    setImg(bookimg[cnt]);
    setName(bookname[cnt]);
    setBoardId(bookid[cnt]);
    setPrice(bookprice[cnt]);
    localStorage.setItem("boardId", bookid[cnt]);

    // setBoardId가 호출되고 상태가 업데이트된 후에 localStorage에 값을 저장
  }, [bookname, bookimg, cnt]);
  const pay = () => {
    if (localStorage.getItem("token") == null) {
      alert("로그인 후 이용해주세요");
    }
    else if(onSearch===false){
      alert("검색하고 구매해주세요")
    }
    else {
      const orderNumber = `mid_${new Date().getTime()}`;
      const { IMP } = window;
      IMP.init('imp16078686');
      IMP.request_pay({
        pg: 'html5_inicis',                           // PG사
        pay_method: 'card',                           // 결제수단
        merchant_uid: orderNumber,   // 주문번호
        amount: price,                                 // 결제금액
        name: render_name,                  //책이름!!!!!!!!
        buyer_name: '지승현',                           // 구매자 이름
        buyer_tel: '01012341234',                     // 구매자 전화번호
        buyer_email: 'example@example',               // 구매자 이메일
        buyer_addr: '부산',                    // 구매자 주소
        buyer_postcode: '06018',
      }, function (res) {
        console.log("res값:", res);
        // 결제검증
        axios({
          type: "POST",
          url: "http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/verify/" + res.imp_uid
        }).then(function (response) {
          console.log("response값:", response);

          if (res.paid_amount === response.data.response.amount) {
            alert("결제 및 결제검증완료");
            console.log("response값:", response);
            purchase(orderNumber);
          } else {
            alert("결제 실패");
          }
        });
      });
    }
  }

  const select = (event) => {
    setScore(event.target.value);
  }
  const search = () => {
    const url = `http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/member/recommend`
    axios(
      {
        url: url,
        method: 'post',
        data: {
          "score": score
        }
      }
    ).then(function (response) {
      console.log("data",response.data);
      localStorage.setItem("board", response.data[0].book_id);
      setBookid(response.data.map(item => item.id));
      setBookimg(response.data.map(item => item.img));
      setBookname(response.data.map(item => item.title));
      setBookprice(response.data.map(item=> item.price))
      setSearch(true);

    });
  }
  console.log(boardId);
  const left = () => {
    if (cnt === 0) {
      setCnt(2);
    } else setCnt(cnt - 1);

  }
  const right = () => {
    if (cnt === 2) {
      setCnt(0);
    } else setCnt(cnt + 1);
  }

  const goBoard = () => {
    localStorage.setItem("boardId", boardId);
    navigate(`/board/${boardId}`);
  }
  const goList = () => {
    navigate(`/board/${Jwttoken}/list`)
  }
  const cart = () => {
    if (localStorage.getItem("token") === null) {
      alert("로그인 후 사용해주세요");
    }
    else if(onSearch === false){
      alert("검색하고 담아주세요");
    }
    else {
      //카트 api
      const url = `http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/order/cart`
      axios(
        {
          url: url,
          method: 'post',
          data: {
            "book_id": parseInt(localStorage.getItem("boardId")),
            "member_id": parseInt(localStorage.getItem("memberid")),
            "stock": 1
          }
        }
      ).then(function (response) {
        console.log(response);
        alert("장바구니에 담았습니다");

      });
    }
  }
  const purchase = (orderNumber) => {
    console.log("주문번호",orderNumber);
    if (localStorage.getItem("token") === null) {
      alert("로그인 후 사용해주세요");
    }
    else {
      //구매 api
      const url = `http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/order/purchase`
      axios(
        {
          url: url,
          method: 'post',
          data: {
            "book_id": parseInt(localStorage.getItem("boardId")),
            "member_id": parseInt(localStorage.getItem("memberid")),
            "stock": 1,
            "merchant_id":orderNumber,
            "where": 0
          }
        }
      ).then(function (response) {
        console.log(response);
        alert("구매 했습니다.");
        window.location.reload();
      });
    }
  }
  //구매 기능
  //환불 기능
  return (
    <div>
      <div className="recommend">
        <div className="r_text">당신의 점수는?</div>
        <div className="r_grid">
          <select onChange={select} className="r_select">
            <option>basic</option>
            <option className="r_option">600 ~</option>
            <option className="r_option">700 ~</option>
            <option className="r_option">850 ~</option>
          </select>
          <div onClick={search} className="r_search">검색</div>
        </div>
        <div className="r_img">
          <img onClick={left} className="pic1" src={pic1}></img>
          {onSearch ? <img className="r_image" onClick={goBoard} src={render_img}></img> :
            <img className="r_image" src={pic}></img>}
          <img onClick={right} className="pic1" src={pic2}></img>
        </div>
        <div className="r_text1">{render_name}</div>
        <div className="r_grid1">
          <div onClick={cart} className="r_review">담기</div>
          <div onClick={pay} className="r_review">구매</div>
        </div>


      </div>
    </div>
  )
}
export default Recommend;