import {
  Input, Table, Divider, Badge
} from 'antd';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';

const columns = [{
  title: '规则名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '描述',
  dataIndex: 'desc',
  key: 'desc',
}, {
  title: '服务调用次数',
  dataIndex: 'callNo',
  key: 'callNo',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'state',
  render: ()
}, {
  title: '上次调度时间',
  dataIndex: 'updatedAt',
  key: 'updatedAt',
},
{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">配置</a>
      <Divider type="vertical" />
      <a href="javascript:;">订阅警报</a>
    </span>
  ),
}];

export default function Warehouse() {

  const [associatedvalue, setAssociatedValue] = useState('');
  const [filterparamList, setFilterParamList] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetch("https://proapi.azurewebsites.net/api/rule?token%20=%20123&current=1&pageSize=20")
      .then(response => response.json())
      .then(res => {
        setFilterParamList(res.data);
        setOriginalData(res.data);
      }
    )
  }, [])

  useEffect(() => {
    if (associatedvalue !== '') {  //当value不为空时
      setFilterParamList([])
      setFilterParamList(
        filterparamList.filter(item => {	
        //  其中任一含有associatedvalue则通过筛选
          if (
            item?.name?.indexOf(associatedvalue) !== -1
          ) {
            return true
          }
          return false
        }),
      )
    } else {	//为空时将渲染原始表格数据
      setFilterParamList(originalData)
    }
  }, [associatedvalue])


  return (
    <div>
      <Input
        value={associatedvalue}
        onChange={e => {
          setAssociatedValue(e.target.value?.trim())
        }}
        placeholder="请输入参数名称、参数显示名、参数说明搜索"
        allowClear
        style={{ marginLeft: '20px', marginBottom: '6px', width: 350 }}
        prefix={<SearchOutlined style={{ color: '#DEE0E8' }} />}
      />
      <Table
        columns={_.filter(columns, item => item.show !== false)}
        dataSource={_.uniqBy(filterparamList, 'key')}
        pagination={false}
        size="middle"
        scroll={{ y: 350 }}
        />
      </div>
  );
}
