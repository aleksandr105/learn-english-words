import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Section = styled.section`
  padding-bottom: 80px;
  p:not(:last-child) {
    margin-bottom: 30px;
  }
  p,
  div {
    color: black;
    background-color: #dddddd;
    padding: 15px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 20px;
    :not(:last-child) {
      text-indent: 20px;
    }
  }
`;

export const RegisteredUsers = styled.p`
  span {
    display: block;
    margin-top: 8px;
  }
`;

export const TotalUsersTitle = styled.div`
  text-align: center;
  span {
    display: inline-block;
    color: #00f;
    background-color: #5f5;
    padding: 2px 10px;
    border-radius: 20px;
    text-indent: 0px;
  }
`;

export const LearnLink = styled(Link)`
  background-color: #5f5;
  color: #00f;
  padding: 1px 8px;
  border-radius: 20px;
`;
