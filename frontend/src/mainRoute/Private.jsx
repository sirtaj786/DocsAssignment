import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
	const user=JSON.parse(localStorage.getItem("userDetails"));
	if (!user) {
		return <Navigate to="/" />;
	}
	return children;
};

export default Private;