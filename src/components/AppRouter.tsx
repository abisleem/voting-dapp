import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import Candidates from "./Candidates";

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Candidates</Link>
            </li>
            <li>
              <Link to="/candidate">New Candidate</Link>
            </li>
            <li>
              <Link to="/vote">Vote</Link>
            </li>
            <li>
              <Link to="/results">Results</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <Candidates />
          </Route>
          <Route path="/candidate">
            <NewCandidate />
          </Route>
          <Route path="/vote">
            <Vote />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Candidates() {
  return <h2>Candidates</h2>;
}

function NewCandidate() {
  return <h2>New Candidate</h2>;
}

function Vote() {
  return <h2>Vote</h2>;
}

function Results() {
  return <h2>Results</h2>;
}


export default AppRouter;