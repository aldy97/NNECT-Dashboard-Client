import React, { useState } from "react";
import { Label } from "./ResetPassword";
import { StyledForm } from "./LoginForm";
import { Form, Input, Button, Space, message } from "antd";
import { MESSAGES } from "../assets/constants";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { USER } from "../reducers/userReducer";
import { UPDATE_USER_INFO, UpdateUserInfo } from "../actions/userAction";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { URL } from "../assets/constants";

interface RegisterFormProps {
  updateUserInfo: (user: USER) => void;
}

function RegisterForm({ updateUserInfo }: RegisterFormProps) {
  const [verificationSent, setVerificationSent] = useState<boolean>(false);

  const [isRegistered, setIsRegistered] = useState(false);
  const [code, setCode] = useState("");

  const [email, setEmail] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRestaurantNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurantName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegisterBtnClick = async (): Promise<void> => {
    const request = {
      name: restaurantName,
      email,
      phoneNumber: phone,
      password,
      confirmPassword,
    };
    const response = await axios.put(`${URL}/api/register/`, request);

    if (response.data.status === 201) {
      message.info(MESSAGES.VERIFICATION_EMAIL_SENT);
      setVerificationSent(true);
    } else {
      message.error(response.data.message);
    }
  };

  // send verification code, create account in db if it is correct
  const handleSubmitClick = async (): Promise<void> => {
    const request = {
      name: restaurantName,
      email,
      phoneNumber: phone,
      password,
      registerCode: code,
    };
    const response = await axios.post(`${URL}/api/createRestaurant`, request);

    if (response.status === 201) {
      const user: USER = response.data.newRestaurant;
      updateUserInfo(user);
      setIsRegistered(true);
      message.success(MESSAGES.REGISTER_SUCC);
    } else {
      message.error(response.data.message);
    }
  };

  return !verificationSent ? (
    <StyledForm name="basic" initialValues={{ remember: true }}>
      <Form.Item rules={[{ required: true, message: "Please input your email!" }]}>
        <Input onChange={handleEmailChange} placeholder="Email:" />
      </Form.Item>

      <Form.Item rules={[{ required: true, message: "Please input your restaurant's name!" }]}>
        <Input onChange={handleRestaurantNameChange} placeholder="Restaurant name:" />
      </Form.Item>

      <Form.Item rules={[{ required: true, message: "Please input your phone number" }]}>
        <Input onChange={handlePhoneChange} placeholder="Phone number:" />
      </Form.Item>

      <Form.Item rules={[{ required: true, message: "Please enter your password!" }]}>
        <Input.Password onChange={handlePasswordChange} placeholder="Password:" />
      </Form.Item>

      <Form.Item rules={[{ required: true, message: "Please enter your password!" }]}>
        <Input.Password onChange={handleConfirmPasswordChange} placeholder="Confirm password:" />
      </Form.Item>

      <Form.Item>
        <Button
          style={{ width: 360 }}
          type="primary"
          htmlType="submit"
          onClick={handleRegisterBtnClick}
        >
          Register
        </Button>
      </Form.Item>
    </StyledForm>
  ) : (
    <StyledForm name="basic" initialValues={{ remember: true }}>
      <Space direction="vertical">
        <Label>Please enter the 4-digit code</Label>
        <Form.Item>
          <Space>
            <Input
              key="verify"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            ></Input>
            <Button onClick={handleSubmitClick} type="primary">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Space>
      {isRegistered && <Redirect to="/admin"></Redirect>}
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

export default connect(null, mapDispatch)(RegisterForm);
