import React from "react";
import IndividualProduct from "./IndividualProduct";

const Products = ({ products }) => {
  // console.log(products);

  return products.map((individualProduct) => (
    <IndividualProduct
      key={individualProduct.ID}
      individualProduct={individualProduct}
    />
  ));
};

export default Products;
