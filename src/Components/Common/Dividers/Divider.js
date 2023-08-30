import styled from 'styled-components';

const CircleDevider = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0;
`;

const CircleDeviderLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
  margin-right: 10px;
`;

const CircleDeviderCurve = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ccc;
  border-radius: 50%;
  transform: rotate(-45deg);
  position: relative;
`;

const CircleDeviderCurveInner = styled.div`
  content: "";
  width: 6px;
  height: 6px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CircleDeviderMask = styled.div`
  overflow: hidden;
  height: 20px;
  
  &:after {
    content: '';
    display: block;
    margin: -25px auto 0;
    width: 100%;
    height: 25px;
    border-radius: 125px / 12px;
    box-shadow: 0 0 8px #049372;
  }
`;

const CircleDeviderSpan = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 100%;
  margin-bottom: -25px;
  left: 50%;
  margin-left: -25px;
  border-radius: 100%;
  box-shadow: 0 2px 4px #4fb39c;
  background: #fff;
`;

const CircleDeviderI = styled.div`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  right: 4px;
  border-radius: 100%;
  border: 1px dashed #68beaa;
  text-align: center;
  line-height: 40px;
  font-style: normal;
  color: #049372;
`;
const Divider=()=>{
return   (
    <CircleDevider>
      <CircleDeviderLine />
      <CircleDeviderCurve>
        <CircleDeviderCurveInner />
      </CircleDeviderCurve>
      <CircleDeviderLine />
    </CircleDevider>
  );
}
export  default Divider
