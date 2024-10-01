import {
  Input, Table, Divider, Badge, Card
} from 'antd';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import './index.less';

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
      <a href="javascript:;">配置</a>
      <Divider type="vertical" />
      <a href="javascript:;">订阅警报</a>
    </span>
  ),
  }];

// basicProgress basicGoods
// 

export default function Detail() {

  const [associatedvalue, setAssociatedValue] = useState('');
  const [filterparamList, setFilterParamList] = useState([]);

  const [refundDetail, setRefundDetail] = useState({});
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
        columns={_.filter(columns, item => item.show !== false)}
        dataSource={_.uniqBy(filterparamList, 'key')}
        pagination={false}
        size="middle"
        scroll={{ y: 350 }}
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
