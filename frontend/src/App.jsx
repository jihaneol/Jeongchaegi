import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Nav from "./components/Nav";
import Home from "./routes/Home"
import List from "./routes/List";

function App() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
}

export default App;
