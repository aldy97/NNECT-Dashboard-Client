import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Space, message } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { USER } from "../reducers/userReducer";
import { UPDATE_USER_INFO, UpdateUserInfo } from "../actions/userAction";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { URL } from "../assets/constants";

export const StyledForm = styled(Form)`
  width: 360px;
  margin-left: auto;
  margin-right: auto;
`;

interface LoginFormProps {
  updateUserInfo: (user: USER) => void;
  setForgetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({ updateUserInfo, setForgetPassword }: LoginFormProps) {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginBtnClick = async (): Promise<void> => {
    const request = { email, password };
    const response = await axios.post(`${URL}/api/login`, request);
    if (response.status === 201) {
      message.success("Login Success!");
      const user: USER = response.data.restaurant;
      updateUserInfo(user);
      setIsLogin(true);
    } else {
      message.error(response.data.message);
    }
  };

  return (
    <StyledForm name="basic" initialValues={{ remember: true }}>
      <Space direction="vertical">
        <Form.Item rules={[{ required: true, message: "Please input your email!" }]}>
          <Input value={email} onChange={handleEmailChange} placeholder="Email:" />
        </Form.Item>

        <Form.Item rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password:"
          />
        </Form.Item>

        <div
          onClick={() => {
            setForgetPassword(true);
          }}
          style={{ color: "#1890ff", cursor: "pointer" }}
        >
          Forget password?
        </div>

        <Form.Item>
          <Button
            style={{ width: 360 }}
            type="primary"
            htmlType="submit"
            onClick={handleLoginBtnClick}
          >
            Login
          </Button>
        </Form.Item>
        {isLogin && <Redirect to="/admin"></Redirect>}
      </Space>
    </StyledForm>
  );
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateUserInfo(user: USER): void {
      const action: UpdateUserInfo = {
        type: UPDATE_USER_INFO,
        user,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatch)(LoginForm);
