// React 라이브러리에서 필요한 기능들을 가져옵니다.
import React, { useState } from 'react'; // React 기능과 useState 훅을 가져옴
import axios from 'axios'; // HTTP 요청을 보내기 위한 axios 라이브러리 import
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅 import

// Create 컴포넌트 정의 시작
const Create = () => {
  // 상태(state)를 선언: form 객체에는 상품명(g_name)과 가격(g_cost)을 저장
  const [form, setForm] = useState({
    g_name: '', // 초기값은 빈 문자열
    g_cost: ''  // 초기값은 빈 문자열
  });

  // 페이지 이동을 위한 navigate 함수 생성
  const navigate = useNavigate();

  // input 값이 변경될 때 실행될 함수 정의 (현재는 비어 있음 → 나중에 구현 필요)
  const handleChange = (e) => {e.preventDefault()
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
}

const handleSubmit = (e)=>{
  e.preventDefault();
  axios.post(`http://localhost:9000/goods`);
}  // 컴포넌트가 렌더링할 JSX 반환

axios.post(`http://localhost:9000/goods`)


  return (
    <>
      {/* 섹션: 전체 등록 폼을 감싸는 영역 */}
      <section>
        <h2>상품등록</h2> {/* 제목 표시 */}

        {/* 상품 등록 폼: 실제 서버로 전송하지 않으므로 action은 공백 */}
        <form action="">
          
          {/* 상품명 입력 필드 */}
          <p>
            <label htmlFor="">상품명: </label> {/* 상품명 입력 필드의 라벨 */}
            <input
              name="g_name"                  // 입력 필드의 이름 (form 상태의 g_name과 연결됨)
              value={form.g_name}            // 상태로부터 현재 값을 불러옴
              onChange={handleChange}        // 값이 바뀌면 handleChange 실행
              required                       // 필수 입력 필드임을 명시 (HTML5 속성)
            />
          </p>

          {/* 가격 입력 필드 */}
          <p>
            <label htmlFor="">가격: </label> {/* 가격 입력 필드의 라벨 */}
            <input
              type="number"                  // 숫자만 입력받도록 제한
              name="g_cost"                  // 입력 필드의 이름 (form 상태의 g_cost와 연결됨)
              value={form.g_cost}            // 상태로부터 현재 값을 불러옴
              onChange={handleChange}        // 값이 바뀌면 handleChange 실행
              required                       // 필수 입력 필드임을 명시
            />
          </p>

          {/* 제출 버튼 */}
          <button type="submit">신규 상품 등록</button>
        </form>
      </section>
    </>
  );
}

// 컴포넌트를 외부에서 사용할 수 있도록 export
export default Create;
