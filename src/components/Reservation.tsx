import React from "react";
import { Table, Empty, Button, Dropdown, Menu } from "antd";
import { COLORS } from "../assets/constants";

function Reservation() {
  enum Status {
    RECEIVED = "Received",
    CANCELLED = "Cancelled",
    CONFIRMED = "Confirmed",
    FINISHED = "Finished",
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a>{Status.RECEIVED}</a>
      </Menu.Item>
      <Menu.Item>
        <a>{Status.CANCELLED}</a>
      </Menu.Item>
      <Menu.Item>
        <a>{Status.CONFIRMED}</a>
      </Menu.Item>
      <Menu.Item>
        <a>{Status.FINISHED}</a>
      </Menu.Item>
    </Menu>
  );

  // when received from server, status is a string, but it should be rendered as a node
  interface Reservation {
    time: string;
    number: number;
    organizer: string;
    contact: string;
    email: string;
    offer: string;
    status: React.ReactNode | string;
  }

  const columns: { title: string; dataIndex: string; key: string }[] = [
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Speical offer applied",
      dataIndex: "offer",
      key: "offer",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  // TODO: this will be fetched from Gagan's server
  const data: Reservation[] = [
    {
      time: "2021-02-05",
      number: 10,
      organizer: "Tom",
      contact: "778-583-7371",
      email: "fengxiong34@gmail.com",
      offer: "No offer",
      status: (
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button style={{ background: COLORS.YELLOW }}>{Status.RECEIVED}</Button>
        </Dropdown>
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={data}>
      <Empty></Empty>
    </Table>
  );
}

export default Reservation;
