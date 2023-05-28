import { instance } from "../../axiosSettings";

const Home = () => {
  const getUser = async () => {
    try {
      const { data } = await instance.get("/auth/current");
      console.log(data.name);
    } catch (error) {
      console.log(error);
    }
  };

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
