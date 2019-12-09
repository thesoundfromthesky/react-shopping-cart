import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";
import { CartContext } from "../contexts";
describe("<Navigation />", () => {
  const cart = Array.from({ length: 5 });

  it("should render without error", () => {
    render(
      <Router>
        <CartContext.Provider value={cart}>
          <Navigation />
        </CartContext.Provider>
      </Router>
    );
  });

  it("sholud have Products", () => {
    const { getByText } = render(
      <Router>
        <CartContext.Provider value={cart}>
          <Navigation />
        </CartContext.Provider>
      </Router>
    );

    const products = getByText(/products/i);

    expect(products).toBeInTheDocument();
  });

  it(`should have Cart and contain ${cart.length} items`, () => {
    const { getByText } = render(
      <Router>
        <CartContext.Provider value={cart}>
          <Navigation />
        </CartContext.Provider>
      </Router>
    );

    const cartLength = getByText(/cart/i);

    expect(cartLength).toHaveTextContent(cart.length);
  });
});
