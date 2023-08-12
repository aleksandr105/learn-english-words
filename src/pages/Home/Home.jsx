import { Spinner } from "../../components/Spinner/Spinner";
import { DescriptionHome } from "../../components/DescriptionHome/DescriptionHome";
import { MainTitle } from "../../components/MainTitle/MainTitle";
import { SpinnerWrapper } from "./Home.styled";

const Home = ({ showSpinner }) => {
  if (showSpinner)
    return (
      <>
        <MainTitle />
        <SpinnerWrapper>
          <Spinner isLoad={true} />
        </SpinnerWrapper>
      </>
    );

  return (
    <>
      <MainTitle />
      <DescriptionHome />
    </>
  );
};

export default Home;
