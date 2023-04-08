import { AppBar, Container } from "@mui/material";
import logo from "../../SVG/symbol-defs.svg";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ paddingTop: "5px", paddingBottom: "5px" }}>
      <Container>
        <a href="/">
          <svg
            style={{
              width: 36,
              height: 36,
              borderRadius: 50,
              backgroundColor: "#5F5",
              fill: "#00F",
            }}
          >
            <use href={`${logo}#icon-logo`}></use>
          </svg>
        </a>
      </Container>
    </AppBar>
  );
};
