import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

describe("<App />", () => {
  it("should render without error", () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });

  it("click addItem to increase length of cart by one", () => {
    const { getAllByText, getByText } = render(
      <Router>
        <App />
      </Router>
    );

    const btns = getAllByText(/add to cart/i);
    btns.forEach(btn => {
      fireEvent.click(btn);
    });

    const cart = getByText("Cart");
    expect(cart).toHaveTextContent(/4/i);
  });

  it("cart link should be working", () => {
    const { getByText } = render(
      <Router>
        <App />
      </Router>
    );

    const cartLink = getByText("Cart");

    fireEvent.click(cartLink);

    const checkout = getByText(/checkout/i);

    expect(checkout).toBeInTheDocument();
  });

  it("Products link sholud work", () => {
    const { getByText, getByTestId } = render(
      <Router>
        <App />
      </Router>
    );

    const productsLink = getByText("Products");

    fireEvent.click(productsLink);

    const products = getByTestId(/products/i);

    expect(products).toBeInTheDocument();
  });
});
