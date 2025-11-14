import { Fragment } from "react";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PublicLayout ({ children }) {
  const { isAuth } = useSelector((state) => state.auth)

	return isAuth ? <Navigate to={"/dashboard"}/> : <Fragment>{children}</Fragment>
};

export default PublicLayout;
