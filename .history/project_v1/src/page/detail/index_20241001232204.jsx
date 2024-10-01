import {
  Input, Table, Divider, Badge, Card
} from 'antd';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import './index.less';

const goodsColumns = [
  {
    title: '商品编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '商品条码',
    dataIndex: 'barcode',
    key: 'barcode',
  }, {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
  }, {
    title: '数量（件）',
    dataIndex: 'num',
    key: 'num',
  },{
  title: '金额',
  dataIndex: 'amount',
  key: 'amount',
  },
];

export default function Detail() {

  const [baiscProgress, setbaiscProgress] = useState([]);
  const [basicGoods, setBasicGoods] = useState([]);

  const [userInfo, setUserInfo] = useState({});
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    fetch("https://proapi.azurewebsites.net/api/currentUser?token%20=%20123")
      .then(response => response.json())
      .then(res => {
        setUserInfo(res.data);
        setUserAddress(res.data.geographic.province.label + res.data.geographic.city.label + res.data.address);
      }
      )
  }, []);

  useEffect(() => {
    fetch("https://proapi.azurewebsites.net/api/profile/basic?token%20=%20123")
      .then(response => response.json())
      .then(res => {
        console.log(res.data);
        setBasicGoods(res.data.basicGoods);
      })
  }, [])

  return (
    <div>
      <Card
        title="退款申请"
        bordered={true}
        style={{
          width: "100%",
        }}
      >
      <div className='refund-detail'>
          <div className='refund-detail-item'>
            取货单号: "10000000000"  
          </div>
          <div className='refund-detail-item'>
            状态: 已取货
          </div>
          <div className='refund-detail-item'>
            销售单号: 1234123421
          </div>
          <div className='refund-detail-item'>
            子订单: 3214321432
          </div>
      </div>
      </Card>
      
      <Card
        title="用户信息"
        bordered={true}
        style={{
          width: "100%",
        }}
      >
      <div className='refund-detail'>
          <div className='refund-detail-item'>
            用户姓名: {userInfo.name}  
          </div>
          <div className='refund-detail-item'>
            联系电话: {userInfo.phone}
          </div>
          <div className='refund-detail-item'>
            常用快递: "菜鸟仓储"
          </div>
          <div className='refund-detail-item'>
            取货地址: {userAddress}
          </div>
          <div className='refund-detail-item'>
            备注: "无" 
          </div>
      </div>
      </Card>

      <Table
        columns={_.filter(goodsColumns, item => item.show !== false)}
        dataSource={_.uniqBy(basicGoods, 'id')}
        rowKey = {(record) => record.id}
        pagination={false}
        size="middle"
        scroll={{ y: 350 }}
      />
      {/* <Table
        columns={_.filter(columns, item => item.show !== false)}
        dataSource={_.uniqBy(filterparamList, 'key')}
        pagination={false}
        size="middle"
        scroll={{ y: 350 }}
      /> */}
      </div>
  );
}
