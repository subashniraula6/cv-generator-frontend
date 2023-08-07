import { useState, useEffect, useRef } from "react";
import { Input, Select, Space, Divider } from 'antd';
import Button from '../Wrappers/Button';
import { PlusOutlined } from '@ant-design/icons'

function MultiSelect({ 
        questions, 
        currentSection, 
        currentQuestionIdx, 
        setQuestions, 
        handleSelectChange, 
        question }) 
    {
    const inputRef = useRef(null);
    const [name, setName] = useState('');
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        // add question options
        let updatedQuestions = JSON.parse(JSON.stringify(questions));
        let currentQuesArrIndex = questions[currentSection]["questions"].findIndex(
        (q) => q.index === currentQuestionIdx
        );
        updatedQuestions[currentSection]["questions"][currentQuesArrIndex][
        "options"
        ] += ", " + name;
        console.log("updatedQuestions", updatedQuestions);
        // Update DB
        // Fetch DB and set questions state
        setQuestions(updatedQuestions);

        setName('');
        setTimeout(() => {
        inputRef.current?.focus();
        }, 0);
    };

    return (
    <Select
        mode="multiple"
        placeholder="Inserted are removed"
        onChange={handleSelectChange}
        style={{
          width: '100%',
        }}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: '8px 0',
              }}
            />
            <Space
              style={{
                padding: '0 8px 4px',
              }}
            >
              <Input
                placeholder="Please enter item"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </Space>
          </>
        )}
        options={question.options?.split(',').map((item) => ({
          value: item,
          label: item,
        }))}
    />
  );
}

export default MultiSelect;
