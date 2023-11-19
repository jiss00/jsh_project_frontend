import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function BoardView1({setView,reviewing,setReview}) {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open,setOpen] = useState(false);
  const change = () => {
    navigate(`/change/${localStorage.getItem("id")}`);

  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const remove = () => {
    const url = `http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/board/delete`;
    setIsModalOpen(false);

    axios(
      {
        url: url,
        method: 'post',
        data: {
          "id": localStorage.getItem("id")
        }
      }
    ).then(function (response) {
      navigate(-1);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/board/list`;
        const response = await axios.get(url, {
          params: {
            id: localStorage.getItem("id"),
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

  }, []);
  const goback= () =>{
    setView(false);
  }
  return (
    
    <div>
      <div className="board_review10">
        <div className="v_div">
          <div className="v_title">{title}</div>
          <div className="v_grid">
            <div className="v_text">{name}</div>
            <div className="line"></div>
            <div className="v_text_1">{date}</div>
          </div>
        </div>
        <div className="v_content">{content}</div>
        <div className="v_display">
          <div onClick={goback}className="v_back">뒤로가기</div>
          <div></div>
          <div onClick={change} className="v_change">수정</div>
          <div onClick={openModal} className="v_remove">삭제</div>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal_title">알림</div>
            <div className="modal-content">
              <p>예 또는 아니오를 선택하세요.</p>
              <button onClick={closeModal}>아니오</button>
              <button onClick={remove}>예</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default BoardView1;