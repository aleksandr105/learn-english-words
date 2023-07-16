import { isLoggedIn, isRefreshing } from "../redux/auth/selectors";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRouter = ({ component: Component, redirectTo }) => {
  const loggedin = useSelector(isLoggedIn);
  const refreshing = useSelector(isRefreshing);
  console.log("private");

  return !loggedin && !refreshing ? (
    <Navigate to={redirectTo} />
  ) : (
    <Component />
  );
};
