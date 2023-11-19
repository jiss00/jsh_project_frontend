import React, { useState } from "react";
import '../css/main.css'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
function Main() {
  const navigate = useNavigate();
  const signUp = () => {
    navigate("/join");
  }
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const c_email = (e) => {
    setEmail(e.target.value);
  }
  const c_pwd = (e) => {
    setPwd(e.target.value);
  }
  const c_name = (e) => {
    setName(e.target.value);
  }
  const login = () => {
    const url = `http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/member/login`
    axios(
      {
        url: url,
        method: 'post',
        data: {
          "name": name,
          "email": email,
          "password": pwd
        }
      }
    ).then(function (response) {
      localStorage.setItem("memberid", response.data.memberId);
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate(`/member/${response.data.token}`);
    })
    .catch(function (error) {
      // 에러가 발생한 경우 처리
      alert("로그인 실패");
    });
  };
  return (
    <div>
      <div className="main">
        <div className="main_title1">로그인</div>
        <div className="main_text">이름</div>
        <input onChange={c_name} placeholder="Name" className="main_input"></input>
        <div className="main_text">이메일</div>
        <input onChange={c_email} placeholder="Email" className="main_input"></input>
        <div className="main_text">비밀번호</div>
        <input onChange={c_pwd} placeholder="Password" className="main_input"></input>
        <div onClick={login} className="main_btn1">로그인</div>
      </div>
    </div>
  )
}
export default Main;