import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const { Text } = Typography;

const UserResponses = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState({});
  const [searchedColumns, setSearchedColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  let searchInputs = {};

  useEffect(() => {
    fetchUserQuestions();
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchUserQuestions = () => {
    setLoading(true);
    const { current, pageSize } = pagination;

    const queryParams = new URLSearchParams();
    queryParams.append('page', current);
    queryParams.append('per_page', pageSize);

    // Append separate queries for each column
    for (const columnKey in searchText) {
      if (searchText[columnKey]) {
        queryParams.append(columnKey, searchText[columnKey]);
      }
    }

    fetch(`http://localhost:5000/user_questions?${queryParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.questions_and_answers);
        setPagination({
          ...pagination,
          total: data.total_items,
        });
        setLoading(false);
      });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInputs[dataIndex] = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : false,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputs[dataIndex].select(), 100);
      }
    },
    render: (text) =>
      searchedColumns.includes(dataIndex) ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText[dataIndex]]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    const newSearchText = { ...searchText, [dataIndex]: selectedKeys[0] };
    setSearchText(newSearchText);
    setSearchedColumns([...searchedColumns, dataIndex]);
    setPagination({ ...pagination, current: 1 });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText({});
    setSearchedColumns([]);
    setPagination({ ...pagination, current: 1 });
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      ...getColumnSearchProps('question'),
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
      ...getColumnSearchProps('answer'),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Text type="secondary">Search by User ID, Question, or Answer:</Text>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default UserResponses;
