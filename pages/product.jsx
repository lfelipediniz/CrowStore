import WrapProduct from "../components/WrapProduct/WrapProduct";
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";

export default function Product() {

    const match = useRouteMatch("/product/:productName");
    // Extract the parameter value

    return (
        <Router>
            <Switch>
                <Route path="/product/:productName">
                    <WrapProduct productName={match.params.productName} />
                    {/* Pass the parameter as a prop */}
                </Route>
            </Switch>
        </Router>
    );
}
