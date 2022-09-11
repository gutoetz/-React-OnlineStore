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

export async function getProductById(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const resposta = await fetch(url);
  const produto = await resposta.json();
  return produto;
}

export function setLocalItems(e, value) {
  localStorage.setItem(e, JSON.stringify(value));
}

export function getLocalItems(elemento) {
  return JSON.parse(localStorage.getItem(elemento));
}
