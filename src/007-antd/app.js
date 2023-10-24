import { Breadcrumb, Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React from "react";
import NewTable from "./newTable";
import { useNavigate, Routes, Route } from "react-router-dom";
import Review from "./review";
import Tables from "./04-table";
const { Header, Content, Footer } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("review", "/review", <AppstoreOutlined />),
  getItem("newTable", "/newTable", <MailOutlined />),
  getItem("tables", "/tables", <SettingOutlined />),
];
const App = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key, { replace: true });
  };
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" items={items} onClick={onClick} />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
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
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          <Routes>
            <Route exact path="/review" element={<Review />} />
            <Route path="/newTable" element={<NewTable />} />
            <Route path="/tables" element={<Tables />} />
          </Routes>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023-10 Created by Li
      </Footer>
    </Layout>
  );
};
export default App;
