// React 및 Hook 불러오기 (상태 관리, 생명주기 관리용)
import React, { useState, useEffect, useContext } from 'react';  
 // HTTP 요청을 위한 axios 라이브러리 불러오기
import axios from 'axios';                           
// 페이지 이동을 위한 훅 불러오기
import { useNavigate } from 'react-router-dom';      
import {AlertContext} from '../AlertContext'; // 알림 컨텍스트 불러오기

function Goods(props) {
   // data 상태 변수 선언, 초기값은 빈 배열 (상품 목록 저장)
  const [data, setData] = useState([]);             
  // 페이지 이동 함수 생성
  const navigate = useNavigate();      
  // AlterContext에서 setGoodsCount 함수 가져오기
  // 이 함수는 상품 개수를 업데이트하는 데 사용됨
  const {setGoodsCount} = useContext(AlertContext); 
  
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const itemsPerPage = 7; // 한 페이지에 표시할 아이템 수 설정
  // 서버에서 상품 데이터 목록을 불러오는 함수
  const loadData = () => {
    axios
      .get('http://localhost:9000/goods') // 백엔드 /goods API GET 요청
      .then(res => {
        setData(res.data); // 요청 성공 시 응답 데이터로 상태를 업데이트
        setGoodsCount(res.data.length); // 상품 개수 업데이트
      })
      .catch(err => {
        console.log('데이터 요청 오류:', err); // 실패 시 에러 로그 출력
      });
  };

  // 컴포넌트가 처음 마운트 되었을 때 한 번만 실행되는 useEffect
  useEffect(() => {
    loadData(); // 컴포넌트 로딩 시 상품 데이터를 불러옴
  }, []);       // 빈 배열: 최초 1회 실행만

  // 특정 g_code에 해당하는 상품을 삭제하는 함수
  const deleteData = (g_code) => {
    // 삭제 전 사용자 확인창 띄우기
    if(window.confirm("정말 삭제하시겠습니까?")){
      // 해당 상품 삭제 요청 (DELETE)
      axios
        .delete(`http://localhost:9000/goods/${g_code}`)  
        .then(res => {
          alert("삭제되었습니다.");  // 삭제 완료 알림 띄우기
          // 삭제된 상품을 제외한 새 배열로 상태 업데이트
          setData(data.filter(item => item.g_code !== g_code)); 
        })
        // 삭제 실패 시 에러 로그 출력
        .catch(err => console.log('삭제 오류:', err));     
    }
  };

  //페이지네이션 계산 : 현재 게시물 수 50개 /7 => 8페이지
  //현재 페이지의 마지막 인덱스 번호 2*5=10 이면 10번째 아이템까지 보여주겠다는뜻
  const indexOfLast = currentPage * itemsPerPage; 
  //현재 페이지의 첫 인덱스 번호를 계산 10-5=5 이면 5번째 ~9번째 아이템 보여줌
  const indexOfFirst = indexOfLast - itemsPerPage;
//data배열 중 현재 페이지에 해당하는 부분만 잘라내기
const currentItems = data.slice(indexOfFirst,indexOfLast);
//전체페이지수  totalpage = math.ceil(13/5)= 3;
const totalPage = Math.ceil(data.length/itemsPerPage);  
const pageNumbers = Array.from({length:Math.min(totalPage,5)},(_,i)=> i+1); 
  return (
    <>
      <section>
        <h2>Goods</h2> {/* 섹션 제목 */}
        <table style={{ borderCollapse: 'collapse' }}>
          <caption>아이템 목록</caption> {/* 표 제목 */}
          <thead>
            <tr>
              {/* 표 머리글: 상품코드, 이름, 가격 */}
              <th>상품코드</th>
              <th>상품명</th>
              <th>가격</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? ( // 데이터가 있으면 map으로 행 생성
              currentItems.map((data) => (
                <tr key={data.g_code}> {/* 고유 key로 React 최적화 */}
                  <td>{data.g_code}</td> {/* 상품 코드 출력 */}
                  <td>{data.g_name}</td> {/* 상품 이름 출력 */}
                  {/* 상품 가격을 숫자형으로 변환 후 천 단위 구분자 표시 */}
                  <td>{Number(data.g_cost).toLocaleString()}원</td>

                  <td>
                    {/* 수정 버튼: 클릭 시 수정 페이지로 이동 */}
                    <button onClick={() => navigate(`/goods/update/${data.g_code}`)}>수정</button>&nbsp;
                    {/* 삭제 버튼: 클릭 시 deleteData 함수 실행 */}
                    <button onClick={() => { deleteData(data.g_code) }}>삭제</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                {/* 데이터가 없을 때 출력할 행: colspan=4로 셀 병합 */}
                <td colSpan="4">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{
  marginTop: '20px',
  textAlign: 'center',

}}>

  {pageNumbers.map(number => (
    <button
      key={number}
      onClick={() => setCurrentPage(number)}
      style={{
        marginRight: '5px',
        backgroundColor: currentPage === number? '#4caf50' : '#f0f0f0',
        color: currentPage === number ? '#fff' : '#000',
        padding: '5px 10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {number}
    </button>
  ))}
</div>
        {/* 상품등록 버튼: 오른쪽 정렬, 클릭 시 등록 페이지로 이동 */}
        <p style={{
          textAlign:'right', width:'440px'
        }}>
          <button onClick={() => navigate(`./create`)}>상품등록</button>
        </p>
      </section>
    </>
  );
}

export default Goods; // Goods 컴포넌트 외부로 내보내기 (다른 파일에서 import 가능)
