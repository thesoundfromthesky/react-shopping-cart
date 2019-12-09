import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

/**
 * Now that we've created our `ProductContext` we can import into our `App.js`.
 * Now we can start providing data across our application!
 */
import { ProductContext } from "./contexts";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = item => {
    // add the given item to the cart
    setCart(prev => [...prev, item]);
  };

  return (
    /**
     * Wrap all of your components/routes in `App.js` inside of `ProductContext.Provider` component.
     * Next pass a value prop to your `Provider`.
     * In the value prop we'll pass in the products state, and an addItem function
     * that will allow us to add books to the cart.
     */
    <ProductContext.Provider value={{ products, addItem }}>
      <div className="App">
        <Navigation cart={cart} />

        {/* Routes */}
        <Route
          exact
          path="/"
          render={() => <Products products={products} addItem={addItem} />}
        />

        <Route path="/cart" render={() => <ShoppingCart cart={cart} />} />
      </div>
    </ProductContext.Provider>
  );
}

export default App;
