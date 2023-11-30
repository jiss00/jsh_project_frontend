import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import CartList from "./cartList";
function Cart({ data, ...props }) {
  const [price, setPrice] = useState(data.price);
  const [index, setIndex] = useState();


  const pay = () => {
    if (localStorage.getItem("token") == null) {
      alert("로그인 후 이용해주세요");
    }
    else {
      const orderNumber = `mid_${new Date().getTime()}`;
      const { IMP } = window;
      IMP.init('imp16078686');
      IMP.request_pay({
        pg: 'html5_inicis',                           // PG사
        pay_method: 'card',                           // 결제수단
        merchant_uid: orderNumber,   // 주문번호
        amount: data.prices[index],                                 // 결제금액
        name: data.titles[index],                  //책이름!!!!!!!!
        buyer_name: '지승현',                           // 구매자 이름
        buyer_tel: '01012341234',                     // 구매자 전화번호
        buyer_email: 'example@example',               // 구매자 이메일
        buyer_addr: '부산',                    // 구매자 주소
        buyer_postcode: '06018',
      }, function (res) {

        // 결제검증
        axios({
          type: "POST",
          url: "https://jshtoy.shop/verify/" + res.imp_uid
        }).then(function (response) {

          if (res.paid_amount === response.data.response.amount) {
            alert("결제 및 결제검증완료");
            purchase(orderNumber);
          } else {
            alert("결제 실패");
          }
        });
      });
    }
  }
  const purchase = (orderNumber) => {
    if (localStorage.getItem("token") === null) {
      alert("로그인 후 사용해주세요");
    }
    else {
      //구매 api
      const url = `https://jshtoy.shop/order/purchase`
      axios(
        {
          url: url,
          method: 'post',
          data: {
            "book_id": data.books[index],
            "member_id": parseInt(localStorage.getItem("memberid")),
            "stock": 1,
            "merchant_id":orderNumber,
            "where": 1
          }
        }
      ).then(function (response) {
        alert("구매 했습니다.");
        window.location.reload();
      });
    }
  }


  return (
    <div className="cart">
      <div className="main_1">
        <div className="r_text">장바구니</div>
        {data &&
          data.imgs.map((img, index) => (
            <CartList
              key={index}
              id={data.id[index]}
              title={data.titles[index]}
              price={data.prices[index]}
              stock={data.stock[index]}
              img={img}
              setIndex={setIndex}
              index={index}
            />
          ))}      </div>
      <div className="cart_footer">
        <div>
          <div className="cart_text1">장바구니 금액</div> {/* 가격 */}
          <div className="cart_text2">{data.price}원</div>
        </div>
        <div onClick={pay} className="cart_buy">구매</div> {/* 구매 */}

      </div>
    </div>
  )
}
export default Cart;