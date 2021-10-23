// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
// Categories have many Products
Category.hasMany(Product, {
  // Define the third table needed to store the foreign keys
  foreignKey: "category_id",
  
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false,
  },
  // Define an alias for when data is retrieved
  // as: "tagged_product",
  foreginKey: 'product_id',
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "tagged_product",
  foreginKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
