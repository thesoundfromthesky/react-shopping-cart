import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Product from "./Product";

describe("<Product />", () => {
  const product = {
    id: 1,
    title: "The Art Of War",
    price: 10.11,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41FBMkY3cgL._SX331_BO1,204,203,200_.jpg"
  };

  it(`should render image of ${product.title}`, () => {
    const { getByAltText } = render(<Product product={product} />);

    const image = getByAltText(new RegExp(product.title, "i"));

    expect(image).toHaveAttribute("src", product.image);
  });

  it(`should render title of ${product.title}`, () => {
    const { getByText } = render(<Product product={product} />);

    const title = getByText(new RegExp(product.title, "i"));

    expect(title).toHaveTextContent(product.title);
  });

  it(`should render price of ${product.price}`, () => {
    const { getByText } = render(<Product product={product} />);

    const price = getByText(new RegExp(product.price, "i"));

    expect(price).toHaveTextContent(product.price);
  });

  it("should render button to Add to Cart", () => {
    const { getByText } = render(<Product product={product} />);

    const btn = getByText(/add to cart/i);

    expect(btn).toBeInTheDocument();
  });

  it("should render button to Add to Cart to be called once", async () => {
    const addItem = jest.fn();
    const { getByText } = render(
      <Product product={product} addItem={addItem} />
    );

    const btn = getByText(/add to cart/i);

    fireEvent.click(btn);

    expect(addItem).toHaveBeenCalledTimes(1);
  });
});
