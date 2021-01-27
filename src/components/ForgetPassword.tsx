import React, { useState } from "react";
import { Label } from "./ResetPassword";
import { StyledForm } from "../components/LoginForm";
import { Form, Input, Button, Space, message } from "antd";
import { MESSAGES } from "../assets/constants";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { USER } from "../reducers/userReducer";
import { UPDATE_USER_INFO, UpdateUserInfo } from "../actions/userAction";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { URL } from "../assets/constants";

interface ForgetPasswordProps {
  setForgetPassword: React.Dispatch<React.SetStateAction<boolean>>;
  updateUserInfo: (user: USER) => void;
}

function ForgetPassword({ setForgetPassword, updateUserInfo }: ForgetPasswordProps) {
  const [email, setEmail] = useState<string>("");
  const [requestSent, setRequestSent] = useState<boolean>(false);

  const [code, setCode] = useState<string>("");

  const [verified, setVerified] = useState<boolean>(false);

  const handleSubmitClick = async (): Promise<void> => {
    if (!email) {
      message.error(MESSAGES.EMPTY_EMAIL);
      return;
    }

    const response = await axios.get(`${URL}/api/forgetPassword/${email}`);
    if (response.data.status === 200) {
      message.info(response.data.message);
      setRequestSent(true);
    } else {
      message.error(response.data.message);
    }
  };

  const handelVerifyClick = async (): Promise<void> => {
    const request = { email, resetCode: code };
    const response = await axios.post(`${URL}/api/verifyResetPassword`, request);
    if (response.data.status === 200) {
      const user: USER = response.data.restaurant;
      updateUserInfo(user);
      setVerified(true);
    } else {
      message.error(MESSAGES.WRONG_VERIFICATION);
    }
  };

  return !requestSent ? (
    <StyledForm>
      <Form.Item>
        <Space direction="vertical">
          <Label>Please enter your registered email</Label>
          <Input
            key="email"
            defaultValue={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email:"
          ></Input>
        </Space>
      </Form.Item>
      <Space>
        <Button onClick={handleSubmitClick} type="primary">
          Submit
        </Button>
        <Button
          onClick={() => {
            setForgetPassword(false);
          }}
        >
          Cancel
        </Button>
      </Space>
    </StyledForm>
  ) : (
    <StyledForm>
      <Form.Item>
        <Space direction="vertical">
          <div>Please enter the 4-digit code in the email</div>
          <Input
            key="code"
            defaultValue={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></Input>
        </Space>
      </Form.Item>
      <Space>
        <Button onClick={handelVerifyClick} type="primary">
          Verify
        </Button>
        <Button
          onClick={() => {
            setForgetPassword(false);
          }}
        >
          Cancel
        </Button>
      </Space>
      {verified && <Redirect to="/resetPassword"></Redirect>}
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

export default connect(null, mapDispatch)(ForgetPassword);
