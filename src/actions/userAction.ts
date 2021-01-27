import { USER } from "../reducers/userReducer";

export const UPDATE_USER_INFO = "update user information";
export const CLEAR_USER_INFO = "clear user information";

export interface UpdateUserInfo {
  type: typeof UPDATE_USER_INFO;
  user: USER;
}

export interface ClearUserInfo {
  type: typeof CLEAR_USER_INFO;
}

export type UserAction = UpdateUserInfo | ClearUserInfo;
