import React, { useState, useRef } from "react";
import { Table, Input, Button, Icon } from "antd";
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from "react-highlight-words";

const DataTable = props => {
  const { dtConfigColumns, items, handleTableChange, loading } = props;
  const [searchText, setSearchText] = useState("");
  const textSearchInput = useRef(null);

  /*** Start: Table Search Columns by Text ***/
  const tableColumnTextSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={textSearchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => searchTableColumnText(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => searchTableColumnText(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => resetTableColumnText(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => textSearchInput.current.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    )
  });

  const searchTableColumnText = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const resetTableColumnText = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  const confColumns = dtConfigColumns.map((value, index) => {
    if (value.hasOwnProperty("textFilter") && value.textFilter) {
      return { ...value, ...tableColumnTextSearchProps(value.dataIndex) };
    }
    return value;
  });
  /*** End: Table Search Columns by Text ***/
  return (
    <Table
      rowKey="id"
      bordered
      size="middle"
      dataSource={items}
      loading={loading}
      columns={confColumns}
      onChange={handleTableChange}
    />
  );
};
export default DataTable;
