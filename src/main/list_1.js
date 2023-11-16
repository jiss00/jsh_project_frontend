import axios from "axios"
import React from "react"
import '../css/main.css'

function List(props){
  return(
    <div onClick = {props.onClick}className="b_grid2">
      <div className="b_text1">{props.text1}</div>
      <div className="b_text1">{props.text2}</div>
      <div className="b_text1">{props.text3}</div>
      <div className="b_text1">{props.text4}</div>
      <div className="b_text1">x</div>
    </div>
  )
}
export default List;