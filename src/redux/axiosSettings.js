import axios from "axios";

export const instance = axios.create({
  baseURL: "https://cute-tan-slug-hat.cyclic.app/api",
});
