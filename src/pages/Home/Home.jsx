import { instance } from "../../axiosSettings";
import { Spinner } from "../../components/Spinner/Spinner";

const Home = ({ showSpinner }) => {
  const getUser = async () => {
    try {
      const { data } = await instance.get("/auth/current");
      console.log(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  if (showSpinner)
    return (
      <div style={{ marginTop: "29vh" }}>
        <Spinner isLoad={true} />
      </div>
    );

  return (
    <div style={{ marginTop: "150px" }}>
      Home Page
      <button type="button" onClick={getUser}>
        get current user
      </button>
    </div>
  );
};

export default Home;
