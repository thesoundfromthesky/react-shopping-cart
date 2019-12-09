import React from "react";
import { render } from "@testing-library/react";

import data from "../data";
import { CartContext } from "../contexts";
import ShoppingCart from "./ShoppingCart";

describe("<ShoppingCart />", () => {
  const cart = data;
  it("should render without error", () => {
    render(
      <CartContext.Provider value={cart}>
        <ShoppingCart />
      </CartContext.Provider>
    );
  });

  it("should render all items in cart", () => {
    const { getByText, getAllByText } = render(
      <CartContext.Provider value={cart}>
        <ShoppingCart />
      </CartContext.Provider>
    );

    cart.forEach(item => {
      getByText(item.title);
      getByText(new RegExp(item.price, "i"));
    });

    const btns = getAllByText(/remove from cart/i);

    btns.forEach(btn => {
      expect(btn).toBeInTheDocument();
    });
  });

  it("should have total and checkout", () => {
    const { getByText } = render(
      <CartContext.Provider value={cart}>
        <ShoppingCart />
      </CartContext.Provider>
    );

    getByText(/total/i);
    getByText(/checkout/i);
  });
});
