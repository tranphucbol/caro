import React from "react";
import Login from "../pages/login";
import Register from "../pages/register";
import DashBoard from "../pages/dashboard";
// import Main from '../page/main'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";


class App extends React.Component {
  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={1000}
              >
                <Switch location={location}>
                  <Route exact path="/" component={DashBoard} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </Router>
    );
  }
}

export default App;
