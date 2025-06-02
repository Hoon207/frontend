import React from 'react';

function Main(props) {
  return (
    <>
     <section>
        <h2>Home</h2>
        <dl>
          <dt>＜기능추가사항＞</dt>
          <dd>create : 새로운 페이지로 이동하여 자료 입력</dd>
          <dd>update  : 수정 페이지로 이동하여 자료 수정</dd>
          <dd>delete  : 해당 id값에 일치하는 자료 삭제 요청</dd>
          <dd>delete  : 해당 id값에 일치하는 자료 삭제 요청</dd>
          <dd>페이지네이션: 모든 데이터를  페이지별로 나눔. 서버의 부담을 줄이고 컨텐츠를 쉽게 탐색, 관리</dd>
        </dl>
        
        <ul>
        <h4>페이지네이션 주요기능</h4>
          <li>데이터 분할</li>
          <li>페이지이동: 페이지번호 링크로 사용자가 원하는 페이지로 이동</li>
          <li>현재 페이지: 사용자가 현재 보고 있는 페이지를 강조표시 해줌</li>
          <li>페이지 간 이동: 이전, 다음 페이지로 이동</li>
          <li>페이지 당 게시물 개수 조정</li>
          <li>사용자 경험 향상, 서버부담 감소, ui디자인의 단순화 장점</li>
        </ul>
      </section> 
    </>
  );
}

export default Main;