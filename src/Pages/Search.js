import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getProductsFromCategoryAndQuery,
  setLocalItems,
  tamanhoCart } from '../services/api';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pesquisado: false,
      inputValue: '',
      radioValue: '',
      produtos: [],
    };
  }

  componentDidMount() {
    this.cartSize();
  }

  cartSize = () => {
    tamanhoCart();
    const carrinho = localStorage.getItem('tamanhoCart') || 0;
    this.setState({ cart: carrinho });
  };

  handleChange = (event) => {
    const { target } = event;
    this.setState({ inputValue: target.value });
  };

  handleClickBuscar = async () => {
    const { inputValue, radioValue } = this.state;
    let pesq = false;
    const produtos = await getProductsFromCategoryAndQuery(radioValue, inputValue);
    if (produtos.results.length === 0) { pesq = true; }
    this.setState({ produtos: produtos.results, pesquisado: pesq });
  };

  radioClick = async (event) => {
    const { target } = event;
    if (target.checked) {
      const produtos = await getProductsFromCategoryAndQuery(target.value, '');
      this.setState({ produtos: produtos.results, radioValue: target.value });
    }
  };

  cartClick = (objeto) => {
    setLocalItems(objeto);
    this.cartSize();
  };

  render() {
    const { inputValue, produtos, pesquisado, cart } = this.state;
    const { categorias } = this.props;
    return (
      <div className="div1">
        <Header />
        <section className="section1">
          <h5 data-testid="shopping-cart-size">{cart}</h5>
          <div className="categorias">
            <p className="titulo">Categorias de pesquisa</p>
            {categorias.length > 1
              && categorias.map((categoria) => (
                <label
                  data-testid="category"
                  key={ categoria.id }
                  htmlFor={ categoria.id }
                  className="label"
                >
                  <input
                    value={ categoria.id }
                    name="categoria"
                    id={ categoria.id }
                    type="radio"
                    onClick={ this.radioClick }
                  />
                  {categoria.name}
                </label>
              ))}
          </div>
          <div>
            <input
              type="text"
              data-testid="query-input"
              onChange={ this.handleChange }
              value={ inputValue }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.handleClickBuscar }
            >
              Buscar
            </button>
          </div>
        </section>
        <section className="Produtos">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <section>
            {produtos.length > 1
              && produtos.map((produto) => (
                <section data-testid="product" key={ produto.id }>
                  <h4>{produtos.title}</h4>
                  {produto.shipping.free_shipping ? (
                    <h6 data-testid="free-shipping">Frete Grátis</h6>) : (null)}
                  <h5>{`Preço: R$ ${produto.price}`}</h5>
                  <img src={ produto.thumbnail } alt={ produto.id } />
                  <Link
                    to={ `Produto/${produto.id}` }
                    data-testid="product-detail-link"
                  >
                    Detalhes
                  </Link>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ () => this.cartClick(produto) }
                  >
                    Adicionar ao Carrinho
                  </button>
                </section>
              ))}
            {pesquisado === true ? <p>Nenhum produto foi encontrado</p> : null}
          </section>
        </section>
      </div>
    );
  }
}

Search.propTypes = {
  categorias: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Search;
