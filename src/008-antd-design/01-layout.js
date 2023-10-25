import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Info from "./pages/info";
import Salary from "./pages/salary";
import Mypage from "./pages/mypage";
import Formed from "./pages/form";
import Tabled from "./pages/table";
import Tabledd from "./pages/table-1";
import Staff from "./pages/staff";
import CompanyInfo from "./pages/company-info";
import Tipwater from "./pages/tipwater";
import "./layout.css";
import StaffSa from "./pages/staff-salary";
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
  getItem("表格", "/form"),
  getItem("表单", "/table"),
  getItem("表格-1", "/table-1"),
];
const items2 = [
  getItem("模仿员工信息", "/staff"),
  getItem("模仿公司信息", "/company-info"),
  getItem("模仿公司业务", "/form"),
  getItem("模仿公司流水", "/tipwater"),
  getItem("模仿员工工资", "/staff-salary"),
];
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
            onClick={onClick}
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
              <Route path="/form" element={<Formed />} />
              <Route path="/table" element={<Tabled />} />
              <Route path="/table-1" element={<Tabledd />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/company-info" element={<CompanyInfo />} />
              <Route path="/tipwater" element={<Tipwater />} />
              <Route path="/staff-salary" element={<StaffSa />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
