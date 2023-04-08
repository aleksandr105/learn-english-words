import { Wrapper } from "./App.styled";
import Button from "@mui/material/Button";
import { Header } from "../Header/Header";

const App = () => {
  return (
    <>
      <Header />
      <Wrapper className="App">
        <Button variant="contained">Hello World</Button>
      </Wrapper>
    </>
  );
};

// "homepage": "https://aleksandr105.github.io/learn-english-words/",

export default App;
