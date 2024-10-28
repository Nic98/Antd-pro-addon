import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import React, { Component, PropTypes } from 'react';
import styles from './index.less';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { getProjectSchemaFromDB } from '../../services/lowcodeServices';
// import DynamicComponentLoader from './DynamicComponentLoader.jsx'; // 引入动态加载组件

export default class HomeComponent extends Component{
    static defaultProps = {
        prefixCls: 'home'
    }
    state = {
      currentKey: '/dashboard',
    }
  
    state = {
      lowcodePages: [],  
    }
  
  
    constructor(props){
        super(props)
    }

    bindCurrentKey = (key) => {
      this.setState({
        currentKey: key,
      }, () => {
        const json = {
          time: new Date().getTime()
        };
        window.history.pushState(json, "", `#${key}`);
      });
    };    

    async componentDidMount() {
      const res = await getProjectSchemaFromDB();
      this.setState({
        lowcodePages: res.data
      }, () => {
      })
    }
  
  
    render(){
      // 点击菜单 去路由匹配 到组件 渲染相应的
      const { currentKey, lowcodePages } = this.state;
      const { routes } = this.props;
      let rightRenderCon = null;
      const allRenderCon = routes[0].childRoutes;
      rightRenderCon = allRenderCon.find(i => i.path === currentKey);
        return(
          <Layout>
            <Header className="header">
              <div className="logo" />
              <h1   className='h1'>库存管理后台</h1>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px', float: 'right' }}
              >
                <Menu.Item key="1" onClick={() => {
                  {/* 清除缓存
                   清除SESSION */}
                  this.props.router.push('/login');
                  // history clear
                }}>退出</Menu.Item>
              </Menu>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <SubMenu key="sub1" title={<span><Icon type="shopping-cart" />{'商品管理'}</span>}>
                    <Menu.Item key="sub1-1" onClick={() => { this.bindCurrentKey('/goods') }}>商品列表</Menu.Item>
                  </SubMenu>

                  <SubMenu key="sub2" title={<span><Icon type="shop" />{'仓库管理'}</span>}>
                    <Menu.Item key="sub2-1" onClick={() => {this.bindCurrentKey('/out') }}>出库</Menu.Item>
                    <Menu.Item key="sub2-2">入库</Menu.Item>
                    <Menu.Item key="sub2-3" onClick={() => { this.bindCurrentKey('/warehouse') }}>仓库列表</Menu.Item>
                    <Menu.Item key="sub2-4" onClick={() => { this.bindCurrentKey('/detail') }}>仓库详情</Menu.Item>
                  </SubMenu>

                  <SubMenu key="sub3" title={<span><Icon type="user" />{'用户管理'}</span>}>
                    <Menu.Item key="sub3-1" onClick={() => {this.bindCurrentKey('/user') }}>用户列表</Menu.Item>
                    <Menu.Item key="sub3-2" onClick={() => {this.bindCurrentKey('/userRole') }}>用户授权</Menu.Item>
                  </SubMenu>

                  <SubMenu key="sub4" title={<span><Icon type="environment" />{'角色权限管理'}</span>}>
                    <Menu.Item key="sub4-1" onClick={() => {this.bindCurrentKey('/role') }}>角色列表</Menu.Item>
                    <Menu.Item key="sub4-2" onClick={() => {this.bindCurrentKey('/roleOperate') }}>角色授权 Transfer组件实现</Menu.Item>
                  </SubMenu>  

                  <SubMenu key="sub5" title={<span><Icon type="area-chart" />{'报表统计'}</span>}>
                    <Menu.Item key="sub5-1" onClick={() => {this.bindCurrentKey('/charts') }}>bizCharts折线图</Menu.Item>
                    <Menu.Item key="sub5-2" onClick={() => {this.bindCurrentKey('/pieCharts') }}>bizCharts饼图</Menu.Item>
                  </SubMenu>  

                  <SubMenu key='sub6' title={<span><Icon type="area-chart" />{'页面控制'}</span>}>
                    <Menu.Item key="sub6-1" onClick={() => { this.bindCurrentKey('/pageControl') }}>页面控制</Menu.Item> 
                  </SubMenu>

                  <SubMenu key="sub7" title={<span><Icon type="shopping-cart" />{'低代码'}</span>}>
                    {lowcodePages.map((item, index) => {
                      const url = `http://localhost:5556/preview.html?scenarioName=${item.pageName}`;
                      return (
                          <Menu.Item key={`sub7-${index+1}`} onClick={() => { this.bindCurrentKey(`/${item.pageName}`) }}>{item.pageName}</Menu.Item> 
                      )
                    })}
                  </SubMenu>
                </Menu>
              </Sider>

              <Layout style={{ padding: '0 24px 24px' }}>

              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
                
              <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
              }}
              >
                  {
                    
                // 渲染右边这块
                rightRenderCon ? React.createElement(rightRenderCon.component, rightRenderCon.path.substring(1)) : null
              }
              </Content>
              </Layout>
            </Layout>
          </Layout>
        )
    }
}
