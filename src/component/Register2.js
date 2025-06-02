import React, {useState} from 'react';
import axios from 'axios';

function Register2(props) {

  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    tel: ''
  });
 const handleChange = (e) => {
  setForm({...form, [e.target.name]:e.target.value});
  };
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();


  try{
    const res = await axios.post('http://localhost:9000/register2', {
      username:form.username,
      password:form.password,
      email:form.email,
      tel:form.tel
    });

  setSuccess('회원가입 성공!');
  setForm({username:'', password:'', email:'', tel:''});
  
  } catch(err){
    console.error('회원가입 중 오류 발생:', err);
    setError('회원가입에 실패했습니다. 다시 시도해주세요.');
  }

}

  return (
    <div>
      <h2>회원가입</h2>
      <form action="" onSubmit={handleSubmit} method='post' style={{textAlign:'center', marginTop: '50px'}}>
      <p style={{width:'100%'}}>
        <label htmlFor="username" style={{fontSize:'30px'}}>👔</label>
          <input  style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'20px'}}
            type="text"
            name="username"
            placeholder="아이디"
            required
            value={form.username}
            onChange={handleChange}
            id="username"
          />
        </p>
        <p style={{width:'100%'}}>
        <label htmlFor="password" style={{fontSize:'30px'}}>🔑</label>
          <input  style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'20px'}}
            type="password"
            name="password"
            id='password'
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호"
            required
          />
        </p>
        <p style={{width:'100%'}}>
          <label htmlFor="email"  style={{fontSize:'30px'}}>🖨</label>
          <input  style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'20px'}}
          id='email'
            type="email"
            name="email"
            value={form.eamli}
            onChange={handleChange}
            placeholder="example@example.com"
            required
          />
        </p>
        <p style={{width:'100%'}}>
          <label htmlFor="tel"  style={{fontSize:'30px'}}>📱</label>
          <input  style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc', marginLeft:'20px'}}
          id='tel'
            type="tel"
            name="tel"
            value={form.tel}
            onChange={handleChange}
            placeholder="010-0000-0000"
            required
          />
        </p>
        <p style={{width:'100%'}}>
          <input 
          type="submit" 
          value="회원가입"
          style={{
            backgroundColor: '#28a745', 
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'center',
            width: '100%',}}
           />
        </p> 
        {error && <p style={{color: 'red', width:'100px' }}>{error}</p>}
        {success && <p style={{color: 'green', width:'100px'}}>{success}</p>}
      </form>
    </div>
  );
}

export default Register2;