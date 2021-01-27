import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Event time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Number of customers",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Name of organizer",
    dataIndex: "organizer",
    key: "organizer",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "Speical offer applied",
    dataIndex: "offer",
    key: "offer",
  },
];

const data = [
  {
    key: "1",
    time: "20:30",
    number: 10,
    organizer: "Jack Jones",
    contact: "778-304-5620",
    offer: "No offer is applied",
  },
  {
    key: "2",
    time: "21:30",
    number: 5,
    organizer: "Sarah Leed",
    contact: "694-905-4680",
    offer: "Family Time",
  },
  {
    key: "3",
    time: "22:30",
    number: 8,
    organizer: "Tom Rivers",
    contact: "778-324-7245",
    offer: "Weekend Offer",
  },
];

function Reservation() {
  return <Table columns={columns} dataSource={data}></Table>;
}

export default Reservation;
