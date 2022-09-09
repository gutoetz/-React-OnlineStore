import React from 'react';
import Header from '../Components/Header';
import { getLocalItems } from '../services/api';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      realCart: [],
    };
  }

  componentDidMount() {
    let carrinho = getLocalItems('compra');
    if (!carrinho) carrinho = [];
    this.setState({ cart: carrinho }, this.filtro);
  }

  filtro = () => {
    const { cart } = this.state;
    const filtrado = [];
    cart.forEach((elemento) => {
      if (!filtrado.some((e) => e.id === elemento.id)) {
        return filtrado.push(elemento);
      }
    });
    this.setState({
      realCart: filtrado,
    });
  };

  render() {
    const { cart, realCart } = this.state;
    return (
      <div>
        <Header />
        {cart.length === 0 && (
          <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>)}
        { realCart.map((elemento) => (
          <div key={ elemento.id }>
            <h4 data-testid="shopping-cart-product-name">{elemento.title}</h4>
            <p>{elemento.price}</p>
            <p data-testid="shopping-cart-product-quantity">
              {
                cart.filter((e) => e.id === elemento.id).length
              }
            </p>
          </div>))}
      </div>
    );
  }
}

export default Cart;
