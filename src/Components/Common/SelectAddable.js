import { useState, useEffect, useRef } from "react";
import { Input, Select, Space, Divider } from 'antd';
import {Button} from '../Common/Button';
import { PlusOutlined } from '@ant-design/icons';
import { useLanguage } from '../../context/Language'

function SelectAddable({
        handleSelectChange, 
        options,
        addDropdownOption,
      ...other }) 
    {
    const inputRef = useRef(null);
    const [name, setName] = useState('');
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        
        addDropdownOption(name)

        // empty new field
        setName('');
        setTimeout(() => {
        inputRef.current?.focus();
        }, 0);
    };

    let {language: lang} = useLanguage();

    return (
    <Select
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
              <Button type="text" icon={<PlusOutlined />} onClick={(e) => addItem(e)} disabled={!name}>
                Add item
              </Button>
            </Space>
          </>
        )}
        options={options}
        {...other}
    />
  );
}

export default SelectAddable;
