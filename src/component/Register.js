import React, { useState } from 'react';
import axios from 'axios';

function Register(props) {
  // 1. 변수 선언
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  // 2. 에러, 성공 메시지 상태 변수 선언
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 3. 입력값 변경 시
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // 4. 내용 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:9000/register', {
        username: form.username,
        password: form.password
      });

      setSuccess('회원가입 성공!');
      setForm({ username: '', password: '', confirmPassword: '' }); // 입력 초기화
    } catch (err) {
      console.error('회원가입 중 오류 발생:', err);
      setError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <section>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} style={{textAlign:'left', marginTop: '50px'}}>
        <p style={{width:'271px'}}>
          <label htmlFor="username" style={{fontSize:'30px'}}>👔</label>
          <input
          style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'20px'}}
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            placeholder="아이디"
            required
          />
        
        </p>

        <p style={{width:'271px'}}>
          <label htmlFor="password" style={{fontSize:'30px'}}>🔑</label>
          <input
          style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'20px'}}
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호"
            required
          />
        </p> 

        <p style={{width:'271px'}}>
          <label htmlFor="confirmPassword" style={{fontSize:'50px'}}>🗝</label>
          <input
          style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'10px'}}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 확인"
            required
          />
        </p>

        <p>
          <input type="submit" value="회원가입" style={{border:'none', background:'green', padding:'10px', color:'white', borderRadius:'15px'}} />
        </p>

        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>회원가입 실패: {error}</p>}
        {success && <p style={{ color: 'green', fontWeight: 'bold' }}>{success}</p>}
      </form>
    </section>
  );
}

export default Register;
