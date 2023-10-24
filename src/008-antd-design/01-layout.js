import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Info from "./pages/info";
import Salary from "./pages/salary";
import Mypage from "./pages/mypage";
const { Header, Content, Sider } = Layout;
// const items1 = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
const getItem = (label, key, children, type) => {
  return {
    key,
    children,
    label,
    type,
  };
};
const items1 = [
  getItem("姓名", "/home"),
  getItem("个人信息", "/info"),
  getItem("详细资料", "/me", [
    getItem("奖励", "/me/salary"),
    getItem("页面", "/me/myspage", [getItem("具体", "/me/myspage/mypage")]),
  ]),
];
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const App = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key, { replace: true });
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          onClick={onClick}
        />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/info" element={<Info />} />
              <Route path="/me">
                <Route path="/me/salary" element={<Salary />} />
                <Route path="/me/myspage">
                  <Route path="/me/myspage/mypage" element={<Mypage />} />
                </Route>
              </Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;