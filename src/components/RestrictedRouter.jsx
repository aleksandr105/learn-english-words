import { isLoggedIn } from "../redux/auth/selectors";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spinner } from "./Spinner/Spinner";

export const RestrictedRouter = ({
  component: Component,
  redirectTo,
  showSpinner,
}) => {
  const loggedin = useSelector(isLoggedIn);

  if (showSpinner)
    return (
      <div style={{ marginTop: "29vh" }}>
        <Spinner isLoad={true} />
      </div>
    );

  return loggedin ? <Navigate to={redirectTo} /> : <Component />;
};
