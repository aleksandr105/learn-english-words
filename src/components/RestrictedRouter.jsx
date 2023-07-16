import { isLoggedIn } from "../redux/auth/selectors";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const RestrictedRouter = ({ component: Component, redirectTo }) => {
  const loggedin = useSelector(isLoggedIn);

  return loggedin ? <Navigate to={redirectTo} /> : <Component />;
};
