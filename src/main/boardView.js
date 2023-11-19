import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";

function BoardView({setReview,...props}){
  const [title,setTitle] = useState("");
  const [name,setName] = useState("");
  const [date,setDate] = useState("");
  const [content,setContent] = useState("");
  const back = () =>{
    setReview(false);
  }
  useEffect( ()=>{
    const fetchData = async () => {
      try {
        const url = `https://jshtoy.shop/board/list`;
        const response = await axios.get(url, {
          params: { id: localStorage.getItem("id"),          
        },
        });
        console.log(response.data);
        setTitle(response.data.title);
        setName(response.data.name);
        setContent(response.data.content);
        setDate(response.data.date);
    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  },[]);
  return(
    <div className="board_review">
      <div className="v_div">
        <div className="v_title">{title}</div>
        <div className="v_grid">
          <div className="v_text">{name}</div>
          <div className="line"></div>
          <div className="v_text_1">{date}</div>
        </div>
      </div>
      <div className="v_content">{content}</div>
      <div className="b_button"onClick={back}>뒤로가기</div>
    </div>
  )
}
export default BoardView;