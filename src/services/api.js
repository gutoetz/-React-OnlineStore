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

export function getLocalItems() {
  return JSON.parse(localStorage.getItem('compra'));
}

export function tamanhoCart() {
  const cart = getLocalItems() || 0;
  let sizeCart = 0;
  if (cart !== 0) {
    cart.forEach((e) => { sizeCart += e.quantidade; });
  }
  localStorage.setItem('tamanhoCart', sizeCart);
}

export function setLocalItems(object) {
  const item = getLocalItems() || [];
  if (item.find((e) => e.id === object.id) === undefined) {
    object.quantidade = 1;
    localStorage.setItem('compra', JSON.stringify([...item, object]));
  }
  if (item.find((e) => e.id === object.id) !== undefined) {
    item.find((e) => e.id === object.id).quantidade = Number(
      item.find((e) => e.id === object.id).quantidade,
    ) + 1;
    localStorage.setItem('compra', JSON.stringify([...item]));
  }
  tamanhoCart();
}

export function decreaseLocalItems(object) {
  const item = getLocalItems() || [];
  if (item.find((e) => e.id === object.id).quantidade >= 1) {
    item.find((e) => e.id === object.id).quantidade = Number(
      item.find((e) => e.id === object.id).quantidade,
    ) - 1;
    localStorage.setItem('compra', JSON.stringify([...item]));
  }
  if (item.find((e) => e.id === object.id).quantidade < 1) {
    localStorage.setItem(
      'compra',
      JSON.stringify([...item.filter((e) => e.id !== object.id)]),
    );
  }
  tamanhoCart();
}
