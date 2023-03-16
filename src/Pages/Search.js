import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery,
  setLocalItems,
  tamanhoCart } from '../services/api';
import './Search.css';
import 'bootstrap/dist/css/bootstrap.css';

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
        <section className="section1">
          <div className="categorias">
            <p className="titulo">Categorias de pesquisa</p>
            {categorias.length > 1
              && categorias.map((categoria) => (
                <label
                  className="form-check-label"
                  data-testid="category"
                  key={ categoria.id }
                  htmlFor={ categoria.id }
                >
                  <input
                    className="form-check-input"
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
        </section>
        <section className="section2">
          <section className="busca">
            <div className="wtf">
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

            <p className="legend" data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </section>
          <section className="produtos">
            {produtos.length > 1
              && produtos.map((produto) => (
                <section className="produto" data-testid="product" key={ produto.id }>
                  <div className="produtoBox">
                    <div className="imgcontainer">
                      <img src={ produto.thumbnail } alt={ produto.id } />
                    </div>
                    <div className="txtcontainer">
                      <h3>{`R$ ${produto.price}`}</h3>
                      <button
                        type="button"
                        data-testid="product-add-to-cart"
                        onClick={ () => this.cartClick(produto) }
                      >
                        Adicionar ao Carrinho
                      </button>
                      <p>{produto.title}</p>
                      <Link
                        to={ `Produto/${produto.id}` }
                        data-testid="product-detail-link"
                        className="link"
                      >
                        Detalhes
                      </Link>
                      {produto.shipping.free_shipping ? (
                        <h6
                          className="frete"
                          data-testid="free-shipping"
                        >
                          Frete Grátis

                        </h6>) : (null)}
                    </div>
                  </div>
                </section>
              ))}
            {pesquisado === true ? <p>Nenhum produto foi encontrado</p> : null}
          </section>
        </section>
        <section className="Cartcontainer">
          <Link
            class="btn btn-primary stretched-link"
            to="/cart"
            data-testid="shopping-cart-button"
          >
            Shopping Cart

          </Link>
          <h5 data-testid="shopping-cart-size">{cart}</h5>
          <img
            alt="carrinho"
            src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
            className="carrinhoImg"
          />
        </section>
      </div>
    );
  }
}

Search.propTypes = {
  categorias: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Search;
