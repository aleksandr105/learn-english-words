import axios from "axios";

export const instance = axios.create({
  baseURL: "https://learn-english-words-api.onrender.com/api",
});
