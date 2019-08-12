import React from "react";
import Login from "../page/login";
// import Main from '../page/main'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashBoard from "../page/dashboard";
import { spring, AnimatedSwitch } from "react-router-transition";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8)
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1)
  }
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="switch-wrapper"
        >
          <Route exact path="/" component={DashBoard} />
          <Route path="/login" component={Login} />
        </AnimatedSwitch>
      </Router>
    );
  }
}

export default App;
