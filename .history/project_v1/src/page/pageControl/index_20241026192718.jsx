import {
  Input, Table, Divider, Badge, Modal, Button
} from 'antd';
import _ from 'lodash';
import React, {useState, useEffect } from 'react';
import { getProjectSchemaFromDB } from '../../services/lowcodeServices';



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
        default:
          statusText = 'Default';
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
        <a href="javascript:;" onClick={() => { handleEditGoods(record); }}>Construct</a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={() => { handleDeleteGoods(record); }}>Preview</a>
      </span>
    ),
  }];
  
  const [lowcodeInfo, setLowcodeInfo] = useState([]);

  useEffect(() => {
    getProjectSchemaFromDB().then((res) => {
      setLowcodeInfo(res.data);
    });
  }, []);


  return (
    <div>
      <Button type="primary" size={'medium'}>
        + New Lowcode Page
      </Button>
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