// React에서 useState, useEffect 훅을 import
import React, { useState, useEffect } from 'react';
// axios: HTTP 요청을 위한 라이브러리 import
import axios from 'axios';
// useNavigate: 페이지 이동, useParams: URL 파라미터 사용을 위한 훅 import
import { useNavigate, useParams } from 'react-router-dom';

// Update 컴포넌트 정의
function Update(props) {
  // URL에서 상품 코드(g_code) 추출 (예: /goods/123 → g_code: '123')
  const { g_code } = useParams();

  // 상품 정보를 저장할 상태 변수 form 초기화
  const [form, setForm] = useState({
    g_code: '',   // 상품 코드
    g_name: '',   // 상품 이름
    g_cost: ''    // 상품 가격
  });

  // 페이지 이동을 위한 useNavigate 훅 사용
  const navigate = useNavigate();

  // 컴포넌트가 처음 렌더링될 때 또는 g_code가 변경될 때 실행되는 useEffect
  useEffect(() => {
    // 서버에서 해당 상품 정보를 조회하는 GET 요청
    axios.get(`http://localhost:9000/goods/${g_code}`)
      .then(res => {
        console.log('서버 응답값 : ', res.data); // 응답 데이터 콘솔에 출력
        setForm(res.data); // form 상태에 서버에서 받은 상품 정보 저장
      })
      .catch(err => console.log('조회오류 : ', err)); // 에러 시 콘솔에 출력
  }, [g_code]); // g_code가 변경될 때마다 useEffect 재실행

  // 사용자가 input에 값을 입력할 때 호출되는 함수
  const handleChange = (e) => {
    setForm({
      ...form,                        // 기존 form 데이터를 복사하고
      [e.target.name]: e.target.value // 변경된 필드만 업데이트
    });
  };

  // "수정하기" 버튼 클릭 시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작 방지 (오타 수정함: preventDefaulit → preventDefault)

    // 서버에 PUT 요청으로 수정된 상품 정보 전송
    axios.put(`http://localhost:9000/goods/update/${g_code}`, {
      g_name: form.g_name, // 수정된 상품명 전송
      g_cost: form.g_cost  // 수정된 가격 전송
    })
      .then(() => {
        alert('상품정보 수정 완료'); // 성공 시 알림창 출력
        navigate('/goods');         // 상품 목록 페이지로 이동 (주소 수정: './goods' → '/goods')
      })
      .catch(err => console.log('수정오류 : ', err)); // 에러 출력
  };

  // JSX 반환
  return (
    <>
      <h3>goods 상품 수정 페이지</h3>
      <form onSubmit={handleSubmit}> {/* form 태그의 submit 이벤트 연결 */}
        <p>
          <label htmlFor="g_code">코드번호 : </label> {/* htmlFor는 JSX에서 label 연결을 위해 사용 */}
          <input
            name='g_code'
            id="g_code"
            value={form.g_code}
            readOnly // 상품 코드는 수정 불가능하게 읽기 전용 설정
          />
        </p>

        <p>
          <label htmlFor="g_name">상품명 : </label>
          <input
            name="g_name"
            id="g_name"
            onChange={handleChange}   // 입력 변경 시 상태 업데이트
            value={form.g_name}
            required                  // 필수 입력 항목
          />
        </p>

        <p>
          <label htmlFor="g_cost">가격정보 : </label>
          <input
            name="g_cost"
            id="g_cost"
            onChange={handleChange}   // 입력 변경 시 상태 업데이트
            type='number'             // 숫자 입력 필드
            value={form.g_cost}
            required                  // 필수 입력 항목
          />
        </p>

        <button type='submit'>수정하기</button> {/* 클릭 시 handleSubmit 실행 */}
      </form>
    </>
  );
}

// 해당 컴포넌트를 외부에서 사용할 수 있도록 export
export default Update;
