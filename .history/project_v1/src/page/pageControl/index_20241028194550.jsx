import {
  Input, Table, Divider, Badge, Modal, Button
} from 'antd';
import _ from 'lodash';
import React, {useState, useEffect } from 'react';
import {addNewProjectSchemaToDB, getProjectSchemaFromDB, deleteProjectSchema } from '../../services/lowcodeServices';

const handlePreview = async (record) => {
  const { pageName } = record;
  var preview = window.open('http://localhost:5556/preview.html?scenarioName=' + pageName);
}


function handleConstruct(record) {
  const { pageName } = record;

  const handleConstructClick = (pageId) => {
    const editorWindow = window.open('http://localhost:5556', '_blank');
    editorWindow.onload = () => {
        console.log('Sending message from:', window.location.origin);
        // 这里的目标 origin 应该是 http://localhost:5556
        editorWindow.postMessage({ pageId }, 'http://localhost:5556'); // 发送消息到打开的页面
    };
};

}; 


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
        <Divider type="vertical" />
        <a href="javascript:;" onClick={() => { handleDelete(record); }}>Delete</a>
      </span>
    ),
  }];
  
  const [lowcodeInfo, setLowcodeInfo] = useState([]);
  const [name, setname] = useState('');

  const getTable = () => {
    getProjectSchemaFromDB().then((res) => {
      setLowcodeInfo(res.data);
    });
  }

  useEffect(() => {
    getTable();
  }, []);

  async function handleDelete(record) {
    const { pageId, pageName, projectSchema } = record;
    await deleteProjectSchema(pageId);
    getTable();
  }

  async function handleAdd(name) {
    await addNewProjectSchemaToDB(name);
    getTable();
  }

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

      <Button type="primary" size={'medium'} onClick={() => {handleAdd(name)}}>
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
