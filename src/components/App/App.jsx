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

export default App;
