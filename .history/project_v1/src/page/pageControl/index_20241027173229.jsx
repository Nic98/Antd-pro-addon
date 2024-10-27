import {
  Input, Table, Divider, Badge, Modal, Button
} from 'antd';
import _ from 'lodash';
import React, {useState, useEffect } from 'react';
import {addNewProjectSchemaToDB, getProjectSchemaFromDB } from '../../services/lowcodeServices';


function handleConstruct(record) {
  const { pageId, pageName, projectSchema } = record;
  window.open('http://localhost:5556/preview.html?scenarioName=' + pageName);
}

function handlePreview(record) {
  const { pageId, pageName, projectSchema } = record;
  console.log('preview', record);
}


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
        <a href="javascript:;" onClick={() => { handleConstruct(record); }}>Construct</a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={() => { handlePreview(record); }}>Preview</a>
      </span>
    ),
  }];
  
  const [lowcodeInfo, setLowcodeInfo] = useState([]);
  const [name, setname] = useState('');

  useEffect(() => {
    getProjectSchemaFromDB().then((res) => {
      setLowcodeInfo(res.data);
    });
  }, []);

  return (
    <div>

      <Input
        value={name || ''}
        onChange={e => {
          setname(e.target.value)
        }}
        placeholder="Lowcode Page Name"
        allowClear
        style={{ marginLeft: '20px', marginBottom: '6px', width: 350 }}
      />

      <Button type="primary" size={'medium'} onClick={() => {addNewProjectSchemaToDB(name)}}>
        + New Lowcode Page
      </Button>

      <Table
        columns={columns}
        dataSource={lowcodeInfo}
        pagination={false}
        size="middle"
        scroll={{ y: 350 }}
      />
    </div>
  );
}
