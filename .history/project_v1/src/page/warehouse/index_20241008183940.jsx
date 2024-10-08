import {
  Input, Table, Divider, Badge, Modal
} from 'antd';
import _ from 'lodash';
import React, {useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { addGoods, getGoodsList, deleteGoods, updateGoods } from '../../services/goodsServices.js';
import GoodsForm from './goodsForm.jsx';
import GoodsUpdateForm from './goodsUpdateForm.jsx';


// function fetchData(url, callback) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url, true);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       const res = JSON.parse(xhr.responseText);
//       callback(res);
//     }
//   };
//   xhr.send();
// }

export default function Warehouse() {

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
    render: (text, record) => `${record.callNo}万`,
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'state',
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
    title: '上次调度时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;" onClick={() => { handleDeleteGoods(record); }}>删除</a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={() => { handleEditGoods(record); }}>修改</a>
      </span>
    ),
  }];
  
  const [associatedvalue, setAssociatedValue] = useState('');
  const [filterparamList, setFilterParamList] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [editingGoods, setEditingGoods] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // useEffect(() => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("GET", "https://proapi.azurewebsites.net/api/rule?token%20=%20123&current=1&pageSize=100", true);
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       const res = JSON.parse(xhr.responseText);
  //       setFilterParamList(res.data);
  //       setOriginalData(res.data);
  //     }
  //   };
  //   xhr.send();
  // }, []);
  
  const updateTable = async () => {
    try {
      const data = await getGoodsList();
      setFilterParamList(data);
      setOriginalData(data);
    } catch (error) {
      console.error('Error updating table:', error);
    }
  };


  useEffect(() => {
    updateTable();
  }, []);

  const handleAddGoods = async (data) => {
    await addGoods(data);
    updateTable();
  };

  const handleDeleteGoods = async (data) => {
    await deleteGoods(data);
    updateTable();
  };

  const handleEditGoods = (goods) => {
    setEditingGoods(goods);
    setIsModalVisible(true);
    updateTable();
  };

  const handleUpdateGoods = async () => {
    await updateTable();
    setIsModalVisible(false);
  };


  useEffect(() => {
    if (associatedvalue !== '') {  //当value不为空时
      setFilterParamList(
        originalData.filter(item => {
          //  其中任一含有associatedvalue则通过筛选
          if (
            item?.name?.indexOf(associatedvalue) !== -1
          ) {
            return true
          }
          return false
        })
      )
    } else {	//为空时将渲染原始表格数据
      setFilterParamList(originalData);
    }
  }, [associatedvalue]);


  return (
    <div>
      <button onClick={() => setIsAddModalVisible(true)}>+</button>
      <Modal
        title="Add New Goods"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <GoodsForm
          OnAddGoods={handleAddGoods}
          visible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
        />
      </Modal>

      <Input
        value={associatedvalue || ''}
        onChange={e => {
          setAssociatedValue(e.target.value)
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

      <Modal
        title="Edit Current Goods"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <GoodsUpdateForm
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          goods={editingGoods}
          onUpdate={handleUpdateGoods}
        />
      </Modal>
    </div>
  );
}
