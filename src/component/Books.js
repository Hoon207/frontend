import React, { useState, useEffect, useContext } from 'react'; // useState 추가 임포트 필요
import axios from 'axios';        
import { useNavigate } from 'react-router-dom';
import {AlertContext} from '../AlertContext'; // 알림 컨텍스트 불러오기
function Books(props) {
  // 상태 변수 data, 빈 배열 초기화
  const [data, setData] = useState([]); 
  // 페이지 이동 훅
  const navigate = useNavigate();  
  // 서버에서 책 데이터 불러오는 함수
  const {setBooksCount} = useContext(AlertContext); 
  // 이 함수는 상품 개수를 업데이트하는 데 사용됨
  const loadData = () => {
    axios
      .get('http://localhost:9000/books')   // 백엔드 /books API 호출
      .then(res => {
        setData(res.data); // 요청 성공 시 응답 데이터로 상태를 업데이트
        setBooksCount(res.data.length); // 상품 개수 업데이트
      })
      .catch(err => console.log('데이터 요청 오류:', err)); 
  };

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);
  const totalPage = Math.ceil(data.length/itemsPerPage);
  let startPage = Math.max(1,currentPage-2);
  let lastPage=Math.min(totalPage, startPage+4);
  const pageNumbers = Array.from({length:lastPage - startPage+1}, (_,i)=> startPage+i);
  
  useEffect(() => {
    loadData();
  }, []);

  // 삭제
  const deleteData = (CODE) => {
    if(window.confirm("정말 삭제하시겠습니까?")){
      axios
        .delete(`http://localhost:9000/books/${CODE}`)
        .then(() => {
          alert("삭제되었습니다.");
          const newData = data.filter(item => item.CODE !== CODE);
          setData(newData);
          setBooksCount(newData.length);  // 삭제 후 카운트도 업데이트
        })
        .catch(err => console.log('삭제 오류:', err));
    }
  };

  return (
    <>
      <h2>교보문고</h2>
      <table border="0">
        <caption>교보문고 데이터</caption>
        <thead>
          <tr>
            <th>코드</th>
            <th>서점명</th>
            <th>지역1</th>
            <th>지역2</th>
            <th>지역3</th>
            <th>권수</th>
            <th>담당자명</th>
            <th>전화번호</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.CODE}>
                <td>{item.CODE}</td>
        <td>{item.NAME}</td>
        <td>{item.ARENA1}</td>
        <td>{item.ARENA2}</td>
        <td>{item.ARENA3}</td>
        <td>{Number(item.BOOK_CNT).toLocaleString()}권</td>
        <td>{item.OWNER_NM}</td>
        <td>{item.TEL_NUM}</td>
                <td>
                  <button onClick={() => navigate(`/books/update2/${item.CODE}`)}>수정</button>
                </td>
                <td>
                  <button onClick={() => deleteData(item.CODE)}>삭제</button>
                </td>
             
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: 'center' }}>데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div id="pagination">
      {pageNumbers.map(number=>(

        <button
        key={number}
        style={{
          marginRight:'5px',
          background: currentPage===number? '#006aff' : '#f0f0f0',
          color: currentPage === number? '#fff' : '#000',
          padding: '5px 10px',
          border: '1px solid #ccc',
          borderRadius:'4px'
        }}
        onClick={()=>setCurrentPage(number)}
        >{number}
        </button>
      ))}
      </div>

      <p style={{ marginTop: '10px' }}>
        <button onClick={() => navigate('/books/create')}>상품등록</button>
      </p>

    </>
  );
}

export default Books;
