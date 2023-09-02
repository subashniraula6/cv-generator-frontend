import React from "react";
import { Drawer, Form } from "antd";
import { Button } from "../../Common/Button"
import { formGenerator } from "./utility";

const FormDrawer = props => {
  const {
    objName,
    formElementsArray,
    submitting,
    onChange,
    onInjectValue,
    formIsValid,
    onSubmit,
    onToggle,
    isVisible,
    addDropdownOption
  } = props;
  let form = formGenerator(formElementsArray, onChange, onInjectValue, addDropdownOption);
  return (
    <>
      <Drawer
        title={`${window.location.hash} ${objName}`}
        width={720}
        onClose={onToggle}
        visible={isVisible}
      >
        <Form
          onFinish={onSubmit}
          hideRequiredMark={false}
          style={{ paddingBottom: "30px" }}
        >
          {form}

          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              disabled={!formIsValid}
              loading={submitting}
            >
              Submit
            </Button>{" "}
            <Button key="back" onClick={onToggle} style={{ marginRight: 8 }}>
              Return
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default FormDrawer;
