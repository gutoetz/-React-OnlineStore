import React from 'react';
import { Redirect } from 'react-router-dom';
import { getLocalItems } from '../services/api';

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
        <section>
          <h3>Revise seus Produtos</h3>
          { cart.map((elemento) => (
            <div key={ elemento.id }>
              <h5 data-testid="checkout-products">{elemento.title}</h5>
              <p>{`R$ ${elemento.price}`}</p>
              <p>
                {
                  elemento.quantidade
                }
              </p>
            </div>))}
        </section>
        <form>
          <label htmlFor="nome">
            Nome Completo:
            <input
              data-testid="checkout-fullname"
              id="nome"
              onChange={ this.handleChange }
              value={ nome }
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              data-testid="checkout-email"
              id="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="cpf">
            CPF:
            <input
              data-testid="checkout-cpf"
              id="cpf"
              onChange={ this.handleChange }
              value={ cpf }
            />
          </label>
          <label htmlFor="phone">
            Phone:
            <input
              data-testid="checkout-phone"
              id="phone"
              onChange={ this.handleChange }
              value={ phone }
            />
          </label>
          <label htmlFor="cep">
            CEP:
            <input
              value={ cep }
              data-testid="checkout-cep"
              id="cep"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="adress">
            Endereço:
            <input
              value={ endereco }
              data-testid="checkout-address"
              id="endereco"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="boleto">
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
          <label htmlFor="visa">
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
          <label htmlFor="master">
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
          <label htmlFor="elo">
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
