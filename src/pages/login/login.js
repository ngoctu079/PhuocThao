import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { loginAxios } from "../../axios";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    loginAxios
      .post("/login", values)
      .then((res, err) => {
        const dataRespond = res.data;

        onSuccess("Login successfully");
        localStorage.setItem("jwt", dataRespond.jwt);
        navigate("/user");
      })
      .catch((err) => {
        onError(err.response.data.message);
      });
  };

  const onError = (errMessage) => {
    messageApi.open({
      type: "error",
      content: errMessage,
    });
  };

  const onSuccess = (successMessage) => {
    messageApi.open({
      type: "success",
      content: successMessage,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>

        <Link to="forget">Forget Password</Link>
      </Form.Item>
    </Form>
  );
};
