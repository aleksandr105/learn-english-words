import { Title } from "./App.styled";
import { Header } from "../Header/Header";
import { List } from "../List/List";
import { Container } from "@mui/material";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>Learn english words</Title>
      </Container>
      <List />
    </>
  );
};

export default App;
