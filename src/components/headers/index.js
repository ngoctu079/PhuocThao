import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import { useNavigate, Link, Navigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

export const HeaderUser = () => {
  const items1 = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  items1.push({
    key: "4",
    label: <Button onClick={logOut}>Logout</Button>,
  });

  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items1}
      />
    </Header>
  );
};
