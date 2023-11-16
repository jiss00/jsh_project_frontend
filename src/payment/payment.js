import React from 'react';
import { useState } from 'react';
import axios from 'axios';
function Payment() {
  const [purchase, setPurchase] = useState(false);
  function onClickPayment() {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp16078686');
    IMP.request_pay({
      pg: 'html5_inicis',                           // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
      amount: 1000,                                 // 결제금액
      name: '아임포트 결제 데이터 분석',                  //책이름!!!!!!!!
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
        url: "http://localhost:8080/verify/" + res.imp_uid
      }).then(function (response) {
        console.log("response값:", response);

        if (res.paid_amount === response.data.response.amount) {
          alert("결제 및 결제검증완료");
          console.log("response값:", response);
          axios({
            method: "POST",
            url: `http://localhost:8080/order/purchase`,
            data: {
              "book_id": 712, //책 id
              "member_id": 1 //회원 id
            }
          }).then(function (data) {
            console.log("구매성공!!", data);
          });
        } else {
          alert("결제 실패");
        }
      });
    });
  }
  const cancelPay = () => {
    axios({
      url: `http://localhost:8080/payments/cancel`, // 예: http://www.myservice.com/payments/cancel
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { 
        book_id: 1, //책 id
        merchant_id: "1", // 멤버 id!!!!!
        cancel_request_amount: 1000, // 체크한 책 가격
        reason: "테스트 결제 환불", // 환불사유
        refund_holder: "지승현", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
        refund_bank: "", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
        refund_account: "" // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
      }
    });
  }

  return (
    <div>
      <button onClick={onClickPayment}>결제하기</button>
      <button onClick={cancelPay}>환불하기</button>
    </div>
  );
}
export default Payment;