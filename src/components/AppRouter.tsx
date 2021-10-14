import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Candidates from "./Candidates";
import NewCandidate from "./NewCandidate";
import Vote from "./Vote";

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
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/candidate">
            <NewCandidate />
          </Route>
          <Route path="/vote">
            <Vote />
          </Route>
          <Route path="/">
            <Candidates />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default AppRouter;