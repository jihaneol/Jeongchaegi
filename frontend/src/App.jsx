import Nav from "./components/Nav";
import Home from "./routes/Home"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

function App() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route>
            <Home path="/"/>
          </Route>
        </Switch>
      </Router>
    );
}

export default App;
