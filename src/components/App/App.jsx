import { Routes, Route } from "react-router-dom";
import { SharedLayout } from "../SharedLayout/SharedLayout";
import { lazy } from "react";

const Home = lazy(() => import("../../pages/Home/Home"));
const Learn = lazy(() => import("../../pages/Learn/Learn"));
const MyStatistic = lazy(() => import("../../pages/myStatistics/MyStatistic"));
const Login = lazy(() => import("../../pages/Login/Login"));
const Signup = lazy(() => import("../../pages/Signup/Signup"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="learn" element={<Learn />} />
        <Route path="statistic" element={<MyStatistic />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
