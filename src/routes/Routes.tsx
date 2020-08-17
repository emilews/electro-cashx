import React from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import TopBar from "../components/general/Topbar";
import Home from '../components/home/Home';

const PrivateRoute: React.FC<{
	component: React.FC;
	path: string;
	exact: boolean;
}> = (props) => {

	return <Route path={props.path} exact={props.exact} component={props.component} />
};

const Routes: React.FC = () => {
	const renderRoutes = () => {
		return (
			<div>
				<PrivateRoute exact path="/" component={Home} />
			</div>
		)
	}
	return (
		<Router>
			<div>
				<TopBar />
				{renderRoutes()}
			</div>
		</Router>
	);
};
export default Routes;
