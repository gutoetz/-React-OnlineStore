export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const resposta = await fetch(url);
  const categorias = await resposta.json();
  return categorias;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // const url = `https://api.mercadolibre.com/${categoryId}/${query}`;
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const resposta = await fetch(url);
  const produto = await resposta.json();
  return produto;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
