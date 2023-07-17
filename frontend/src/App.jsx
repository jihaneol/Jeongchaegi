import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./routes/Nav";
import Home from "./routes/Home";
import List from "./routes/List";
import Calendar from "./routes/Calendar";
import SearchPage from "./routes/SearchPage";
import Header from "./routes/Header";

function App() {
  return (
    <Router>
      <Header />
      <Nav />
      <Switch>
        <Route path="/search/:text">
          <SearchPage />
        </Route>
        <Route path="/list">
          <List />
        </Route>
        <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
