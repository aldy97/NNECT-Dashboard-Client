import React, { useState, useEffect } from "react";
import LogRegToggler from "../components/LogRegToggler";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ForgetPassword from "../components/ForgetPassword";
import logo from "../assets/img/nnect-logo.jpeg";
import styled from "styled-components";
import { CLEAR_USER_INFO, ClearUserInfo } from "../actions/userAction";
import { Dispatch } from "redux";
import { connect } from "react-redux";

const LoginWrapper = styled.div`
  text-align: center;
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 96px;
  margin-bottom: 16px;
`;

// const StyledDesc = styled.div`
//   margin-bottom: 20px;
//   color: #8c8c8c;
// `;

interface LoginProps {
  clearUserInfo: () => void;
}

function Login({ clearUserInfo }: LoginProps) {
  const [isAtLogin, setIsAtLogin] = useState<boolean>(true);

  const [forgetPassword, setForgetPassword] = useState<boolean>(false);

  useEffect(() => {
    clearUserInfo();
  });

  const toogle = () => {
    if (isAtLogin) {
      setIsAtLogin(false);
    } else {
      setIsAtLogin(true);
    }
    setForgetPassword(false);
  };

  return (
    <LoginWrapper>
      <Logo alt="" src={logo}></Logo>
      {!forgetPassword && <LogRegToggler atLogin={isAtLogin} toogle={toogle}></LogRegToggler>}
      {isAtLogin && !forgetPassword && <LoginForm setForgetPassword={setForgetPassword} />}
      {!isAtLogin && <RegisterForm />}
      {forgetPassword && <ForgetPassword setForgetPassword={setForgetPassword}></ForgetPassword>}
    </LoginWrapper>
  );
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    clearUserInfo() {
      const action: ClearUserInfo = {
        type: CLEAR_USER_INFO,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatch)(Login);
