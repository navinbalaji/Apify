import express from  'express'
const app = express();
const port = 3000;

const totalProducts = 100000;
const productPriceRange = [0, 100000];

app.get('/products', (req, res) => {
  const { minPrice, maxPrice } = req.query;
  const parsedMinPrice = parseFloat(minPrice) || 0;
  const parsedMaxPrice = parseFloat(maxPrice) || 100000;

  const filteredProducts = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    price: Math.floor(Math.random() * (parsedMaxPrice - parsedMinPrice + 1)) + parsedMinPrice,
  })).filter((product) => product.price >= parsedMinPrice && product.price <= parsedMaxPrice);

  const totalProductsInRange = filteredProducts.length;

  res.json({
    total: totalProductsInRange,
    count: filteredProducts.length,
    products: filteredProducts,
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
