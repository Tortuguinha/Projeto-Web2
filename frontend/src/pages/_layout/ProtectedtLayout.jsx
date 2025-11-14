import { Fragment } from "react";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function ProtectedtLayout ({ children }) {
	const { isAuth } = useSelector((state) => state.auth)

	return isAuth ? <Fragment>{children}</Fragment> : <Navigate to="/" replace={true} />;
};

export default ProtectedtLayout;
