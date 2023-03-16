import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById, setLocalItems } from '../services/api';
import './produto.css';

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
        <h1 className="display-1">Produto</h1>
        {load ? (
          <p>Carregando...</p>
        ) : (
          <div className="cartProduct">
            <h2 data-testid="product-detail-name">{ product.title }</h2>
            <section className="cartSize">
              <p>Quantidade de produtos no Carrinho:</p>
              <h5 data-testid="shopping-cart-size">{cart}</h5>
            </section>
            <section className="imagemCOntain">
              <img
                id="imga"
                src={ product.thumbnail }
                alt={ product.title }
                data-testid="product-detail-image"
              />
            </section>
            <h2 data-testid="product-detail-price">
              R$
              { product.price }
            </h2>
            <button
              className="btn btn-dark"
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ () => this.cartClick(product) }
            >
              Adicionar ao Carrinho
            </button>
            <form className="formContainer">
              <label className="form-label" htmlFor="em">
                Email
                <input
                  id="em"
                  className="form-control"
                  data-testid="product-detail-email"
                  value={ email }
                  type="email"
                  onChange={ this.handleChange }
                  name="email"
                />
              </label>
              <div className="av">
                <h6>Avaliação: </h6>
                <label htmlFor="r1">
                  <input
                    className="form-check-input"
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
                    className="form-check-input"
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
                    className="form-check-input"
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
                    className="form-check-input"
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
                    className="form-check-input"
                    name="rate"
                    id="r5"
                    data-testid="5-rating"
                    type="radio"
                    checked={ rate === 'r5' }
                  />
                  5
                </label>
              </div>

              <textarea
                id="al"
                className="form-control"
                onChange={ this.handleChange }
                data-testid="product-detail-evaluation"
                name="txt"
                value={ txt }
              />
              <button
                className="btn btn-dark"
                data-testid="submit-review-btn"
                onClick={ this.submitBtn }
                type="button"
              >
                Submit

              </button>
              {invalido && <p data-testid="error-msg">Campos inválidos</p>}
            </form>
            <h5 className="tit">Avaliações</h5>
            { comments.map((comment, index) => (
              <section className="avalia" key={ index }>
                <section className="sec">
                  <img className="imagemuser" src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user" />
                  <h6 data-testid="review-card-email">{comment.email}</h6>
                </section>
                <section className="sec">
                  <h5> Nota: </h5>
                  <h4 data-testid="review-card-rating">{comment.rating}</h4>
                </section>
                <section className="sec">
                  <h6>Comentário:</h6>
                  <p data-testid="review-card-evaluation">{comment.text}</p>
                </section>
              </section>
            ))}
            <Link
              className='btn btn-primary stretched-link">'
              to="/Cart"
              data-testid="shopping-cart-button"
            >
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
