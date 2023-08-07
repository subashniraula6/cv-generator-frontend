import './App.css';
import Form from './Components/Form/Form';
import Resume from './Components/Resume/Resume';
import 'antd/dist/reset.css';
import { Row, Col, Space } from 'antd';
import { useState } from 'react';
import Questions from "./Questions";
import { ResumeWrapper, FormWrapper } from './Components/Wrappers/Wrappers'

function App() {
  let [questions, setQuestions] = useState(Questions);
  return (
    <div className='flex-container'>
          <FormWrapper>
            <Form 
              questions={questions} 
              setQuestions={setQuestions}
            />
          </FormWrapper>
      
          <ResumeWrapper>
            <Resume 
              questions={questions} 
              setQuestions={setQuestions}
            />    
          </ResumeWrapper>
    </div>
  );
}

export default App;
