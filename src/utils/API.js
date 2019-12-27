import axios from 'axios';

export const createInventory = body =>
  axios.post(
    'https://ubpl5uno1h.execute-api.us-east-2.amazonaws.com/Prod/createinventory',
    body
  );
export const deleteInventory = body =>
  axios.post(
    'https://ubpl5uno1h.execute-api.us-east-2.amazonaws.com/Prod/deleteinventory',
    body
  );
export const editInventory = body =>
  axios.post(
    'https://ubpl5uno1h.execute-api.us-east-2.amazonaws.com/Prod/editinventory',
    body
  );
export const getAllInventory = () =>
  axios.get(
    'https://ubpl5uno1h.execute-api.us-east-2.amazonaws.com/Prod/getallinventory'
  );
export const getTransactions = () =>
  axios.get(
    'https://ubpl5uno1h.execute-api.us-east-2.amazonaws.com/Prod/gettransactions'
  );
export const getByPin = pin =>
  axios.get(
    `https://ubpl5uno1h.execute-api.us-east-2.amazonaws.com/Prod/getbypin?pin=${pin}`
  );

export const createUser = body =>
  axios.post(
    `https://ubpl5uno1h.execute-api.us-east-2.amazonaws.com/Prod/createuser`,
    body
  );

export const getAllUsers = () =>
  axios.get(
    `https://ubpl5uno1h.execute-api.us-east-2.amazonaws.com/Prod/getallusers`
  );

export const deleteUser = body =>
  axios.post(
    'https://ubpl5uno1h.execute-api.us-east-2.amazonaws.com/Prod/deleteuser',
    body
  );

export const sendEmail = (title, message) =>
  axios.post(
    'https://i43wwmlq8e.execute-api.us-east-2.amazonaws.com/prod/sendemail',
    {
      sendTo: 'adimaria@momentumsolar.com',
      title,
      message,
    }
  );
