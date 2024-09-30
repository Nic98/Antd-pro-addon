import {
  Layout, Menu, Breadcrumb, Icon, Table, Divider, Tag
} from 'antd';
import React, { Component, PropTypes } from 'react';

import { SearchOutlined } from '@ant-design/icons'	

// const columns = [{
//   title: 'Name',
//   dataIndex: 'name',
//   key: 'name',
// }, {
//   title: 'Age',
//   dataIndex: 'age',
//   key: 'age',
// }, {
//   title: 'Address',
//   dataIndex: 'address',
//   key: 'address',
// }, {
//   title: 'Action',
//   key: 'action',
//   render: (text, record) => (
//     <span>
//       <a href="javascript:;">编辑</a>
//       <Divider type="vertical" />
//       <a href="javascript:;">删除</a>
//     </span>
//   ),
// }];

export default function Warehouse() {
  // DidMount send ajax actios !!
  // 请求发送成功 和 失败后 数据注入到redux
  //  UserComponent 升级为 被redux connect 的一个高阶组件 就像登录页一样数据的规范 尽量使用
  // 要去封装数据 成 antd columns dataSource 一一对应的方式
  // 另一种做法简单的就是 发完请求, 数据直接回填setstate到本页的state 用state去取


  // express nodejs 数据库 要做什么
  // 1: 你批量多搞几条数据 好测试
  // 2: count 总数
  const [dataSource, setDataSource] = useState([data]);
  const [value, setValue] = useState('');

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={value}
      onChange={e => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = data.filter(entry =>
          entry.name.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );

  const columns = [
    {
      title: FilterByNameInput,
      dataIndex: 'name',
      key: '1'
    }
  ];

  return (
    <FlexBox>
      <Table columns={columns} dataSource={dataSource} />
    </FlexBox>
  );
}
