import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Component/Home";
import LandPage from "../Component/LandPage";
import Login from "../Component/Login";
import Register from "../Component/Register";
import Private from "./Private";
// import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route
				path="/dashboard"
				element={
					<Private>
						<LandPage />
					</Private>
				}
			/>
		</Routes>
	);
};

export default AllRoutes;