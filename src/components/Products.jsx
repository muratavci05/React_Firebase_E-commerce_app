import React from "react";
import IndividualProduct from "./IndividualProduct";

const Products = ({ products,addToCard }) => {
  // console.log(products);

  return products.map((individualProduct) => (
    <IndividualProduct
      key={individualProduct.ID}
      individualProduct={individualProduct}
      addToCard={addToCard}
    />
  ));
};

export default Products;
