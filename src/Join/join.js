import React from "react";
import { useState } from "react";
import '../css/main.css'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Join() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const [auth, setAuth] = useState("");
  const [isConfirmSuccess, setIsConfirmSuccess] = useState(false);


  const [phone, setPhone_num] = useState('');  
  const nameset = (e) => {
    setName(e.target.value);
    console.log(name);
  }
  const idset = (e) => {
    setId(e.target.value);
  }
  const pwdset = (e) => {
    setPwd(e.target.value);
  }
  const phoneset = (e) => {
    setPhone_num(e.target.value);
  }
  const authset = (e) => {
    setAuth(e.target.value);
  }
  const back = () => {
    navigate('/');
  }

  const signup = () => {
    const url = `https://jshtoy.shop/member/join`
    axios(
      {
        url: url,
        method: 'post',
        data: {
          "email": id,
          "employName": name,
          "password": pwd,
          "phoneNumber": phone
        }
      }
    ).then(function (response) {
      navigate('/');
    });
  }
  const submit =() => {
    const url = `https://jshtoy.shop/mail`
    //const url = `http://localhost:8080/mail`
    
    axios(
      {
        url: url,
        method: 'post',
        data: {
          "email": id
        }
      }
    ).then(function (response) {
      alert("해당 메일로 인증번호가 발송되었습니다.");
      navigate('/');
    }); 
  }

  const confirm = () =>{
    const url = `https://jshtoy.shop/mail/confirm`
    //const url =`http://localhost:8080/mail/confirm`
    axios(
      {
        url: url,
        method: 'post',
        data: {
          "email": auth
        }
      }
    ).then(function (response) {
      if(response.data ==="실패"){
        alert("인증번호가 다릅니다. 다시 시도해주세요");
      }
      else if(response.data ==="null값"){
        alert("null값입니다");
      }
      else{
        alert("인증 완료");
        setIsConfirmSuccess(true); // 인증이 성공하면 상태 업데이트

      }
      
    }); 
  }

  return (
    <div className="join">
      <div className="main_title">회원가입</div>
      <div className="main_grid">
        <div className="join_text">이름</div>
        <div></div>
        <input onChange={nameset} className="join_input"></input>
      </div>
      <div className="main_grid2">
        <div className="join_text">이메일</div>
        <div></div>
        <input onChange={idset} className="join_input"></input>
        <div></div>
        <div onClick={submit}className="submit">전송</div>
      </div>
      <div className="main_grid">
        <div className="join_text">비밀번호</div>
        <div></div>
        <input onChange={pwdset} type='password' className="join_input"></input>
      </div>
      <div className="main_grid2">
        <div className="join_text">인증번호</div>
        <div></div>
        <input onChange={authset}  className="join_input"></input>
        <div></div>
        <div onClick={confirm}className="submit">확인</div>
      </div>
      <div className="main_grid">
        <div className="join_text">Phone</div>
        <div></div>
        <input onChange={phoneset} className="join_input"></input>
      </div>
      {isConfirmSuccess && (
          <div onClick={signup} className="join_button">회원가입</div>
      )}    </div>
  )
}

export default Join;