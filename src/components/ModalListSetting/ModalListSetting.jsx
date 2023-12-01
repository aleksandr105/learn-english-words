import React from "react";
import { List } from "./ModalListSetting.styled";

export const ModalListSetting = ({ data }) => {
  return (
    <List>
      {data.map((el) => (
        <li key={el}>{el}</li>
      ))}
    </List>
  );
};
