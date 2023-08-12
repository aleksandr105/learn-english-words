import { isLoggedIn, isRefreshing } from "../redux/auth/selectors";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spinner } from "./Spinner/Spinner";
import { MainTitle } from "./MainTitle/MainTitle";

export const PrivateRouter = ({
  component: Component,
  redirectTo,
  showSpinner,
}) => {
  const loggedin = useSelector(isLoggedIn);
  const refreshing = useSelector(isRefreshing);

  if (showSpinner)
    return (
      <>
        <MainTitle />
        <div>
          <Spinner isLoad={true} />
        </div>
      </>
    );

  return !loggedin && !refreshing ? (
    <Navigate to={redirectTo} />
  ) : (
    <Component showSpinner={showSpinner} />
  );
};
