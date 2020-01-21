import axios from "axios";

export const sendEmail = body => axios.post("/api/send", body);
