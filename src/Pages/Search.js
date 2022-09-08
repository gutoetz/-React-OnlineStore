import React from 'react';
import Header from '../Components/Header';
import { getCategories } from '../services/api';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pesquisado: false,
      categorias: [],
    };
  }

  componentDidMount() {
    this.pegandoCategorias();
  }

  pegandoCategorias = async () => {
    const categorias = await getCategories();
    console.log(categorias);
    this.setState({ categorias });
  };

  render() {
    const { pesquisado, categorias } = this.state;
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
              />
            </label>
          ))}
          <input type="text" />
        </section>
        <section className="Produtos">
          {pesquisado === false ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.

            </p>)
            : (null)}
        </section>
      </div>
    );
  }
}

export default Search;
