import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getLocalItems, setLocalItems } from '../services/api';

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

  decreaseProduct = (elemento) => {
    const item = getLocalItems('compra') || [];
    item.splice(indexOf(item.find((e) => e.id === elemento.id)), 1);
    console.log(item.indexOf(elemento));
  };

  addProduct = (elemento) => {
    const item = getLocalItems('compra') || [];
    setLocalItems('compra', [...item, elemento]);
  };

  removeProduct = (elemento) => {
    const item = getLocalItems('compra') || [];
    const newItem = item.filter((e) => e.id !== elemento.id);
    setLocalItems('compra', [...newItem]);
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
              <button
                type="button"
                onClick={ () => this.decreaseProduct(elemento) }
                data-testid="product-decrease-quantity"
              >
                -

              </button>
              {
                cart.filter((e) => e.id === elemento.id).length
              }
              <button
                type="button"
                onClick={ () => this.addProduct(elemento) }
                data-testid="product-increase-quantity"
              >
                +

              </button>
              <button
                type="button"
                onClick={ () => this.removeProduct(elemento) }
              >
                Remover Item

              </button>
            </p>
          </div>))}
        <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
      </div>
    );
  }
}

export default Cart;
