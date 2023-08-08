import './App.css';
import Form from './Components/Form/Form';
import Resume from './Components/Resume/Resume';
import Resume2 from './Components/Resume/Resume2/Resume2';
import Resume3 from './Components/Resume/Resume3/Resume3';
import 'antd/dist/reset.css';
import { Row, Col, Space } from 'antd';
import { useState } from 'react';
import Questions from "./Questions";
import { ResumeWrapper, FormWrapper } from './Components/Wrappers/Wrappers'

function App() {
  let [questions, setQuestions] = useState(Questions);
  return (
    <div>
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

          <ResumeWrapper>
            <Resume2 />
          </ResumeWrapper>
          
          <ResumeWrapper>
            <Resume3 />
          </ResumeWrapper>
    </div>
  );
}

export default App;
