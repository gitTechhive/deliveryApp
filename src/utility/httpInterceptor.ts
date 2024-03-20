import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  getServerValidation,
  getToken,
  excludeTokenAPIList
} from "./Helper";

import { ResponseWrapperDTO } from '../models/model';
import { config } from '../utility/config/index';
import toast from './toast';

export type responseType = ReturnType<typeof handleResponse>;
export type errorType = ReturnType<typeof handleError>;

/**
 * Function to make a POST request to an API endpoint.
 * @param {string} url - The URL of the API endpoint.
 * @param {any} bodyObj - The request body object.
 * @param {boolean} isPrivate - Indicates whether the API endpoint requires authentication.
 * @param {boolean} mediaFile - Indicates whether the request contains media files.
 * @param {boolean} uat - Indicates whether the request is for UAT.
 * @returns {Promise<AxiosResponse>} - A promise that resolves to the Axios response.
 */
export const post = (
  url: string,
  bodyObj = {} as any,
  isPrivate = true,
  mediaFile = false,
  uat = false
): Promise<AxiosResponse> => {

  let header: any = {};
  /**  If the request contains media files, convert the body to FormData */
  if (mediaFile == true) {
    const formData = new FormData();
    console.log("bodyObj", bodyObj);
    Object.keys(bodyObj).map((key) => {
      formData.append(key, bodyObj[key]);
    });
    bodyObj = formData;
  }
  header = {
    'Content-Type': 'application/json',
  };
  /**  If the URL is not in the excludeTokenAPIList, add token to headers */
  if (excludeTokenAPIList.indexOf(url) < 0) {
    header = {
      token: getToken() ? getToken() : "",
    };
  }
  console.log("body", bodyObj);

  return axios
    .post(url, bodyObj, { headers: header })
    .then((response: any) => handleResponse(response))
    .catch((error: any) => {
      console.log("error interceptor", error.message);
      return handleError(error);
    });
};

/**
 * Function to handle the API response.
 * @param {any} response - The API response.
 * @returns {AxiosResponse<ResponseWrapperDTO>} - The modified Axios response.
 */
const handleResponse = (response: any): AxiosResponse<ResponseWrapperDTO> => {
  console.log(response);

  return {
    ...response,
  };
};

/**
 * Function to handle API errors.
 * @param {any} error - The error object.
 */
const handleError = (error: any): any => {
  const { response } = error;
  const parsedError = response && JSON.parse(JSON.stringify(response.data));

  let errorMsg: string | undefined =
    "Sorry, something went wrong. Please try again.";
  if (response && response != undefined && response.status === 422) {
    if (response.data && response.data.errors)
      errorMsg = getServerValidation(response.data.errors) || errorMsg;
    else if (response.data.message) errorMsg = response.data.message;
  } else if (parsedError && parsedError.status == 503) {
    errorMsg = parsedError.error;
    toast.showToast(true, '', errorMsg);
    return;
  } else if (
    response &&
    response != undefined &&
    JSON.parse(JSON.stringify(response.data)).toString().includes("401")
  ) {
    // Unauthorized
    toast.showToast(true, '', "Not Authorized User");

  } else if (response && response != undefined && response.status === 401) {
    toast.showToast(true, '', "Not Authorized User");
  }
  else {
    toast.showToast(true, '', "Sorry, something went wrong. Please try again.");
  }
};
