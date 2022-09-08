import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pesquisado: false,
    };
  }

  render() {
    const { pesquisado } = this.state;
    return (
      <div>
        <Header />
        <section>
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
