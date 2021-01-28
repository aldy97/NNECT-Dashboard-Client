import React from "react";
import { Table, Empty } from "antd";

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

function Reservation() {
  return (
    <Table columns={columns}>
      <Empty></Empty>
    </Table>
  );
}

export default Reservation;
