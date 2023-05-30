import { Routes, Route, useSearchParams } from "react-router-dom";
import { SharedLayout } from "../SharedLayout/SharedLayout";
import { lazy } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../redux/auth/authOperations";
import { useSelector } from "react-redux";
import { isLoading } from "../../redux/auth/selectors";

const Home = lazy(() => import("../../pages/Home/Home"));
const Learn = lazy(() => import("../../pages/Learn/Learn"));
const MyStatistic = lazy(() => import("../../pages/myStatistics/MyStatistic"));
const Login = lazy(() => import("../../pages/Login/Login"));
const Signup = lazy(() => import("../../pages/Signup/Signup"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    console.log(accessToken, refreshToken);
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
    dispatch(getCurrentUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;

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
