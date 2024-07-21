import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FeedbackPage from './pages/FeedbackPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/feedback" component={FeedbackPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
