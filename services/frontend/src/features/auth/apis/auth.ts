import { axiosRequest } from "../../../shared/axios/request";
import { AUTH_URL } from "../constants/url";
import type { AuthPayloadType, AuthType } from "../types";

export const postLogin = async ({ email, password }: AuthPayloadType) => {
  return axiosRequest.post<AuthPayloadType, AuthType>("/users/login", {
    email,
    password,
  });
};

export const postJoin = async ({ email, password }: AuthPayloadType) => {
  return axiosRequest.post<AuthPayloadType, AuthType>("/users/create", {
    email,
    password,
  });
};

export const logout = () => {
  window.localStorage.removeItem("token");
  location.href = AUTH_URL.LOGIN.PATH;
};
