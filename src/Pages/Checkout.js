import React from 'react';
import { Redirect } from 'react-router-dom';
import { getLocalItems } from '../services/api';
import './checkout.css';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      nome: '',
      endereco: '',
      cpf: '',
      cep: '',
      pay: '',
      phone: '',
      email: '',
      preenchido: false,
      invalid: false,
      submit: false,
    };
  }

  componentDidMount() {
    const carrinho = getLocalItems() || [];
    this.setState({ cart: carrinho });
  }

  completed = () => {
    const { nome, pay, cpf, cep, email, endereco, phone } = this.state;
    if (nome.length > 0 && cep.length > 0 && cpf.length
        > 0 && pay.length > 0 && email.length > 0 && endereco.length
        > 0 && phone.length > 0) {
      this.setState({ preenchido: true });
    } else { this.setState({ preenchido: false }); }
  };

  handleChange = (element) => {
    const { type, id, value, name } = element.target;
    if (type === 'radio') {
      this.setState({
        [name]: value,
      }, this.completed);
    } else {
      this.setState({
        [id]: value,
      }, this.completed);
    }
  };

  submitClick = () => {
    const { preenchido } = this.state;
    if (preenchido) {
      localStorage.setItem('compra', JSON.stringify([]));
      this.setState({ submit: true });
    } else {
      this.setState({ invalid: true });
    }
  };

  render() {
    const { cart, nome, cpf, email, cep, endereco, pay,
      phone, invalid, submit } = this.state;
    if (submit) { return <Redirect to="/" />; }
    return (
      <div>
        <h3 className="display-3 h3">Revise seus Produtos</h3>
        <section className="sectionCheckout">
          { cart.map((elemento) => (
            <div className="produto" key={ elemento.id }>
              <div className="produtoBox">
                <div className="imgcontainer">
                  <img src={ elemento.thumbnail } alt={ elemento.id } />
                </div>
                <div className="txtcontainer">
                  <h5 data-testid="checkout-products">{elemento.title}</h5>
                  <h6>{`R$ ${elemento.price}`}</h6>
                  <h6>
                    {
                      `Quantidade: ${elemento.quantidade}`
                    }
                  </h6>
                </div>
              </div>
            </div>))}
        </section>
        <form>
          <label className="form-label" htmlFor="nome">
            Nome Completo:
            <input
              className="form-control"
              data-testid="checkout-fullname"
              id="nome"
              onChange={ this.handleChange }
              value={ nome }
            />
          </label>
          <label className="form-label" htmlFor="email">
            E-mail:
            <input
              className="form-control"
              data-testid="checkout-email"
              id="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label className="form-label" htmlFor="cpf">
            CPF:
            <input
              className="form-control"
              data-testid="checkout-cpf"
              id="cpf"
              onChange={ this.handleChange }
              value={ cpf }
            />
          </label>
          <label className="form-label" htmlFor="phone">
            Phone:
            <input
              className="form-control"
              data-testid="checkout-phone"
              id="phone"
              onChange={ this.handleChange }
              value={ phone }
            />
          </label>
          <label className="form-label" htmlFor="cep">
            CEP:
            <input
              className="form-control"
              value={ cep }
              data-testid="checkout-cep"
              id="cep"
              onChange={ this.handleChange }
            />
          </label>
          <label className="form-label" htmlFor="adress">
            Endereço:
            <input
              className="form-control"
              value={ endereco }
              data-testid="checkout-address"
              id="endereco"
              onChange={ this.handleChange }
            />
          </label>
          <label className="form-label" htmlFor="boleto">
            Boleto
            <input
              type="radio"
              name="pay"
              data-testid="ticket-payment"
              value="boleto"
              id="boleto"
              onChange={ this.handleChange }
              checked={ pay === 'boleto' }
            />
          </label>
          <label className="form-label" htmlFor="visa">
            Visa
            <input
              type="radio"
              name="pay"
              id="visa"
              data-testid="visa-payment"
              value="visa"
              onChange={ this.handleChange }
              checked={ pay === 'visa' }
            />
          </label>
          <label className="form-label" htmlFor="master">
            Master
            <input
              type="radio"
              name="pay"
              id="master"
              data-testid="master-payment"
              value="master"
              onChange={ this.handleChange }
              checked={ pay === 'master' }
            />
          </label>
          <label className="form-label" htmlFor="elo">
            Elo
            <input
              type="radio"
              name="pay"
              id="elo"
              data-testid="elo-payment"
              value="elo"
              checked={ pay === 'elo' }
              onChange={ this.handleChange }
            />
          </label>
          {invalid && <h4 data-testid="error-msg">Campos inválidos</h4>}
          <button
            className="btn btn-primary"
            type="button"
            onClick={ this.submitClick }
            data-testid="checkout-btn"
          >
            Finalizar Compra

          </button>
        </form>
      </div>
    );
  }
}

export default Checkout;
