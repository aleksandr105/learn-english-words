import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("fech");
  }, []);

  return <div>Home Page</div>;
};

export default Home;
