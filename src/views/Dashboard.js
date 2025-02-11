import React from "react";
import Offers from "../components/Offers";
import Calendar from "../components/Calendar";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Dashboard(props) {
  const user = props.user;
  return (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card className="card-user" style={{ height: 150 }}>
              <CardBody>
                <div className="author" style={{ textAlign: "center" }}>
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <h3 className="title">{user.name}</h3>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Offers></Offers>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Calendar with NNECT offers</CardTitle>
                <Calendar />
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      {!user._id && <Redirect to="/login"></Redirect>}
    </>
  );
}

const mapState = (state) => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapState, null)(Dashboard);
