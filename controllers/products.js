const Product = require("../models/products");

const getAllProductsStatic = async (req, res) => {
  const search = "ac";
  const products = await Product.find({}).sort("name");
  res.status(200).json({ products });
};
const getAllProducts = async (req, res) => {
  console.log(req.query);
  const { featured, company, name } = req.query;
  let queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  const products = await Product.find(queryObject);
  res.status(200).json({ products });
};
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
