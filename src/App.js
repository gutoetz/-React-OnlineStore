import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './Pages/Search';
import Cart from './Pages/Cart';
import { getCategories } from './services/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
    };
  }

  componentDidMount() {
    this.pegandoCategorias();
  }

  pegandoCategorias = async () => {
    const categorias = await getCategories();
    this.setState({ categorias });
  };

  render() {
    const { categorias } = this.state;
    return (
      <BrowserRouter>
        <React.StrictMode>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (
                <Search categorias={ categorias } />
              ) }
            />
            <Route exact path="/cart" component={ Cart } />
          </Switch>
        </React.StrictMode>
      </BrowserRouter>
    );
  }
}

export default App;
