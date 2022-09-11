import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class Produto extends React.Component {
  state = {
    load: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ load: false, product });
  }

  render() {
    const { load, product } = this.state;
    return (
      <>
        <h1>Produto</h1>
        {load ? (
          <p>Carregando...</p>
        ) : (
          <div>
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
