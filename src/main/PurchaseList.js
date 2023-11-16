import React from "react";
function PurchaseList(props) {
  return (
    <div>
      <div className="purchase_grid">
        <div>
          <img className="cart_img" src={props.img}></img>
        </div>
        <div>
          <div className="cart_text">{props.title}</div>
          <div className="cart_text">수량:{props.stock}개</div>
        </div>
      </div>
    </div>
  )
}
export default PurchaseList