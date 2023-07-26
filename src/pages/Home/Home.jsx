import { Spinner } from "../../components/Spinner/Spinner";
import { DescriptionHome } from "../../components/DescriptionHome/DescriptionHome";
import { MainTitle } from "../../components/MainTitle/MainTitle";

const Home = ({ showSpinner }) => {
  if (showSpinner)
    return (
      <div style={{ marginTop: "29vh" }}>
        <Spinner isLoad={true} />
      </div>
    );

  return (
    <>
      <MainTitle />
      <DescriptionHome />
    </>
  );
};

export default Home;
