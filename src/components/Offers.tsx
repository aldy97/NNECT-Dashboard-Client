import React, { useEffect, useState } from "react";
import Modal from "./AddOfferModal";
import OfferItem from "./OfferItem";
import { Card, CardHeader, CardBody, Table, Col } from "reactstrap";
import { Checkbox, Button, Empty, Popconfirm, message } from "antd";
import { MESSAGES } from "../assets/constants";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { UPDATE_OFFERS, UpdateOffers } from "../actions/offerAction";
import { connect } from "react-redux";
import { USER } from "../reducers/userReducer";
import { RootState } from "../reducers/index";
import { Dispatch } from "redux";
import { URL, DEV_URL } from "../assets/constants";

export interface OfferPorps {
  _id: string;
  title: string;
  description: string;
  available: boolean;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  repeat: string;
  maxPeople: number;
}

interface OffersProperty {
  user: USER;
  updateOffersToRedux: (offers: OfferPorps[]) => void;
}

const BASE_URL = process.env.NODE_ENV === "production" ? URL : DEV_URL;

function Offers({ user, updateOffersToRedux }: OffersProperty) {
  // add offer modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // edit offer modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // all offers
  const [offers, setOffers] = useState<OfferPorps[]>([]);
  // an offer is selected after edit btn is clicked
  const [selectedOffer, setSelectedOffer] = useState<OfferPorps>();

  const getOffers = async () => {
    const response = await axios.get(`${BASE_URL}/api/getOffers/${user._id}`);
    const offers: OfferPorps[] = response.data.offers;
    if (offers) {
      setOffers(offers);
      updateOffersToRedux(offers);
    }
  };

  const handleEditBtnClick = (index: number) => {
    setSelectedOffer(offers[index]);
    setIsEditModalVisible(true);
  };

  const handleDelBtnClick = async (index: number) => {
    const result = await axios.delete(`${BASE_URL}/api/deleteOffer/${offers[index]._id}`);
    if (result.status === 204) {
      getOffers();
      message.success(MESSAGES.OFFER_DEL_SUCC);
    } else {
      message.error(MESSAGES.OFFER_DEL_FAIL);
    }
  };

  // Following functions handle add offer modal behavior
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // handle edit modal behavior
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <Col lg="6" md="12">
      <Card className="card-tasks">
        <CardHeader>
          <h4 style={{ fontWeight: 100 }} className="title d-inline">
            Special Offers
          </h4>
          {/* <UncontrolledDropdown>
            <DropdownToggle
              caret
              className="btn-icon"
              color="link"
              data-toggle="dropdown"
              type="button"
            >
              <i className="tim-icons icon-settings-gear-63" />
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuLink" right>
              <DropdownItem href="#pablo" onClick={showModal}>
                Add Another Offer
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          {offers.length !== 0 && (
            <PlusCircleOutlined
              style={{ float: "right", marginRight: 6, fontSize: 16, marginTop: 4 }}
              onClick={showModal}
            ></PlusCircleOutlined>
          )}
        </CardHeader>
        <CardBody>
          <div className="table-full-width table-responsive">
            <Table>
              <tbody>
                {offers.length ? (
                  offers.map((offer, index) => {
                    return (
                      <tr key={offer._id}>
                        <td>
                          <Checkbox checked={offer.available}></Checkbox>
                        </td>
                        <td>
                          <OfferItem offer={offer} />
                        </td>
                        <td className="td-actions text-right">
                          <span>
                            <EditOutlined
                              style={{ cursor: "pointer", fontSize: "25x", color: "#1d8cf8" }}
                              onClick={() => {
                                handleEditBtnClick(index);
                              }}
                            ></EditOutlined>
                            <Popconfirm
                              placement="top"
                              title="Are you sure you want to delete this offer?"
                              onConfirm={() => {
                                handleDelBtnClick(index);
                              }}
                              cancelText="No"
                              okText="Confirm"
                            >
                              <DeleteOutlined
                                style={{
                                  cursor: "pointer",
                                  fontSize: "25x",
                                  marginLeft: 10,
                                  color: "#f5365c",
                                }}
                              ></DeleteOutlined>
                            </Popconfirm>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <Empty style={{ marginTop: 24 }} description="No special offers yet">
                    <Button type="primary" onClick={showModal}>
                      Create one offer
                    </Button>
                  </Empty>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Modal
        user={user}
        visible={isModalVisible}
        handleCancel={handleCancel}
        getOffers={getOffers}
        setIsModalVisible={setIsModalVisible}
      ></Modal>

      <Modal
        user={user}
        offer={selectedOffer}
        visible={isEditModalVisible}
        handleCancel={handleEditCancel}
        getOffers={getOffers}
        setIsModalVisible={setIsEditModalVisible}
      ></Modal>
    </Col>
  );
}

const mapState = (state: RootState) => {
  return {
    user: state.UserReducer.user,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateOffersToRedux(offers: OfferPorps[]) {
      const action: UpdateOffers = {
        type: UPDATE_OFFERS,
        offers,
      };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(Offers);
