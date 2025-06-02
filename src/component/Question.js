import React, {useState} from 'react'; //리액트 훅
import axios from 'axios'; //서버측과 통신


function Question({ onQuestionSubmit }) {
  const [formData, setFormData] = useState({
    // 변수1:'값',
    // 변수2:'값',
    // 변수3:'값',
    // 변수4:'값',
    name:'',
    tel:'',
    email:'',
    text:'',
    });
    //입력박스에 사용자가 입력시 함수 호출
  const handleChange = (e)=>{
    const{name, value} = e.target
    setFormData(prev => ({...prev, [name]:value }))
  }

  const handleSubmit = async e =>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:9000/question/', formData);
      alert('질문 등록 성공');
      setFormData({name:'', tel:'', email:'', text:''}); //질문 등록 성공 후에 변수값 초기화
      onQuestionSubmit(); // 질문 등록 성공 시 부모 컴포넌트의 상태 업데이트
    }catch{
      alert('질문 등록 실패');
    }
  }
  //서버측에 post방식으로 데이터를 넘기기 위한 내용

  

  return (
    <section id='question'>
        <form onSubmit={handleSubmit}>
          <h2 id='form_title'>정성을 다해 답변을 해드리겠습니다.</h2>
          <div className='form_wrapper'>
            <div className='left_form'>
              <p>
                <label htmlFor="name">성함</label>
                <input type="text" id='name' name='name' placeholder='성함을 입력해주세요' value={formData.name} onChange={handleChange} required />
              </p>

              <p>
                <label htmlFor="tel">전화번호</label>
                <input type="tel" id='tel' name='tel' placeholder='성함을 입력해주세요' value={formData.tel} onChange={handleChange} required />
              </p>

              
              <p>
                <label htmlFor="email">이메일</label>
                <input type="email" id='email' name='email' placeholder='이메일을 입력해주세요' value={formData.email} onChange={handleChange} required />
              </p>
            </div>

            <div className='right_form'>
                <label htmlFor="text">내용</label>
                <textarea name="text" id="text" rows={10} cols={47} onChange={handleChange} value={formData.text} required></textarea>
            </div>
           
            
         </div>
         <div className='agree'>
              <input type="checkbox" required id='agree' />
              <label htmlFor="agree">개인정보처리방침에 동의</label>
              <input type="submit" value="문의제출" />
            </div>
         
        </form>
    </section>
  );
}

export default Question;