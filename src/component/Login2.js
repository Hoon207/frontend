import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


function Login2(props) {
  const [form, setForm] = useState({
    username:'',
    password:'',
  });

  const [error, setError] = useState('');
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError(''); // 에러 초기화
    try{
      const res = await axios.post('http://localhost:9000/login2', form);
      if(res.data.success){
        localStorage.setItem('token', res.data.token);
        alert(`${form.username}님, 로그인되었습니다.`);
      }else{
        setError(res.data.message || '로그인 실패');

      }
    }catch(err){
      console.error('로그인 중 오류 발생:', err);
      setError('서버 오류 또는 네트워크 오류');
    }


  }
  return (
    <div className="login2">

      <div>
        <h2>로그인(DB:users2)</h2>
        <form method="post" style={{textAlign:'center', marginTop:'50px'}} onSubmit={handleSubmit}>
        <p style={{width:'100%'}}>
        <label htmlFor="username" style={{fontSize:'30px'}}>👔</label>
            <input
            style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'20px'}}
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              value={form.username}
              placeholder="아이디"
              required
            />
          </p>
          <p style={{width:'100%'}}>
          <label htmlFor="password" style={{fontSize:'30px'}}>🔑</label>
            <input
            style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'20px'}}
              type="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              id="password"
              placeholder="비밀번호"
              required
            />
          </p>
          {/*---------------------로그인버튼-------------------*/}
          <p>
            <input 
            type="submit" 
            value="로그인"
            style={{
              backgroundColor: '#28a745', 
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '6px',
              cursor: 'pointer',
              textAlign: 'center',
              width: '100%',
            }}
            />
          </p>
          {/*---------------------소셜로그인-------------------*/}
          <ul style={{listStyle: 'none', padding: 0, margin: 0, border:'none'}}>
            <li><img src={`${process.env.PUBLIC_URL}/images/naver.png`} alt="네이버로그인" style={{width:'200px'}} /></li>
          <li><img src={`${process.env.PUBLIC_URL}/images/kakao.png`} alt="카카오로그인"  style={{width:'200px', height:'50px'}}/></li>
          <li><img src={`${process.env.PUBLIC_URL}/images/google.png`} alt="구글로그인"  style={{width:'200px',height:'50px'}} /></li>
          </ul>
          {/*---------------------찾기서비스-------------------*/}
          <p 
            id='find' style={{width:'100%'}}> 
            아이디 찾기 | 비번찾기 |&nbsp;  <NavLink to ='/Register2'> 회원가입</NavLink>
          </p>

        </form>
          
          
          <h3>간편가입</h3>
          <ul>
            <li><img src={`${process.env.PUBLIC_URL}/images/kakao.png`} alt="카카오로그인"  id='login_img'/></li>
            <li><img src={`${process.env.PUBLIC_URL}/images/naver.png`} alt="네이버로그인" id='login_img' /></li>
            <li><img src={`${process.env.PUBLIC_URL}/images/google.png`} alt="구글로그인" id='login_img' /></li>
          </ul>
      </div>

        <div>
          <ul>
            <li>로그인 폼을 작성하고 회원가입 버튼을 클릭하면 회원가입 페이지로 이동</li>
            <li>회원가입 시 아이디(username), 비밀번호(password), 이메일(email), 전화번호(tel) 정보를 입력</li>
            <li>회원가입 후, 입력한 정보로 로그인하면 서버에 인증 요청</li>
          </ul>

          <h3>백엔드 구성 (Node.js + Express)</h3>
          <ul>
            <li>사용자가 입력한 아이디와 비밀번호를 POST 방식으로 전달받아 데이터베이스에서 확인</li>
            <li>아이디와 비밀번호가 일치하면 JWT 토큰을 발급하여 인증 처리</li>
            <li>사용자 정보는 MySQL 데이터베이스에 저장</li>
            <li>비밀번호는 bcrypt로 암호화하고, JWT를 통해 인증 상태를 유지</li>
          </ul>

          <h3>용어 설명</h3>
          <ul>
            <li>Express: Node.js 기반의 웹 서버 프레임워크. 라우팅, 미들웨어 등 다양한 기능 제공</li>
            <li>CORS: 다른 도메인에서의 요청을 허용하는 설정 (Cross-Origin Resource Sharing)</li>
            <li>MySQL: 사용자 정보를 저장하는 관계형 데이터베이스. Node.js에서는 mysql 패키지를 사용해 연결</li>
            <li>bcrypt: 사용자의 비밀번호를 안전하게 해시 처리하는 암호화 라이브러리 (npm i bcrypt)</li>
            <li>JWT (JSON Web Token): 로그인 인증을 위해 토큰을 발급하고, 요청 시 토큰을 검증하여 사용자 상태를 확인 (npm i jsonwebtoken)</li>
            <li>app: Express 애플리케이션 인스턴스를 생성하는 객체 (예: const app = express();)</li>
            <li>port: 서버가 클라이언트 요청을 받을 때 사용하는 포트 번호 (예: 3000, 8080 등)</li>
            <li>SECRET_KEY: JWT 서명에 사용하는 비밀 키</li>
            <li>express.json(): JSON 형식의 요청 본문을 파싱하는 미들웨어</li>
            <li>cors(): CORS 정책을 허용하는 미들웨어</li>
            <li>bcrypt.compare: 입력한 비밀번호와 데이터베이스에 저장된 해시된 비밀번호를 비교할 때 사용</li>
          </ul>

          <h3>DB에 입력할 SQL 쿼리문</h3>
          <pre>
              {`CREATE TABLE users2 (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE, 
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                tel VARCHAR(255) NOT NULL,
                datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
              );`}
          </pre>
        </div>

    </div>
  );
}

export default Login2;
