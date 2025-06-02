// React 및 필요한 훅과 라이브러리 import. React 사용 및 상태 관리를 위한 useState 훅 
import React, { useState } from 'react';
// HTTP 요청을 위한 axios 라이브러리 import  
import axios from 'axios'; 
// 페이지 이동을 위한 useNavigate 훅 import
import { useNavigate } from 'react-router-dom'; 

// Create3 컴포넌트 정의
function Create3(props) {

  // 페이지 이동을 위한 navigate 함수 생성
  const navigate = useNavigate();

  // 입력값이 변경될 때 호출되는 함수
  const handleChange = (e) => {
   // 기본 이벤트(예: 폼 제출) 방지
    e.preventDefault(); 
    setForm({
      ...form,  // 기존 form 상태를 복사하고
      [e.target.name]: e.target.value // 이벤트가 발생한 input의 name 속성에 해당하는 값을 갱신
    });
  };

  // 상태(state) 선언 - 초기값은 빈 문자열로 구성된 form 객체
  const [form, setForm] = useState({
    name: '',    // 상품명
    price: '',   // 가격
    color: '',   // 컬러
    country: '', // 원산지
  });

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작(페이지 새로고침 등) 방지
    axios.post('http://localhost:9000/fruit', form) // 서버에 form 데이터를 POST 요청으로 전송
      .then(() => {
        alert("등록 성공!"); // 성공 메시지 표시
        navigate('/fruit'); // '/fruit' 페이지로 이동
      })
      .catch(err => {
        console.error("등록 실패:", err); // 에러 콘솔에 출력
        alert("등록 실패"); // 실패 메시지 표시
      });
  };

  // 컴포넌트 렌더링 (JSX 반환) - 과일 정보 등록을 위한 폼
  return (
    <>
      <h3>상품등록</h3> {/* 제목 */}
      <form onSubmit={handleSubmit}> {/* 폼 제출 이벤트 처리 */}
        <p>
          <label htmlFor="name">상품명 :</label>
          <input
            type="text"
            name='name'
            id='name'
            value={form.name}
            onChange={handleChange} // 입력값 변경 시 handleChange 호출
          />
        </p>

        <p>
          <label htmlFor="price">가격 :</label>
          <input
            type="text"
            name='price'
            id='price'
            value={form.price}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="color">컬러 :</label>
          <input
            type="text"
            name='color'
            id='color'
            value={form.color}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="country">원산지 : </label>
          <select
            name="country"
            id="country"
            value={form.country}
            onChange={handleChange}
          >
            {/* 선택 가능한 원산지 옵션들 */}
            <option value="">-----원산지 선택-----</option>
            <option value="대한민국">대한민국</option>
            <option value="필리핀">필리핀</option>
            <option value="중국">중국</option>
            <option value="미국">미국</option>
            <option value="태국">태국</option>
            <option value="말레이시아">말레이시아</option>
            <option value="일본">일본</option>
          </select>
        </p>

        <button type='submit'>등록완료</button> {/* 폼 제출 버튼 */}
      </form>
    </>
  );
}

export default Create3; // 컴포넌트를 외부에서 사용할 수 있도록 export
