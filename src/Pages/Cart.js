import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { decreaseLocalItems, getLocalItems, setLocalItems } from '../services/api';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.attCart();
  }

  componentDidUpdate() {
  }

  attCart = () => {
    const carrinho = getLocalItems() || [];
    this.setState({ cart: carrinho });
  };

  addProduct = (elemento) => {
    setLocalItems(elemento);
    this.attCart();
  };

  decreaseProduct = (elemento) => {
    decreaseLocalItems(elemento);
    this.attCart();
  };

  removeProduct = (elemento) => {
    const item = getLocalItems() || [];
    const newItems = item.filter((e) => e.id !== elemento.id);
    localStorage.setItem('compra', JSON.stringify([...newItems]));
    this.attCart();
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        <Header />
        {cart.length === 0 && (
          <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>)}
        { cart.map((elemento) => (
          <div key={ elemento.id }>
            <p data-testid="shopping-cart-product-name">{elemento.title}</p>
            {elemento.shipping.free_shipping ? (
              <h6 data-testid="free-shipping">Frete Grátis</h6>) : (null)}
            <p>{elemento.price}</p>
            <section>
              {' '}

              <button
                type="button"
                onClick={ () => this.decreaseProduct(elemento) }
                data-testid="product-decrease-quantity"
              >
                -

              </button>
              <h6 data-testid="shopping-cart-product-quantity">
                {
                  elemento.quantidade
                }
              </h6>
              <button
                type="button"
                onClick={ () => this.addProduct(elemento) }
                data-testid="product-increase-quantity"
                disabled={ elemento.quantidade === elemento.available_quantity }
              >
                +

              </button>
              <button
                type="button"
                onClick={ () => this.removeProduct(elemento) }
                data-testid="remove-product"
              >
                Remover Item

              </button>
            </section>
          </div>))}
        <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
      </div>
    );
  }
}

export default Cart;
