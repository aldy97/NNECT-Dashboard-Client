import React from "react";
import Reservation from "../components/Reservation";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

function Reservations() {
  return (
    <div className="content">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h3">Reservations</CardTitle>
            </CardHeader>
            <CardBody>
              <Reservation></Reservation>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Reservations;
