import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Main from './component/Main';
import Goods from './component/Goods';
import Update from './component/Update';
import Create from './component/Create';
import Books from './component/Books';
import Update2 from './component/Update2';
import Create2 from './component/Create2';
import Fruit from './component/Fruit';
import Update3 from './component/Update3';
import Create3 from './component/Create3';
import Question from './component/Question';
import Login from './component/Login';
import Login2 from './component/Login2';
import Register  from './component/Register';
import Register2  from './component/Register2';

import './App.css';
import { AlertContext } from './AlertContext';

function App() {
  // 여기서 반드시 객체 비구조화!
  const { questionCount, setQuestionCount, goodsCount, booksCount, fruitsCount } = React.useContext(AlertContext);

  const incrementQuestionCount = () => {
    setQuestionCount(prev => prev + 1);
  };

  return (
    <BrowserRouter>
      <header>
        <h1>프론트엔드 프로젝트 - react + mysql(메인페이지)</h1>
        <nav>
  <NavLink
    to="/"
    id="home"
    style={({ isActive }) => ({
      textDecoration: isActive ? 'underline' : 'none',
    })}
  >
    Home
  </NavLink>
  &nbsp;|&nbsp;

  <NavLink
    to="/goods"
    id="goods"
    style={({ isActive }) => ({
      textDecoration: isActive ? 'underline' : 'none',
      position: 'relative',
      display: 'inline-block',
    })}
  >
    Goods
    {goodsCount > 0 && (
      <span
        style={{
          display: 'inline-block',
          marginLeft: '6px',
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          width: '22px',
          padding: '2px 6px',
          fontSize: '14px',
          textAlign: 'center',
          lineHeight: '22px',
          fontWeight: 'bold',
        }}
      >
        {goodsCount}
      </span>
    )}
  </NavLink>
  &nbsp;|&nbsp;

  <NavLink
    to="/books"
    id="books"
    style={({ isActive }) => ({
      textDecoration: isActive ? 'underline' : 'none',
    })}
  >
    Books
    {booksCount > 0 && (
      <span
        style={{
          display: 'inline-block',
          marginLeft: '6px',
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          width: '22px',
          padding: '2px 6px',
          fontSize: '14px',
          textAlign: 'center',
          lineHeight: '22px',
          fontWeight: 'bold',
        }}
      >
        {booksCount}
      </span>
    )}
  </NavLink>
  &nbsp;|&nbsp;

  <NavLink
  to="/fruit"
  id="fruit"
  style={({ isActive }) => ({
    textDecoration: isActive ? 'underline' : 'none',
  })}
>
  Fruit
  {fruitsCount > 0 && (    // 변수명 일관성 있게 수정
    <span
      style={{
        display: 'inline-block',
        marginLeft: '6px',
        background: 'red',
        color: 'white',
        borderRadius: '50%',
        width: '22px',
        padding: '2px 6px',
        fontSize: '14px',
        textAlign: 'center',
        lineHeight: '22px',
        fontWeight: 'bold',
      }}
    >
      {fruitsCount}
    </span>
  )}
</NavLink>  {/* 닫는 태그 추가 */}

  <NavLink
    to="/question"
    id="question"
    style={({ isActive }) => ({
      textDecoration: isActive ? 'underline' : 'none',
    })}
  >
    <span>Question</span>
    {questionCount > 0 && (
      <span
        style={{
          marginLeft: '5px',
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '2px 6px',
          fontSize: '12px',
        }}
      >
        {questionCount}
      </span>
    )}
  </NavLink>
  &nbsp;|&nbsp;

  <NavLink
    to="/login"
    id="login"
    style={({ isActive }) => ({
      textDecoration: isActive ? 'underline' : 'none',
    })}
  >
    Login
  </NavLink>
  &nbsp;|&nbsp;

  <NavLink
    to="/login2"
    id="login2"
    style={({ isActive }) => ({
      textDecoration: isActive ? 'underline' : 'none',
    })}
  >Login2
  </NavLink>
  &nbsp;|&nbsp;
  <NavLink
    to="/register"
    id="register"
    style={({ isActive }) => ({
      textDecoration: isActive ? 'underline' : 'none',
    })}
  >Register
  </NavLink>
  &nbsp;|&nbsp;
  <NavLink
    to="/register2"
    id="register2"
    style={({ isActive }) => ({
      textDecoration: isActive ? 'underline' : 'none',
    })}
  >Register2
  </NavLink>
</nav>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Main />} />

          <Route path='/goods' element={<Goods />} />
          <Route path='/goods/update/:g_code' element={<Update />} />
          <Route path='/goods/create' element={<Create />} />

          <Route path='/books' element={<Books />} />
          <Route path='/books/update2/:CODE' element={<Update2 />} />
          <Route path='/books/create' element={<Create2 />} />

          <Route path='/fruit' element={<Fruit />} />
          <Route path='/fruit/update3/:CODE' element={<Update3 />} />
          <Route path='/fruit/create3' element={<Create3 />} />

          <Route path='/question' element={<Question onQuestionSubmit={incrementQuestionCount} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login2' element={<Login2 />} />
          <Route path='/register' element={<Register />} />
          <Route path='/register2' element={<Register2 />} />
        </Routes>
      </main>

      <footer>푸터</footer>
    </BrowserRouter>
  );
}

export default App;
