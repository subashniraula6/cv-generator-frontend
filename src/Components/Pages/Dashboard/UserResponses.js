import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';

const { Search } = Input;

const UserQuestions = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [pagination.current, search]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/user_questions?page=${pagination.current}&per_page=${pagination.pageSize}&query=${search}`
      );
      const result = await response.json();
      setData(result.items);
      setPagination({
        ...pagination,
        total: result.total,
      });
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Create a custom row rendering function
  const expandedRowRender = (record) => {
    const questions = record.all_sections_data.map((item) => ({
      key: item.question,
      question: item.question,
      answer: item.answer,
    }));

    const childColumns = [
      { title: 'Question', dataIndex: 'question', key: 'question' },
      { title: 'Answer', dataIndex: 'answer', key: 'answer' },
    ];

    return (
      <Table
        columns={childColumns}
        dataSource={questions}
        pagination={false} // Optional: You can remove pagination for child tables
      />
    );
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Email',
      dataIndex: 'user_email',
      key: 'user_email',
    },
  ];

  return (
    <div className='table-container'>
      <h1>User Questions</h1>
      <Search
        placeholder="Search questions"
        onSearch={handleSearch}
        style={{ marginBottom: '16px' }}
      />
      <Table
        columns={columns}
        expandable={{expandedRowRender}}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        rowKey={(record, index) => index}
      />
    </div>
  );
};

export default UserQuestions;
