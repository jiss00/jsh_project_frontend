import {
  BrowserRouter as Router,
  Routes, //
  Route,  //path의 경로에 렌더링 해줌
} from "react-router-dom";

import Login from './main/main'
import Join from './Join/join'
import Recommend from "./main/recommend";
import Board from "./main/board";
import Write from "./main/write";
import BoardView from "./main/boardView";
import BoardList from "./main/boardList";
import BoardView1 from "./main/BoardView1";
import Change from "./main/change";
import Payment from "./payment/payment";
import Home from "./main/Home"
import Home1 from "./main/Home_1"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/*메인 화면*/}
        <Route path="login" element={<Login/>} />{/*홈 화면*/}
        <Route path="join" element={<Join />}/> {/*회원가입 화면*/}
        <Route path ="member/:token" element={<Home1/>}/> {/*책 보는 화면*/}
        <Route path ="board/:boardId" element={<Board/>}/> {/*책 누르면 나오는 게시판 화면*/} 
        <Route path ="board/:boardId/write" element={<Write/>}/> {/*게시글 작성 화면*/}
        <Route path ="change/:id" element={<Change/>}/>  {/*게시글 수정 화면*/}
        <Route path ="board/:boardId/:id" element={<BoardView/>}/> {/*리뷰 상세 화면*/}
        <Route path ="board/:Jwttoken/list" element={<BoardList/>}/> {/*내가 적은 리뷰 보는 화면*/}
        <Route path ="view/:id" element={<BoardView1/>}/> {/*내가 적은 게시판 상세정보 보는 화면*/}
        <Route path="payment" element={<Payment />}/>

        

      </Routes>
    </Router>

  );
}

export default App;
