import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { message, Space } from "antd";
import { MESSAGES } from "../assets/constants";
import { connect } from "react-redux";
import { USER } from "../reducers/userReducer";
import { UpdateUserInfo, UPDATE_USER_INFO } from "../actions/userAction";
import { RootState } from "../reducers/index";
import { Redirect } from "react-router-dom";
import { Dispatch } from "redux";
import axios from "axios";
import { URL } from "../assets/constants";

interface UserProfileProps {
  updateUserInfo: (user: USER) => void;
  user: USER;
}

function UserProfile({ updateUserInfo, user }: UserProfileProps) {
  // profile:

  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState<string>(user.phoneNumber);
  const [managerName, setManagerName] = useState(user.managerName);
  const [managerNumber, setManagerNumber] = useState(user.managerNumber);
  const [address, setAddress] = useState(user.streetAddress);
  const [city, setCity] = useState(user.city);
  const [postCode, setPostCode] = useState(user.postCode);
  const [maxCap, setMaxCap] = useState(user.maxCapacity);

  // password:
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // profile related:
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNumber(e.target.value);
  };

  const handleEmailChage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleManagerNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setManagerName(e.target.value);
  };

  const handleManagerNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setManagerNumber(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  const handlePostCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPostCode(e.target.value);
  };

  const handleMaxCapChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMaxCap(e.target.value);
  };

  // password related:
  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  };

  // Change profile:
  const handleSaveBtnChange = async (): Promise<void> => {
    if (!name || !number || !email) {
      message.error("Restaurant name, phone number and email are mandatory fields");
      return;
    }

    const request = {
      _id: user._id,
      updatedFields: {
        name,
        email,
        phoneNumber: number,
        managerName,
        managerNumber,
        streetAddress: address,
        city,
        postCode,
        maxCapacity: maxCap,
      },
    };
    const response = await axios.put(`${URL}/api/updateRestaurantInfo`, request);
    if (response.status === 200) {
      const user: USER = response.data.newRestaurant;
      updateUserInfo(user);
      message.success(MESSAGES.PROFILE_EDIT_SUCC);
    } else {
      message.error(response.data.message);
    }
  };

  // Change password:
  const handleChangePassword = async (): Promise<void> => {
    const request = {
      _id: user._id,
      updatedFields: {
        oldPassword,
        newPassword,
        confirmPassword,
      },
    };

    const response = await axios.put(`${URL}/api/changePassword`, request);
    if (response.data.status === 200) {
      const user: USER = response.data.newRestaurant;
      updateUserInfo(user);
      message.success(MESSAGES.CHANGE_PASSWORD_SUCC);
    } else {
      message.error(response.data.message);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Restaurant Name</label>
                        <Input
                          defaultValue={name}
                          onChange={handleNameChange}
                          placeholder="Restaurant Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Phone Number</label>
                        <Input
                          defaultValue={number}
                          onChange={handleNumberChange}
                          placeholder="Phone Number"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <Input
                          defaultValue={email}
                          onChange={handleEmailChage}
                          placeholder="Email address"
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Manager's name</label>
                        <Input
                          defaultValue={managerName}
                          onChange={handleManagerNameChange}
                          placeholder="Manager's name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Manager's number</label>
                        <Input
                          defaultValue={managerNumber}
                          onChange={handleManagerNumberChange}
                          placeholder="Manager's number"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue={address}
                          onChange={handleAddressChange}
                          placeholder="Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue={city}
                          onChange={handleCityChange}
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input
                          defaultValue={postCode}
                          onChange={handlePostCodeChange}
                          placeholder="Postal Code"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup style={{ marginRight: 12 }}>
                        <label>Max Capacity</label>
                        <Input
                          defaultValue={maxCap}
                          onChange={handleMaxCapChange}
                          placeholder="Max Capacity"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row></Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={handleSaveBtnChange}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/little-bird.jpg").default}
                    />
                    <h3 className="title">{user.name}</h3>
                  </a>
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5>Change Password</h5>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Space direction="vertical">
                    <FormGroup>
                      <label>Your old password</label>
                      <Input
                        onChange={handleOldPasswordChange}
                        type="password"
                        style={{ width: 240 }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Your new password</label>
                      <Input
                        onChange={handleNewPasswordChange}
                        type="password"
                        style={{ width: 240 }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Re-enter your new password</label>
                      <Input
                        onChange={handleConfirmPasswordChange}
                        type="password"
                        style={{ width: 240 }}
                      />
                    </FormGroup>
                  </Space>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  onClick={handleChangePassword}
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
      {!user._id && <Redirect to="/login"></Redirect>}
    </>
  );
}

const mapState = (state: RootState) => {
  return {
    user: state.UserReducer.user,
  };
};

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

export default connect(mapState, mapDispatch)(UserProfile);
