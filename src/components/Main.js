import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, } from 'antd';
import logo from '../logo.svg';
import RouteConfig from '../router'
import { HashRouter, Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Main extends Component {
  render(){
    const style = {
      logo: {
        float: 'left',
        width: '150px'
      }
    }
    return (
		<HashRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo" style={style.logo}><img src={logo} className="App-logo" alt="logo" /></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
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
              <SubMenu key="sub1" title={<span><Icon type="tool" />开发工具</span>}>
                <Menu.Item key="1"><Link>代码编辑器</Link></Menu.Item>
                <Menu.Item key="2"><Link>密码正则生成</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="rocket" />CSS工具</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
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
              <RouteConfig/>
            </Content>
          </Layout>
        </Layout>
      </Layout>      
		</HashRouter>
    )
  }
}

export default Main