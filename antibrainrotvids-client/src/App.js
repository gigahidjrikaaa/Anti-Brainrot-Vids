import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Preferences from './components/Preferences';
import Recommendations from './components/Recommendations';

function App() {
    const [token, setToken] = useState('');

    return (
        <Router>
            <div>
                <nav>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/preferences">Preferences</Link>
                    <Link to="/recommendations">Recommendations</Link>
                </nav>
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login">
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/preferences">
                        <Preferences token={token} />
                    </Route>
                    <Route path="/recommendations">
                        <Recommendations token={token} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
