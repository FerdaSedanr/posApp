import Header from "../components/Header/Header";
import React from "react";
import Edit from "../components/products/Edit";

const ProductPage = () => {
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Ürünler</h1>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 150px)" }}
        >
          <Edit />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
