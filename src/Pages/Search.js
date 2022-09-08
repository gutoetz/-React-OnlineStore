import React from 'react';
import Header from '../Components/Header';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pesquisado: false,
      categorias: [],
      inputValue: '',
      radioValue: '',
      produtos: [],
    };
  }

  componentDidMount() {
    this.pegandoCategorias();
  }

  pegandoCategorias = async () => {
    const categorias = await getCategories();
    this.setState({ categorias });
  };

  handleChange = (event) => {
    const { target } = event;
    this.setState({ inputValue: target.value });
  };

  handleClickBuscar = async () => {
    const { inputValue, radioValue } = this.state;
    let pesq = false;
    const produtos = await getProductsFromCategoryAndQuery(radioValue, inputValue);
    console.log(produtos)
    if (produtos.results.length === 0) { pesq = true; }
    this.setState({ produtos: produtos.results, pesquisado: pesq });
  };

  radioClick = (event) => {
    const { target } = event;
    if (target.checked) { this.setState({ radioValue: target.value }); }
  };

  render() {
    const { categorias, inputValue, produtos, pesquisado } = this.state;
    return (
      <div>
        <Header />
        <section>
          <p>Categorias de pesquisa</p>
          {categorias.map((categoria) => (
            <label data-testid="category" key={ categoria.id } htmlFor={ categoria.id }>
              {categoria.name}
              <input
                value={ categoria.id }
                name="categoria"
                id={ categoria.id }
                type="radio"
                onClick={ this.radioClick }
              />
            </label>
          ))}
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
        </section>
        <section className="Produtos">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <section>
            {produtos.map((produto) => (
              <section data-testid="product" key={ produto.id }>
                <h4>{produtos.title}</h4>
                <h5>{`Preço: R$ ${produto.price}`}</h5>
                <img src={ produto.thumbnail } alt={ produto.id } />
              </section>
            ))}
            {pesquisado === true ? (<p>Nenhum produto foi encontrado</p>) : (null)}
          </section>
        </section>
      </div>
    );
  }
}

export default Search;
