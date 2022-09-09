import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getProductsFromCategoryAndQuery } from '../services/api';
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

  render() {
    const { inputValue, produtos, pesquisado } = this.state;
    const { categorias } = this.props;
    return (
      <div>
        <Header />
        <section>
          <div id="categorias">
            <p>Categorias de pesquisa</p>
            {categorias.length > 1 && categorias.map((categoria) => (
              <label data-testid="category" key={ categoria.id } htmlFor={ categoria.id }>
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
            {produtos.length > 1 && produtos.map((produto) => (
              <section data-testid="product" key={ produto.id }>
                <h4>{produtos.title}</h4>
                <h5>{`Preço: R$ ${produto.price}`}</h5>
                <img src={ produto.thumbnail } alt={ produto.id } />
                <Link to={ `Produto/${produto.id}` } data-testid="product-detail-link">
                  Detalhes
                </Link>
              </section>
            ))}
            {pesquisado === true ? (<p>Nenhum produto foi encontrado</p>) : (null)}
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
