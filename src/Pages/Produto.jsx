import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById, setLocalItems } from '../services/api';

export default class Produto extends React.Component {
  state = {
    load: true,
    invalido: false,
    email: '',
    txt: '',
    rate: '',
    comments: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    const comments = JSON.parse(localStorage.getItem(id)) || [];
    this.setState({ load: false, product, comments });
    this.cartSize();
  }

  cartSize = () => {
    const carrinho = localStorage.getItem('tamanhoCart') || 0;
    this.setState({ cart: carrinho });
  };

  cartClick = (product) => {
    setLocalItems(product);
    this.cartSize();
  };

  invalid = () => {
    const { email, rate } = this.state;
    if (email.length > 0 && rate.length > 0) {
      this.setState({ invalido: false });
    }
  };

  handleChange = (event) => {
    this.invalid();
    const { target } = event;
    if (target.type === 'radio') {
      this.setState({ rate: target.id });
    } else { this.setState({ [target.name]: target.value }); }
  };

  submitBtn = () => {
    const { email, txt, rate } = this.state;
    const { match: { params: { id } } } = this.props;
    const comments = JSON.parse(localStorage.getItem(id)) || [];
    if (email.length > 0 && rate.length > 0) {
      const newComment = {
        email,
        text: txt,
        rating: rate[1],
      };
      const comentarios = [...comments, newComment];
      localStorage.setItem([id], JSON.stringify(comentarios));
      this.setState({ email: '',
        txt: '',
        rate: '',
        comments: comentarios,
        invalido: false });
    } else {
      this.setState({ invalido: true });
    }
  };

  render() {
    const { load, product, cart, invalido, email, txt, rate, comments } = this.state;
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
              onClick={ () => this.cartClick(product) }
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
            { comments.map((comment, index) => (
              <section key={ index }>
                <h6 data-testid="review-card-email">{comment.email}</h6>
                <h4 data-testid="review-card-rating">{comment.rating}</h4>
                <p data-testid="review-card-evaluation">{comment.text}</p>
              </section>
            ))}
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
