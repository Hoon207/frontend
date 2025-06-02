import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create2(props) {
const[form, setForm] = useState({
  NAME:'',
  ARENA1:'',
  ARENA2:'',
  ARENA3:'',
  BOOK_CNT:'',
  OWNER_NM:'', 
  TEL_NUM:''  
})

const navigate = useNavigate();
const handleChange =(e)=>{
  e.preventDefault();
  setForm({
    ...form,  
    [e.target.name]: e.target.value
  })
}

const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:9000/books', form)
    .then(() => {
      alert("등록 성공!");
      navigate('/books');
    })
    .catch(err => {
      console.error("등록 실패:", err);
      alert("등록 실패");
    });
};


  return (
    <>
      <h2>재고 정보 등록</h2>
      <form action="" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="">서점명</label>
          <input type="text" name='NAME' value={form.NAME}
          onChange={handleChange} />
        </p>

        <p>
          <label htmlFor="">지역1</label>
          <input type="text"
          name='ARENA1'
          value={form.ARENA1}
          onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="">지역2</label>
          <input type="text" 
          value={form.ARENA2}name='ARENA2'
          onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="">지역3</label>
          <input type="text"
          value={form.ARENA3} name='ARENA3'
          onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="">책 권수</label>
          <input type="number"
          value={form.BOOK_CNT}  name="BOOK_CNT" 
          onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="">담당자명</label>
          <input type="text"
          value={form.OWNER_NM}
          name="OWNER_NM"
          onChange={handleChange} />
        </p>

        <p>
          <label htmlFor="">전화번호</label>
          <input type="text" 
          value={form.TEL_NUM}
          name="TEL_NUM"
          onChange={handleChange}
          />
        </p>
        <button type="submit">신규등록</button>
      </form>
    </>
  );
}

export default Create2;