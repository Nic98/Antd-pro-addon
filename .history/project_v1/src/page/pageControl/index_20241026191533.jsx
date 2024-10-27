import {
  Input, Table, Divider, Badge, Modal
} from 'antd';
import _ from 'lodash';
import React, {useState, useEffect } from 'react';

export default function Warehouse() {

  const columns = [{
    title: 'pageId',
    dataIndex: 'pageId',
    key: 'pageId',
  }, {
    title: 'pageName',
    dataIndex: 'pageName',
    key: 'pageName',
  }, {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      let statusText;
      let statusType;
  
      switch (record.status) {
        case '0':
          statusText = 'Closed';
          statusType = 'default';
          break;
        case '1':
          statusText = 'Running';
          statusType = 'processing';
          break;
        case '2':
          statusText = 'Online';
          statusType = 'success';
          break;
        case '3':
          statusText = 'Error';
          statusType = 'error';
          break;
        default:
          statusText = 'Unknown';
          statusType = 'default';
      }
      return <Badge status={statusType} text={statusText} />;
    }
  }, {
    title: 'updatedAt',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  }, {
    title: 'createdAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
  }, {
    title: 'Operations',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;" onClick={() => { handleEditGoods(record); }}>修改</a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={() => { handleDeleteGoods(record); }}>删除</a>
      </span>
    ),
  }];
  
  const [lowcodeInfo, setLowcodeInfo] = useState([]);

  return (
    <div>

      <Table
        columns={_.filter(columns, item => item.show !== false)}
        dataSource={_.uniqBy(lowcodeInfo, 'key')}
        pagination={false}
        size="middle"
        scroll={{ y: 350 }}
      />

    </div>
  );
}
