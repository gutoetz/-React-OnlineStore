import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById, getLocalItems, setLocalItems } from '../services/api';

export default class Produto extends React.Component {
  state = {
    load: true,
    invalido: false,
    email: '',
    txt: '',
    rate: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ load: false, product });
    this.cartSize();
  }

  cartSize = () => {
    let carrinho = getLocalItems('compra');
    if (!carrinho) carrinho = 0;
    localStorage.setItem('tamanhoCart', [carrinho.length]);
    this.setState({ cart: carrinho.length });
  };

  cartClick = () => {
    const { product } = this.state;
    const item = getLocalItems('compra') || [];
    setLocalItems('compra', [...item, product]);
    this.cartSize();
  };

  handleChange = (event) => {
    const { target } = event;
    if (target.type === 'radio') {
      this.setState({ rate: target.id });
    } else { this.setState({ [target.name]: target.value }); }
  };

  submitBtn = () => {
    const { email, txt, rate } = this.state;
    const { match: { params: { id } } } = this.props;
    if (email.length > 0 && txt.length > 0 && rate.length > 0) {
    } else {
      this.setState({ invalido: true });
    }
  };

  render() {
    const { load, product, cart, invalido, email, txt, rate } = this.state;
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
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ () => this.cartClick() }
            >
              Adicionar ao Carrinho
            </button>
            <form>
              <input
                data-testid="product-detail-email"
                value={ email }
                type="email"
                onChange={ this.handleChange }
                name="email"
              />
              <label htmlFor="r1">
                <input
                  onChange={ this.handleChange }
                  id="r1"
                  name="rate"
                  data-testid="1-rating"
                  type="radio"
                  checked={ rate === 'r1' }
                />
                1
              </label>
              <label htmlFor="r2">
                <input
                  onChange={ this.handleChange }
                  id="r2"
                  name="rate"
                  data-testid="2-rating"
                  type="radio"
                  checked={ rate === 'r2' }
                />
                2
              </label>
              <label htmlFor="r3">
                <input
                  onChange={ this.handleChange }
                  name="rate"
                  id="r3"
                  data-testid="3-rating"
                  type="radio"
                  checked={ rate === 'r3' }
                />
                3
              </label>
              <label htmlFor="r4">
                <input
                  onChange={ this.handleChange }
                  name="rate"
                  id="r4"
                  data-testid="4-rating"
                  checked={ rate === 'r4' }
                  type="radio"
                />
                4
              </label>
              <label htmlFor="r5">
                <input
                  onChange={ this.handleChange }
                  name="rate"
                  id="r5"
                  data-testid="5-rating"
                  type="radio"
                  checked={ rate === 'r5' }
                />
                5
              </label>
              <textarea
                onChange={ this.handleChange }
                data-testid="product-detail-evaluation"
                name="txt"
                value={ txt }
              />
              <button
                data-testid="submit-review-btn"
                onClick={ this.submitBtn }
                type="button"
              >
                Submit

              </button>
              {invalido && <p data-testid="error-msg">Campos inválidos</p>}
            </form>
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
