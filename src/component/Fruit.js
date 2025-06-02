import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {AlertContext} from '../AlertContext'; // 알림 컨텍스트 불러오기
function Fruit(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
  // 페이지 초기값은 1
  const [currentPage, setCurrentPage] = useState(1) 
  // 한 페이지에 보여지는 게시글 갯수
  const itemsPerPage = 5; 
  //페이지 계산 공식 현재 게시물 수 56개 /5 = 12페이지
  const indexOfLast = currentPage * itemsPerPage;
  //현재 페이지의 첫 인덱스 번호를 계산 10-5 =5
  const indexOfFirst = indexOfLast - itemsPerPage;
  //data배열 중 현재 페이지에 해당하는 부분만 잘라내기. 
  const currentItems = data.slice(indexOfFirst,indexOfLast);
  //전체 페이지 수 = math.ceil(13/5)=3
  const totalPage = Math.ceil(data.length/itemsPerPage);
  //시작번호화 끝번호를 계산해야한다
  let startPage = Math.max(1, currentPage-2);
  let lastPage = Math.min(totalPage, startPage+4);

  //페이지 번호 배열(원래 1~5고정인데 동적으로 바꿔야함)
  //const pageNumbers = Array.from({length:Math.min(totalPage, 5)}, (_,i)=> i+1)
  const pageNumbers = Array.from({length:lastPage - startPage+1}, (_,i)=> startPage+i);

  useEffect(() => {
    if ((currentPage - 1) * itemsPerPage >= data.length && currentPage > 1) {
      setCurrentPage(prev => prev - 1); // 안정적으로 이전값 사용
    }
  }, [data]);
  const loadData=()=>{
     //비동기통신
      axios
      //db에서 json 데이터 불러오기
      .get('http://localhost:9000/fruit')
      //성공시 데이터를 변수에 저장
      .then(res => {
        setData(res.data); // 요청 성공 시 응답 데이터로 상태를 업데이트
        setFruitsCount(res.data.length); // 상품 개수 업데이트
      })
      //실패시 에러 출력
      .catch(err=>console.log(err))
    }
    //리액트 훅 useEffect를 사용해 컴포넌트가 처음 마운트되었을 경우에만 loadData 함수를 실행
    useEffect(()=>{
      loadData();
    },[]);

    const {setFruitsCount} = useContext(AlertContext); // 알림 컨텍스트에서 setFruitCount 함수 가져오기
  return (
    <>
      <section>
        <h2>Fruit</h2>
        <table>
          <caption>과일 정보 목록</caption>
          <thead>
            <tr>
              <th>번호</th>
              <th>과일명</th>
              <th>가격</th>
              <th>색깔</th>
              <th>국가</th>
              <th></th>
            </tr>
          </thead>
            <tbody>
              {data.length >0 ? (
                currentItems.map((item)=>(
              <tr key={item.num}>
                <td>{item.num}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.color}</td>
                <td>{item.country}</td>
                <td>  
                  <button>수정</button>&nbsp;
                  <button>삭제</button>
                </td>
              </tr>
                ))
              ):(
                <tr>
                  <td colSpan={6}>데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
        </table>
        <p id="numbers">
          {/**이전버튼 출력되는 곳 */}
          {currentPage >1 &&(
            <button 
            onClick={()=>{setCurrentPage(currentPage-1)}}
            >이전</button>
          )}
          {/**페이지번호 12345가 출력되는 곳 */}
          {pageNumbers.map(number=>(
                <button 
                key={number}
                style={
                  {
                    marginRight:'5px',
                    background: currentPage===number? '#4caf50' : '#f0f0f0',
                    color: currentPage === number? '#fff' : '#000',
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius:'4px'
                  }
                }
                onClick={()=>setCurrentPage(number)}
                >
                  {number}
                </button>
                
          ))
        }
          {/**다음버튼 출력되는 곳 */}
          {currentPage <totalPage &&(
            <button 
            onClick={()=>{setCurrentPage(currentPage+1)}}
            >다음</button>
          )}
        </p>
        <p>
          <button onClick={()=> navigate('/fruit/create3')}>상품등록</button>
        </p>
      </section>
    </>
  );
}

export default Fruit;