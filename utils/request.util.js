import axios from "axios";
import { API } from "../config/api";

const baseUrl = API;

const request = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default request;
