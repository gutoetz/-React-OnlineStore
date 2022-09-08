import React from 'react';

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
