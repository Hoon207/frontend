import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState(''); // 에러 상태 추가

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // 제출 시 에러 초기화

    try {
      const res = await axios.post('http://localhost:9000/login', form);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token); // JWT 토큰 저장
        alert('로그인 성공');
        // 로그인 성공 후 추가 처리 (예: 리다이렉트 등)
      } else {
        setError(res.data.message || '로그인 실패');
      }
    } catch (err) {
      console.error('로그인 중 오류 발생:', err);
      setError('서버 오류 또는 네트워크 오류');
    }
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <dl>
        <dt>로그인 구현 전체 구성</dt>
        <dd>프론트엔드: 로그인 폼 작성, 로그인 버튼 클릭시 서버에 인증 요청</dd>
        <dd>백엔드(node.js: 백엔드 환경 구축, express: 데이터 처리 + DB 통신 + API 제공) 결론적으로는 로그인 처리, jwt토큰발급</dd>
        <dd>데이터베이스(mysql) : DB입/출력</dd>
        <dd><b>JWT (JSON Web Token)</b>는 웹에서 인증(Authentication)을 위해 사용되는 토큰 기반 인증 방식.</dd>
        <dd>보안 비밀번호는 bcrypt로 암호화하고 jwt로 인증을 유지</dd>
      </dl>

      <h2>로그인(DB:users)</h2>
      <form onSubmit={handleSubmit} method="post" style={{textAlign:'left'}}>
      <p style={{width:'277px'}}>
          <label htmlFor="username" style={{fontSize:'30px'}}>👔</label>
          <input
          style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'20px'}}
            type="text"
            name="username"
            placeholder="아이디"
            required
            onChange={handleChange}
            value={form.username}
          />
        </p>
        <p style={{width:'277px'}}>
          <label htmlFor="password" style={{fontSize:'30px'}}>🔑</label>
          <input
          style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'20px'}}
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            onChange={handleChange}
            value={form.password}
          />
        </p>
        <p>
          <input
          type='submit'
          value="로그인"
          style={{
            backgroundColor: '#28a745',  // 문자열로 처리
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'center',
            
          }}
      />
        </p>
        {error && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>로그인 실패: {error}</p>
        )}
      </form>
      <p className="idpw">아이디 찾기 | 비번찾기 | 회원가입</p>
    </section>
  );
}

export default Login;
