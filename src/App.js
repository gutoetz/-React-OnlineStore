import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './Pages/Search';

function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Switch>
          <Route exact path="/" component={ Search } />
        </Switch>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;
