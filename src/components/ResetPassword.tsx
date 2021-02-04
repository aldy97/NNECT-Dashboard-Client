import React, { useState } from "react";
import { StyledForm } from "./LoginForm";
import { MESSAGES } from "../assets/constants";
import { Input, Form, Button, Space, message } from "antd";
import logo from "../assets/img/nnect-logo.jpeg";
import { Logo } from "../views/Login";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { USER } from "../reducers/userReducer";
import { RootState } from "../reducers/index";
import { Redirect } from "react-router-dom";
import { URL, DEV_URL } from "../assets/constants";

const Wrapper = styled.div`
  text-align: center;
`;

export const Label = styled.div`
  float: left;
  color: "#8c8c8c";
`;

interface ResetPasswordProps {
  user: USER;
}

const BASE_URL = process.env.NODE_ENV === "production" ? URL : DEV_URL;

function ResetPassword({ user }: ResetPasswordProps) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // this is true when password is changed
  const [changed, setChanged] = useState(false);

  const handleSubmitClick = async (): Promise<void> => {
    const request = {
      _id: user._id,
      updatedFields: {
        oldPassword: user.password,
        newPassword: password,
        confirmPassword,
      },
    };

    const response = await axios.put(`${BASE_URL}/api/changePassword`, request);
    if (response.data.status === 200) {
      message.success(MESSAGES.CHANGE_PASSWORD_SUCC);
      setChanged(true);
    } else {
      message.error(response.data.message);
    }
  };

  return (
    <Wrapper>
      <Logo alt="" src={logo}></Logo>
      <StyledForm>
        <Form.Item>
          <Label>Enter new password:</Label>
          <Input.Password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="New password"
          ></Input.Password>
        </Form.Item>
        <Form.Item>
          <Label>Re-enter new password:</Label>
          <Input.Password
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm password"
          ></Input.Password>
        </Form.Item>
      </StyledForm>
      <Space direction="horizontal">
        <Button onClick={handleSubmitClick} type="primary">
          Submit
        </Button>
        <Button
          onClick={() => {
            setChanged(true);
          }}
        >
          Cancel
        </Button>
      </Space>
      {(changed || !user._id) && <Redirect to="/login" />}
    </Wrapper>
  );
}

const mapState = (state: RootState) => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapState, null)(ResetPassword);
