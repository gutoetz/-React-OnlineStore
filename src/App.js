import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './Pages/Search';
import Cart from './Pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route exact path="/cart" component={ Cart } />
        </Switch>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;
