import { CLEAR_USER_INFO, UPDATE_USER_INFO, UserAction } from "../actions/userAction";

export interface USER {
  _id: string;
  name: string;
  buesinessName?: string;
  managerName?: string;
  managerNumber?: string;
  managerEmail?: string;
  email: string;
  phoneNumber: string;
  password: string;
  menu?: [];
  offers?: [];
  GST?: string;
  city?: string;
  streetAddress?: string;
  postCode?: string;
  maxCapacity?: string;
  resetCode?: number;
  createdOn?: string;
  updatedOn?: string;
}

export interface UserReducerProps {
  user: USER;
}

const initialState: UserReducerProps = {
  user: {
    _id: "",
    name: "",
    buesinessName: "",
    managerName: "",
    managerNumber: "",
    managerEmail: "",
    email: "",
    phoneNumber: "",
    password: "",
    menu: [],
    offers: [],
    GST: "",
    city: "",
    streetAddress: "",
    postCode: "",
    maxCapacity: "",
    createdOn: "",
    updatedOn: "",
  },
};

export const UserReducer = (
  state: UserReducerProps = initialState,
  action: UserAction
): UserReducerProps => {
  switch (action.type) {
    case UPDATE_USER_INFO: {
      console.log(`user updated in redux: ${action.user}`);
      return { user: action.user };
    }
    case CLEAR_USER_INFO: {
      return { user: initialState.user };
    }
    default:
      return state;
  }
};
