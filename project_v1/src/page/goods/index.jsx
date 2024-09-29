import {
  Layout, Menu, Modal, Icon, Button, Tag, Table
} from 'antd';
import React, { Component, PropTypes } from 'react';
import { format } from 'date-fns';
import Ajax from '../../utils/ajax';

export default class GoodsComponent extends Component{
    static defaultProps = {
        prefixCls: 'goods'
    }
    constructor(props){
        super(props)
    }
    state = {
      data: [],
      visible: this.props.data.visible,
    }

  componentDidMount () {
      this.loadData();
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

    loadData = () => {
      Ajax.get({
        url: 'http://127.0.0.1:3000/goods/list',
        data: {},
        error: () => {
          // window.location.href="#/home";
        },
        success: (res) => {
          if (res.body.code === 200 && res.body.listData && res.body.listData.length) {
            this.setState({
              data: res.body.listData
            });
          }
        }
      })
    }
    render(){
        const columns = [
          {
            title: '序列号',
            dataIndex: 'seq',
            width: 80,
          },
          {
            title: '商品ID',
            dataIndex: 'goodsId',
            width: 150,
          },
          {
            title: '商品名称',
            dataIndex: 'goodsName',
            width: 280,
          },
          {
            title: '创建时间',
            dataIndex: 'createDate',
            width: 280,
            render: (text, rec, index) => {
              return format(new Date(text), 'yyyy-MM-dd HH:mm:ss');
            }
          },
        ];
        let dataSource = [];
        this.state.data.map((v, i) => {
          dataSource.push({
            key: i,
            goodsName: `${v.goodsName || ''}`,
            seq: v.seq || '0',
            goodsId: `${v.goodsId || ''}`,
            createDate: v.createDate,
          });
        })
       
        return(
          <div>
              <div id="fffdd" style={{ marginBottom: '20px'}}>

                <Button type="primary" size={'large'} onClick={() => {
                  this.loadData();
                }}>获取</Button>

              <Button type="primary" size={'large'} style={{ marginLeft: '15px' }} onClick={this.showModal}>添加</Button>
              </div>
              {
                <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 70 }} scroll={{ y: 450 }} />
              }
              <Modal
                title="Modal"
                visible={this.state.visible}
                onOk={this.hideModal}
                onCancel={this.hideModal}
                okText="确认"
                cancelText="取消"
              >
                {

                }
              </Modal>
          </div>
        )
    }
}
