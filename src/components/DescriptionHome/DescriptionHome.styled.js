import styled from "@emotion/styled";

export const Section = styled.section`
  padding-bottom: 80px;
  p:not(:last-child) {
    margin-bottom: 30px;
  }
  p {
    /* border: 2px solid silver; */
    color: black;
    background-color: #dddddd;
    padding: 15px;
    border-radius: 20px;
    font-weight: 600;
    text-indent: 20px;
    font-size: 20px;
  }
  span {
    display: block;
    margin-top: 8px;
  }
`;
