
async function fetchProducts(minPrice, maxPrice) {
  const url = `http://localhost:3000/products?minPrice=${minPrice}&maxPrice=${maxPrice}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
}

async function extractAllProducts() {
  let minPrice = 0;
  let maxPrice = 100000;
  let allProducts = [];
  let hasMore = true;

  while (hasMore) {
    const data = await fetchProducts(minPrice, maxPrice);
    allProducts = [...data.products];
    hasMore = data.total > data.count;

    if (hasMore) {
      minPrice = data.products[data.products.length - 1].price + 1;
      maxPrice = minPrice + 999;
    }
  }

  return allProducts;
}

extractAllProducts().then(products => {
  console.log(`Extracted ${products.length} products`);
}).catch(error => {
  console.error(`Error extracting products: ${error}`);
});
