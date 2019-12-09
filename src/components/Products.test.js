import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Products from "./Products";
import data from "../data";
import { ProductContext } from "../contexts";

describe("<Products />", () => {
  const addItem = jest.fn();
  const products = data;

  it("should render without error", () => {
    render(
      <ProductContext.Provider value={{ products, addItem }}>
        <Products />
      </ProductContext.Provider>
    );
  });

  it("should render all products", () => {
    const { getByText, getByAltText } = render(
      <ProductContext.Provider value={{ products, addItem }}>
        <Products />
      </ProductContext.Provider>
    );

    products.forEach(product => {
      getByAltText(new RegExp(product.title, "i"));
      getByText(product.title);
      getByText(new RegExp(product.price, "i"));
    });
  });

  it("all addItem should clicked once", () => {
    const { getAllByText } = render(
      <ProductContext.Provider value={{ products, addItem }}>
        <Products />
      </ProductContext.Provider>
    );

    const btns = getAllByText(/add to cart/i);

    btns.forEach(btn => {
      fireEvent.click(btn);
      expect(addItem).toHaveBeenCalledTimes(1);
      addItem.mockClear();
    });
  });
});
