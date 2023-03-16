import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Search from './Pages/Search';
import Cart from './Pages/Cart';
import { getCategories } from './services/api';
import Produto from './Pages/Produto';
import Checkout from './Pages/Checkout';

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
            <Route exact path="/produto/:id" component={ Produto } />
            <Route
              exact
              path="/checkout"
              render={ () => (
                <Checkout categorias={ categorias } />
              ) }
            />
          </Switch>
        </React.StrictMode>
      </BrowserRouter>
    );
  }
}

export default App;
