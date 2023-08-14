import React from 'react';
import { message, Popconfirm } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

const PopConfirm = ({confirm}) => (
  <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={(e) => confirm(e)}
    okText="Yes"
    cancelText="No"
  >
    <DeleteFilled>Delete</DeleteFilled>
  </Popconfirm>
);
export default PopConfirm;