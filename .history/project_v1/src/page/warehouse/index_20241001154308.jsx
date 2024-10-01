import {
  Input, Table, Divider
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
  dataIndex: 'numbertimes',
  key: 'numbertimes',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '上次调度时间',
  dataIndex: 'lasttime',
  key: 'lasttime',
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

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    desc: `这是一段描述`,
    numbertimes: `777万`,
    status: `running`, // 0: '关闭', 1: '运行中', 2: '已上线', 3: '异常'
    lasttime: `2020-10-10 10:10:10`, // 日期格式化
  });
}

export default function Warehouse() {
  // DidMount send ajax actios !!
  // 请求发送成功 和 失败后 数据注入到redux
  //  UserComponent 升级为 被redux connect 的一个高阶组件 就像登录页一样数据的规范 尽量使用
  // 要去封装数据 成 antd columns dataSource 一一对应的方式
  // 另一种做法简单的就是 发完请求, 数据直接回填setstate到本页的state 用state去取


  // express nodejs 数据库 要做什么
  // 1: 你批量多搞几条数据 好测试
  // 2: count 总数
  const [associatedvalue, setAssociatedValue] = useState('')
  const [filterparamList, setFilterParamList] = useState(data)

  // const {data} = props

  useEffect(() => {
    // console.log('props', props)  
  }, [])


  useEffect(() => {
    setFilterParamList(data || [])
  }, [data])

  useEffect(() => {
    if (associatedvalue !== '') {  //当value不为空时
      setFilterParamList([])
      setFilterParamList(
        data.filter(item => {	
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
      setFilterParamList(data)
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
