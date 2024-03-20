import { cloneDeep } from "lodash";
import moment from "moment";
import * as React from "react";
import { jwtDecode } from "jwt-decode";;
import { config } from '../utility/config/index';
import { LOGIN_API } from './ApiList';
import storage from './storage/asyncStorage';
import { Text } from 'react-native';

export type returnTypeForString = string | null | undefined;
export type returnTypeForRegex = RegExp | null | undefined;

/** List of APIs that should exclude token authentication. */
export const excludeTokenAPIList: Array<string> = [LOGIN_API];
/** Message to display when no records are found. */
export const NO_RECORD_FOUND_MSG = "No Records found.";
/** Date format for storing dates in the application. */
export const DATE_FORMAT = "dd-MM-yyyy";
/** Date format for displaying dates in the user interface. */
export const DATE_FORMAT_FOR_DISPLAY = "DD-MM-YYYY";
/** Maximum file size for a general blob in kilobytes. */
export const FILE_SIZE_FOR_BLOB = 60 * 1024;
/** Maximum file size for a general file in megabytes. */
export const FILE_SIZE = 1 * 1024 * 1024;
/** Maximum file size for a mark sheet file in megabytes. */
export const FILE_SIZE_FOR_MARKSHEET = 10 * 1024 * 1024;
/** Array of supported image formats. */
export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];


/** Function to get the token of the logged-in user from async storage. */
export const getToken = () => {
  const userData: any = storage.getAsyncStorage('userData');

  return userData ? userData.token : "";
};

/**
 * Function to generate a random number as a string.
 * @returns {string} - A random number as a string.
 */
export const getRandomNumber = (): string => {
  return Math.random().toString().substr(2);
};


/**
 * Function to check if a given value is empty or not.
 * @param {string | null} value - The value to be checked.
 * @returns {boolean} - Returns true if the value is empty, false otherwise.
 */
export const isEmpty = (value: string | null) => {
  return (
    (typeof value == "string" && !value.trim()) ||
    typeof value == "undefined" ||
    value === null
  );
};

/**
 * Function to get a formatted date string.
 * @param {moment.MomentInput} date - The input date.
 * @param {string} format - The format in which the date string should be returned.
 * @returns {string} - The formatted date string.
 */
export const getDate = (
  date: moment.MomentInput,
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  return !date ? moment().format(format) : moment(date).format(format);
};

/**
 * Checks if a value is null, undefined, or an empty string.
 *
 * @param {any} obj - The value to be checked.
 * @returns {boolean} - True if the value is null, undefined, or an empty string; false otherwise.
 */
export const isNullUndefinedOrBlank = (obj: any): boolean => {
  if (obj == null || obj === undefined || (obj === "" && obj !== 0)) {
    return true;
  }
  return false;
};

/**
 * Checks if any of the provided values is null, undefined, or an empty object.
 *
 * @param {...any} value - The values to be checked.
 * @returns {boolean} - True if any of the values is null, undefined, or an empty object; false otherwise.
 */
export const isEmptyObjectOrNullUndefiend = (...value: any): boolean => {
  if (value && value.length > 0) {
    for (let i = 0; i < value.length; i++) {
      if (isNullUndefinedOrBlank(value[i]) || isEmptyObject(value[i])) {
        return true;
      }
    }
  }
  return false;
};
/*
 *
 * Used to check if object ios empaty or not..!
 * @param obj = 'indecated object which you want to check'
 * return true if empty..!
 */
export const isEmptyObject = (obj: any): boolean => {
  return obj && Object.keys(obj).length === 0;
};

/**
 * Checks if the provided value is numeric.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} - True if the value is numeric; false otherwise.
 */
export const isNumeric = (value: any): boolean => {
  return /^\d+$/.test(value);
};

/**
 * Prevents leading spaces in the input value.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
 * @returns {void}
 */
export const preventSpace = (
  event: React.ChangeEvent<HTMLInputElement>
): void => {
  event.target.value = event.target.value.replace(/^\s+/g, "");
};

/**   Decimal adjustment of a number.
 * @param { String } type The type of adjustment.
 * @param { Number }  value The number.
 * @param { Integer } exp   The exponent(the 10 logarithm of the adjustment base).
 * @returns { Number } The adjusted value.
 **/
export const decimalAdjust = (
  type: string,
  value: number | string[],
  exp: number
): number => {
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    //@ts-ignore
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split("e");
  //@ts-ignore
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
};

/**
 * Recursively removes undefined, null, or empty string properties from an object.
 * Additionally, removes empty elements from arrays.
 *
 * @param {Object} obj - The input object to be processed.
 * @returns {void}
 */
export const customJsonInclude = (obj): void => {
  for (const key in obj) {
    // console.log(`key:- ${key} ` + typeof obj[key]);
    // console.log(obj[key]);
    const flag = obj[key] instanceof Blob;
    if (typeof obj[key] === "object" && !flag) {
      // console.log(key);

      if (obj[key] && obj[key].length > 0) {
        obj[key] = removeEmptyElementsFromArray(obj[key]);
      }
      if (isEmptyObject(obj[key])) {
        delete obj[key];
      } else {
        customJsonInclude(obj[key]);
      }
    } else {
      if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
        delete obj[key];
      }
    }
  }
};

/**
 * This Method Is Use From Remove Empty Element From Array
 * @param test_array  your selected array pass as args.
 */
const removeEmptyElementsFromArray = (test_array): Array<any> => {
  let index = -1;
  const arr_length = test_array ? test_array.length : 0;
  let resIndex = -1;
  const result: any = [];

  while (++index < arr_length) {
    const id = test_array[index];
    if (id) {
      result[++resIndex] = id;
    }
  }
  return result;
};


/**
 * Renders an error message in a paragraph element with the 'error-msg' class.
 * @param {boolean|React.ReactChild|React.ReactFragment|React.ReactPortal|null|undefined} message - The error message to be rendered.
 * @returns {JSX.Element} - A JSX element representing the rendered error message.
 */
export const renderError = (
  message:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
) => <Text style={{ color: "#F00F00", fontSize: 13 }}>{message}</Text>;

