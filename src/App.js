import './App.css';
import Form from './Components/Form/Form';
import Resume from './Components/Resume/Resume';
import 'antd/dist/reset.css';
import { Row, Col, Space } from 'antd';

function App() {
  return (
      <Space>
        <Row>
          <Col>
            <Form />
          </Col>
          <Col>
            <Resume />    
          </Col>
        </Row>
      </Space>
  );
}

export default App;
