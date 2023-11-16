import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import CartList from "./cartList";
import PurchaseList from "./PurchaseList";
function Purchase({ data, ...props }) {
  console.log("data 길이", data);
  const [price, setPrice] = useState(data.price);
  const cartItems = [];
  if (data) {
    for (let i = 0; i < data.imgs.length; i++) {
      ; cartItems.push(
        <PurchaseList
          title={data.titles[i]}
          stock={data.stock[i]}
          img={data.imgs[i]}
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