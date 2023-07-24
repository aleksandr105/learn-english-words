import { instance } from "../axiosSettings";

export const sendMessageDeveloper = async (data) => {
  try {
    await instance.post("/send/developer", data);
  } catch (error) {
    console.log(error);
  }
};
