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
import Resumes from './Components/Resumes/Resumes'

import { BrowserRouter as Router, Switch, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import ForgotPassword from './Components/Login/ForgotPassword';
import SecuredPage from './Components/SecuredPage/SecuredPage';


function App() {
  let [questions, setQuestions] = useState(Questions);
  return (
    // <div className='flex-container'>
    //       <FormWrapper>
    //         <Form 
    //           questions={questions} 
    //           setQuestions={setQuestions}
    //         />
    //       </FormWrapper>

    //       <Resumes 
    //         questions={questions} 
    //         setQuestions={setQuestions} 
    //       />
      
          
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path='/'></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/securedpage' element={<SecuredPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
