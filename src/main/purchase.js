import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import CartList from "./cartList";
import PurchaseList from "./PurchaseList";
function Purchase({ data, ...props }) {
  console.log("data 길이", data);
  const [price, setPrice] = useState(data.price);
  const cartItems = [];
  const pay_cancel=(merchant_uid,purchase_id,purchase)=>{
    axios({
      url: `http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/payments/cancel`, // 예: http://www.myservice.com/payments/cancel
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { 
        merchant_id : merchant_uid,
        id: localStorage.getItem("memberid"), // 멤버 id!!!!!
        reason: "그냥", // 환불사유
        purchase_id: purchase_id, //주문번호
        stock : 1        
      }
    }).then(function (response){
      console.log(response);
      window.location.reload();
    });
  }
  const refund = (title,merchant_uid,purchase_id) =>{
    axios({
      url: `http://ec2-3-34-188-54.ap-northeast-2.compute.amazonaws.com/order/findBook`, // 예: http://www.myservice.com/payments/cancel
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { 
        score:title
      }})
    .then(function (response) {
      pay_cancel(merchant_uid,purchase_id);
      console.log(response.data);
      }
    )};

  
  if (data) {
    for (let i = 0; i < data.imgs.length; i++) {
      ; cartItems.push(
        <PurchaseList
          title={data.titles[i]}
          stock={data.stock[i]}
          img={data.imgs[i]}
          onClick={() => refund(data.titles[i],data.merchant_uid[i],data.id[i])}
        />)
    }
  }

  return (
    <div className="cart">
      <div className="main_2">
        <div className="r_text">구매내역</div>
        {data && cartItems}
      </div>
    </div>
  )
}
export default Purchase;