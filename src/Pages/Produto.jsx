import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById, getLocalItems } from '../services/api';

export default class Produto extends React.Component {
  state = {
    load: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    let carrinho = getLocalItems('compra');
    if (!carrinho) carrinho = 0;
    localStorage.setItem('tamanhoCart', [carrinho.length]);
    const product = await getProductById(id);
    this.setState({ load: false, product, cart: carrinho.length });
  }

  render() {
    const { load, product, cart } = this.state;
    return (
      <>
        <h1>Produto</h1>
        {load ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <h5 data-testid="shopping-cart-size">{cart}</h5>
            <h2 data-testid="product-detail-name">{ product.title }</h2>
            <img
              src={ product.thumbnail }
              alt={ product.title }
              data-testid="product-detail-image"
            />
            <h2 data-testid="product-detail-price">
              R$
              { product.price }
            </h2>
            <Link to="/Cart" data-testid="shopping-cart-button">
              Carrinho
            </Link>
          </div>
        )}
      </>
    );
  }
}

Produto.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
