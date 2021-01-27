import React from "react";
import { Calendar, Popover } from "antd";
import styled from "styled-components";
import { options } from "./AddOfferModal";
import moment, { Moment } from "moment";
import { connect } from "react-redux";
import { OfferPorps } from "./Offers";
import { RootState } from "../reducers/index";

const CalendarWrapper = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  margin-bottom: -10px;
`;

interface CalendarProps {
  offers: OfferPorps[];
}

interface Data {
  content: string;
  duration: { start: string; end: string };
}

function OffersCalendar({ offers }: CalendarProps) {
  // get applicable offers being provided on that date
  const getListData = (value: Moment): Data[] => {
    let listData: Data[] = [];
    const date = value.format("L");
    offers = offers.filter((offer) => offer.available);
    for (const offer of offers) {
      // non-recurring offer
      if (moment(date).isSame(offer.startDate, "day")) {
        listData.push({
          content: offer.title,
          duration: { start: offer.startTime, end: offer.endTime },
        });
      }

      // daily offer without endDate
      if (
        offer.endDate === "" &&
        offer.repeat === options.daily &&
        moment(date).isAfter(offer.startDate)
      ) {
        listData.push({
          content: offer.title,
          duration: { start: offer.startTime, end: offer.endTime },
        });
      }

      // daily offer with endDate
      if (
        offer.endDate !== "" &&
        offer.repeat === options.daily &&
        moment(date).isBetween(offer.startDate, moment(offer.endDate).add(1, "day"))
      ) {
        listData.push({
          content: offer.title,
          duration: { start: offer.startTime, end: offer.endTime },
        });
      }

      // weekly offer wihtout endDate
      if (
        offer.endDate === "" &&
        offer.repeat === options.weekly &&
        moment(date).isAfter(offer.startDate) &&
        moment(date).diff(moment(offer.startDate), "days") % 7 === 0
      ) {
        listData.push({
          content: offer.title,
          duration: { start: offer.startTime, end: offer.endTime },
        });
      }

      // weekly offer with endDate
      if (
        offer.endDate !== "" &&
        offer.repeat === options.weekly &&
        moment(date).isBetween(offer.startDate, moment(offer.endDate).add(1, "day")) &&
        moment(date).diff(moment(offer.startDate), "days") % 7 === 0
      ) {
        listData.push({
          content: offer.title,
          duration: { start: offer.startTime, end: offer.endTime },
        });
      }

      // monthly offer without endDate
      if (
        offer.endDate === "" &&
        offer.repeat === options.monthly &&
        moment(date).isAfter(offer.startDate) &&
        moment(date).format("DD") === moment(offer.startDate).format("DD")
      ) {
        listData.push({
          content: offer.title,
          duration: { start: offer.startTime, end: offer.endTime },
        });
      }

      // monthly offer with endDate
      if (
        offer.endDate !== "" &&
        offer.repeat === options.monthly &&
        moment(date).isBetween(offer.startDate, moment(offer.endDate).add(1, "day")) &&
        moment(date).format("DD") === moment(offer.startDate).format("DD")
      ) {
        listData.push({
          content: offer.title,
          duration: { start: offer.startTime, end: offer.endTime },
        });
      }
    }

    return listData || [];
  };

  // value is the date that the date cell represents
  // this is called interating through every single day in the calendar
  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);

    return listData.length > 0 ? (
      <Popover
        trigger="click"
        content={
          <div>
            {listData.map((data) => {
              return (
                <div>
                  <div> {data.content}</div>
                  <div style={{ borderBottom: "1px solid #eee" }}>
                    {data.duration.start} - {data.duration.end}
                  </div>
                </div>
              );
            })}
          </div>
        }
      >
        <ul>
          {listData.map((item) => {
            return <li key={item.content}>{item.content}</li>;
          })}
        </ul>
      </Popover>
    ) : (
      <div></div>
    );
  };

  const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value: any) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  return (
    <CalendarWrapper>
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    </CalendarWrapper>
  );
}

const mapState = (state: RootState) => {
  return {
    offers: state.OfferReducer.offers,
  };
};

export default connect(mapState, null)(OffersCalendar);
