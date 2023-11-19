import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function CartList({id,setIndex,index,...props}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckClick = () => {
    setIsChecked(!isChecked);
    setIndex(index);
  };

  const cancel =() =>{
      //구매 api
      const url = `https://jshtoy.shop/order/cancel`
      axios(
        {
          url: url,
          method: 'post',
          data: {
            "itemId": parseInt(id),
            "member_id":parseInt(localStorage.getItem("memberid")),
            "stock":1
          }
        }
      ).then(function (response) {
        console.log(response);
        alert("장바구니에서 취소 처리했습니다");
        window.location.reload();

      });
    
  }

  return (
    <div>
      <div className={`cart_grid ${isChecked ? 'checked' : ''}`}>
        <div>
          <img className="cart_img" src={props.img}></img>
        </div>
        <div>
          <div className="cart_text">{props.title}</div>
          <div className="cart_text">수량:{props.stock}개</div>
          <div className="cart_text">가격:{props.price}원</div>
        </div>
        <div>
          <div onClick={cancel}className="x">x</div>
          <div onClick={handleCheckClick} className={`check ${isChecked ? 'checked' : ''}`}></div>
        </div>
      </div>
    </div>
  )
}
export default CartList