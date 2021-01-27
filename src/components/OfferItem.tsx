import React from "react";
import { Space } from "antd";
import { options } from "./AddOfferModal";
import { OfferPorps } from "./Offers";
import styled from "styled-components";
import moment from "moment";

interface OfferItemProps {
  offer: OfferPorps;
}

const Line = styled.p`
  margin-bottom: -10px;
`;

function OfferItem({ offer }: OfferItemProps) {
  return (
    <Space direction="vertical">
      <Line>{offer.title}</Line>
      <Line>{offer.description}</Line>
      <Line>Maximum people for this offer: {offer.maxPeople}</Line>
      {offer.repeat !== options.never ? (
        <Line>
          Start from: {moment(offer.startDate).format("YYYY-MM-DD")}{" "}
          {offer.endDate ? `to ${moment(offer.endDate).format("YYYY-MM-DD")}, ` : null}
          {offer.repeat}
        </Line>
      ) : (
        <Line>Available only on: {offer.startDate}</Line>
      )}
      <p style={{ marginBottom: 0 }}>
        Duration: {offer.startTime} - {offer.endTime}
      </p>
    </Space>
  );
}

export default OfferItem;
