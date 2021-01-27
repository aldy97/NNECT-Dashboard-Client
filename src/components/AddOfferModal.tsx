import React, { useEffect, useState } from "react";
import {
  Modal,
  Space,
  Input,
  Switch,
  DatePicker,
  TimePicker,
  Dropdown,
  Menu,
  Button,
  InputNumber,
  message,
  Checkbox,
} from "antd";
import { OfferPorps } from "./Offers";
import { MESSAGES } from "../assets/constants";
import { USER } from "../reducers/userReducer";
import axios from "axios";
import moment, { Moment } from "moment";
import { URL } from "../assets/constants";

interface AddOfferModalProps {
  user: USER;
  offer?: OfferPorps;
  visible: boolean;
  handleCancel: () => void;
  getOffers: () => void;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum options {
  never = "Never",
  daily = "Daily",
  weekly = "Weekly",
  monthly = "Monthly",
}

function AddOfferModal({
  user,
  offer,
  visible,
  handleCancel,
  getOffers,
  setIsModalVisible,
}: AddOfferModalProps) {
  const menu = (
    <Menu>
      {Object.values(options).map((option, index) => {
        return (
          <Menu.Item
            key={index}
            onClick={() => {
              handleMenuItemClick(index);
            }}
          >
            <a>{option}</a>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [available, setAvailable] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>("");
  const [hasEndDate, setHasEndDate] = useState<boolean>(true);
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [maxPeople, setMaxPeople] = useState<number>(0);
  const [repeat, setRepeat] = useState<string>(options.never);

  // init modal values when being used as edit offer modal
  useEffect(() => {
    setTitle(offer ? offer.title : "");
    setDesc(offer ? offer.description : "");
    setAvailable(offer ? offer.available : true);
    setStartDate(offer ? offer.startDate : moment().format("L"));
    setHasEndDate(offer ? (offer.endDate === "" ? false : true) : true);
    setEndDate(offer ? offer.endDate || moment().format("L") : moment().format("L"));
    setStartTime(offer ? offer.startTime : moment().format("HH:mm"));
    setEndTime(offer ? offer.endTime : moment().format("HH:mm"));
    setMaxPeople(offer ? offer.maxPeople : 0);
    setRepeat(offer ? offer.repeat : options.never);
  }, [offer]);

  // create a new offer:
  const handleCreateConfirm = async () => {
    const requestBody = {
      title,
      restaurantID: user._id,
      description: desc,
      available,
      startDate,
      endDate: hasEndDate ? endDate : "",
      startTime,
      endTime,
      repeat,
      maxPeople,
    };
    const response = await axios.post(`${URL}/api/createOffer`, requestBody);
    if (response.status === 201) {
      message.success(MESSAGES.OFFER_ADD_SUCC);
      getOffers();
      setIsModalVisible(false);
    } else {
      message.error(response.data.message);
    }
  };

  // edit an existing offer:
  const handleEditConfirm = async () => {
    const request = {
      _id: offer?._id,
      updatedFields: {
        title,
        description: desc,
        available,
        startDate,
        endDate: hasEndDate ? endDate : "",
        startTime,
        endTime,
        repeat,
        maxPeople,
      },
    };

    const response = await axios.put(`${URL}/api/editOffer`, request);
    if (response.data.status === 200) {
      message.success(response.data.message);
      setIsModalVisible(false);
      getOffers();
    } else {
      message.error(response.data.message);
    }
  };

  const handleMaxPeopleChange = (value: string | number | null | undefined) => {
    setMaxPeople(value as number);
  };

  const handleStartDateChange = (value: Moment | null, dateString: string) => {
    setStartDate(dateString);
  };

  const handleEndDateChange = (value: Moment | null, dateString: string) => {
    setEndDate(dateString);
  };

  const handleStartTimeChange = (time: Moment | null, timeString: string) => {
    setStartTime(timeString);
  };

  const handleEndTimeChange = (time: Moment | null, timeString: string) => {
    setEndTime(timeString);
  };

  const handleMenuItemClick = (index: number) => {
    const optionsArr = Object.values(options);
    setRepeat(optionsArr[index]);
  };

  return (
    <Modal
      title={offer ? "Edit this offer" : "Add a special offer"}
      visible={visible}
      onOk={offer ? handleEditConfirm : handleCreateConfirm}
      onCancel={handleCancel}
    >
      <Space direction="vertical">
        <div>Title:</div>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></Input>
        <div>Description:</div>
        <Input
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        ></Input>
        <Space direction="horizontal">
          <div>Maximum people for this offer:</div>
          <InputNumber
            value={maxPeople}
            onChange={(value) => {
              handleMaxPeopleChange(value);
            }}
          ></InputNumber>
        </Space>

        <Space direction="horizontal">
          <div>Recurring:</div>
          <Dropdown overlay={menu}>
            <Button>{repeat}</Button>
          </Dropdown>
        </Space>

        <Space direction="horizontal">
          <div>Select start date:</div>
          <DatePicker
            allowClear={false}
            value={moment(startDate)}
            onChange={handleStartDateChange}
          ></DatePicker>
        </Space>

        {repeat !== options.never && (
          <Space direction="horizontal">
            <div>Select end date:</div>
            <DatePicker
              value={moment(endDate)}
              onChange={handleEndDateChange}
              disabled={!hasEndDate}
              allowClear={false}
            ></DatePicker>
            <span>or do not set for now:</span>
            <Checkbox
              checked={!hasEndDate}
              onChange={() => {
                setHasEndDate(!hasEndDate);
              }}
            ></Checkbox>
          </Space>
        )}

        <Space direction="horizontal">
          <div>From</div>
          <TimePicker
            allowClear={false}
            value={moment(startTime, "HH:mm")}
            format="HH:mm"
            onChange={handleStartTimeChange}
          ></TimePicker>
          <div>To</div>
          <TimePicker
            allowClear={false}
            value={moment(endTime, "HH:mm")}
            format="HH:mm"
            onChange={handleEndTimeChange}
          ></TimePicker>
        </Space>

        <Space direction="horizontal">
          <span>Activated:</span>
          <Switch checked={available} onChange={() => setAvailable(!available)}></Switch>
        </Space>
      </Space>
    </Modal>
  );
}

export default AddOfferModal;
