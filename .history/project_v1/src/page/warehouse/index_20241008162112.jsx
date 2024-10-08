import {
  Input, Table, Divider, Badge,
} from 'antd';
import _ from 'lodash';
import React, {useRef, useMemo, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { getGoodsList, deleteGoods } from '../../services/goodsServices.js';
import GoodsForm from './goodsForm.jsx';




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

  const [associatedvalue, setAssociatedValue] = useState('');
  const [filterparamList, setFilterParamList] = useState([]);
  const [originalData, setOriginalData] = useState([]);

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
      <div>
        <GoodsForm OnAddGoods={handleAddGoods} />
      </div>
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
    </div>
  );
}
