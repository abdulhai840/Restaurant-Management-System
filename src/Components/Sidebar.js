import React from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Orders from './Orders/Orders';
import Users from './Users/Users';
import Profile from './Profile/Profile';
import order from '../assests/order.svg';
import $ from "jquery"
import Menus from './Menu/Menus';
import Deals from './Deals/Deals';
import Restaurants from './Restaurants/Restaurants';
import Restaurant from './Restsaurant/Restaurants'
import OwnerLogin from '../OwnerLogin';

const { Header, Sider } = Layout;
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    }

    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleClick(e) {
    console.log('click', e);
  }
  onLogout = () => {
    localStorage.clear()
    this.setState({
      logout: true
    })

  }
  render(props) {

    let type = localStorage.getItem('type')
    console.log(type)
    if ($(window).width() < 500) {
      // eslint-disable-next-line
      if (this.state.collapsed == false) {
        this.setState({
          collapsed: true
        })
      }
    }
    else if ($(window).width() > 500) {
    }
    return (
      // eslint-disable-next-line
      this.state.logout == false ?
        <>
          <Layout className="h-100 ">
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={250}>
              {/* <Sider trigger={null} collapsible collapsed={this.state.collapsed}> */}

              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['dashboard']}
                style={{ height: '100%' }}
              >
                <div className="profile">
                  {/* <h4 className="text-center">Restaurant Management System</h4> */}
                  {type === 'admin' ?
                    <p className="text-center mb-0 font23 padding30px" style={{ fontWeight: "700" }} >
                      Admin
                    </p>
                    :
                    <p className="text-center mb-0 font23 padding30px" style={{ fontWeight: "700" }} >
                      Manager
                    </p>
                  }
                </div>

                {/* <NavLink to="/restaurant" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="7">
                    Restaurants
                  </Menu.Item>
                </NavLink> */}

                <NavLink to="/deals" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="7">
                    Deals
                  </Menu.Item>
                </NavLink>

                <NavLink to="/menu" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="7">
                    Menu
                  </Menu.Item>
                </NavLink>

                {type === 'admin' &&
                  <>
                    <NavLink to="/users" className="ant-menu-item ant-menu-item-only-child ">
                      <Menu.Item key="7">
                        Users
                      </Menu.Item>
                    </NavLink>

                    <NavLink to="/restaurants" className="ant-menu-item ant-menu-item-only-child ">
                      <Menu.Item key="7">
                        Restaurants
                      </Menu.Item>
                    </NavLink>
                  </>
                }
                {/* {type==='admin' && */}
                <NavLink to="/orders" className="ant-menu-item ant-menu-item-only-child " >
                  <Menu.Item key="1">
                    <img src={order} alt="" className="icons"></img>Orders
                  </Menu.Item>
                </NavLink>
                {/* } */}

              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" >
                <div className="row mx-auto">
                  <div className="mr-auto Trigger">
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'trigger',
                      onClick: this.toggle,
                    })}
                  </div>
                  <div className="ml-auto dropdown ">
                    <LogoutOutlined className="icons" onClick={this.onLogout} />
                  </div>
                </div>
              </Header>
              <Switch>
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/deals" component={Deals} />
                <Route exact path="/menu" component={Menus} />
                <Route exact path="/restaurants" component={Restaurants} />
                <Route exact path="/restaurant" component={Restaurant} />
                <Route exact path="/profile" component={Profile} />
                <Redirect to="/deals" />
              </Switch>
            </Layout>
          </Layout>
        </> : <Redirect to="/home" />

    );
  }
}

export default Sidebar;