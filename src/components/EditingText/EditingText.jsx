import React from "react";
import { ItemText, Span } from "./EditingText.styled";

export const EditingText = ({ text, query }) => {
  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <>
      {parts.map((el, idx) => {
        return el.toLowerCase() === query.toLowerCase() ? (
          <Span key={idx}>{el}</Span>
        ) : (
          <ItemText key={idx}>{el}</ItemText>
        );
      })}
    </>
  );
};
