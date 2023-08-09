import Resume from "../Resume/Resume";
import Resume2 from "../Resume/Resume2/Resume2";
import Resume3 from "../Resume/Resume3/Resume3";
import { ResumeWrapper } from '../Wrappers/Wrappers'

function Resumes({ questions, setQuestions }) {
  return (
    <div>
      <ResumeWrapper>
        <Resume questions={questions} setQuestions={setQuestions} />
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

export default Resumes;
