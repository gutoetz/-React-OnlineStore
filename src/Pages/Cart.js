import React from 'react';
import Header from '../Components/Header';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: false,
    };
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        <Header />
        {cart === false ? (
          <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>)
          : (null)}
      </div>
    );
  }
}

export default Cart;
