import { instance } from "../axiosSettings";

export const sendMessageDeveloper = async (data) => {
  try {
    await instance.post("/send/developer", data);
  } catch (error) {
    console.log(error);
  }
};

export const getTotalUsers = async () => {
  try {
    return await instance.get("/statistics/total/users");
  } catch (error) {
    console.log(error);
  }
};

export const saveStatistic = async (answer) => {
  try {
    await instance.patch("/statistics/save_statistic", { answer });
  } catch (error) {
    console.log(error);
  }
};
