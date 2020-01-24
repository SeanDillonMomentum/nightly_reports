import axios from "axios";

export const sendEmail = body =>
  axios.post("http://localhost:3005/api/send", body, {
    headers: { "Access-Control-Allow-Origin": "*" }
  });
