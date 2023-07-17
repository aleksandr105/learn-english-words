import { Routes, Route, useSearchParams } from "react-router-dom";
import { SharedLayout } from "../SharedLayout/SharedLayout";
import { lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../redux/auth/authOperations";
import { useSelector } from "react-redux";
import { isRefreshing } from "../../redux/auth/selectors";
import { RestrictedRouter } from "../RestrictedRouter";
import { PrivateRouter } from "../PrivateRouter";

const Home = lazy(() => import("../../pages/Home/Home"));
const Learn = lazy(() => import("../../pages/Learn/Learn"));
const MyStatistic = lazy(() => import("../../pages/myStatistics/MyStatistic"));
const Login = lazy(() => import("../../pages/Login/Login"));
const Signup = lazy(() => import("../../pages/Signup/Signup"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

const App = () => {
  const dispatch = useDispatch();
  const refreshing = useSelector(isRefreshing);
  const [searchParams] = useSearchParams();
  const [dispatchCompleted, setDispatchCompleted] = useState(false);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }

    if (
      localStorage.getItem("accessToken") === "null" ||
      localStorage.getItem("refreshToken") === "null"
    )
      return;

    dispatch(getCurrentUser()).then(() => {
      setDispatchCompleted(true);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (refreshing || !dispatchCompleted) return <h2>Loading...</h2>;

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="learn" element={<Learn />} />
        <Route
          path="statistic"
          element={
            <PrivateRouter component={MyStatistic} redirectTo="/login" />
          }
        />
        <Route
          path="login"
          element={<RestrictedRouter component={Login} redirectTo="/" />}
        />
        <Route
          path="signup"
          element={<RestrictedRouter component={Signup} redirectTo="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
