import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, } from 'antd';
import logo from '../logo.png';
import RouteConfig from '../router'
import { HashRouter, Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const menuList = [{
	key: 'sub1',
	isSub: true,
	icon: 'tool',
	title: '开发工具',
	children: [
		{ key: '1', route: '/', title: '代码编辑器' },
		{ key: '2', route: '/regexp', title: '密码正则工具' },
    { key: '4', route: '/templ', title: '模板语法转换' },
	]
}, {
	key: 'sub2',
	isSub: true,
	icon: 'rocket',
	title: 'CSS工具',
	children: [
		{ key: '3', route: '/tri', title: '三角形生成器' },
	]
}]

const renderMenuItem = e => (<Menu.Item key={e.key}><Link to={e.route}>{e.title}</Link></Menu.Item>)
const renderSubMenuItem = e => (
	<SubMenu key={e.key} 
		title={<span>
			{e.icon && <Icon type={e.icon}/>}
			{e.title}</span>}>
		{e.children.map(e => renderMenuItem(e))}
	</SubMenu>
)

class Main extends Component {
  render(){
    return (
		<HashRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Dev-Toolbox</h1>
          </div>
          {/* <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu> */}
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
							{ menuList.map(e => e.isSub? renderSubMenuItem(e): renderMenuItem(e)) }
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