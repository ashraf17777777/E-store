/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  function handleGoToCart(getProDet) {
    const cpyExistingCartItem = [...cartItems];
    // cpyExistingCartItem = [{id=4}]
    const findIndexOfCurrentItem = cpyExistingCartItem.findIndex(
      (item) => item.id === getProDet.id
    );
    // -1
    // index 0
    if (findIndexOfCurrentItem === -1) {
      cpyExistingCartItem.push({
        ...getProDet,
        quantity: 1,
        totalPrice: getProDet?.price,
      });
      console.log("here I am", cpyExistingCartItem);
    } else {
      cpyExistingCartItem[findIndexOfCurrentItem] = {
        ...cpyExistingCartItem[findIndexOfCurrentItem],
        quantity: cpyExistingCartItem[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (cpyExistingCartItem[findIndexOfCurrentItem].quantity + 1) *
          cpyExistingCartItem[findIndexOfCurrentItem].price,
      };
    }
    setCartItems(cpyExistingCartItem);
    // cartItems = [{0}]
    //
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItem));
    navigate(`/cart`);
  }

  function handleRemoveFromCart(getProDet, isFullyRemoved) {
    let cpyExistingCartItem = [...cartItems];
    const findIndexOfCurrentItem = cpyExistingCartItem.findIndex(
      (item) => item.id === getProDet.id
    );
    if (isFullyRemoved) {
      cpyExistingCartItem.splice(findIndexOfCurrentItem, 1);
    } else {
      cpyExistingCartItem[findIndexOfCurrentItem] = {
        ...cpyExistingCartItem[findIndexOfCurrentItem],
        quantity: cpyExistingCartItem[findIndexOfCurrentItem].quantity - 1,
        totalPrice:
          (cpyExistingCartItem[findIndexOfCurrentItem].quantity - 1) *
          cpyExistingCartItem[findIndexOfCurrentItem].price,
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItem));
    setCartItems(cpyExistingCartItem);
  }

  async function fetchListOfProducts() {
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();

    if (result && result?.products) {
      const filteredProducts = result.products.filter(
        (product) =>
          product.title !== "Calvin Klein CK One" &&
          product.title !== "Chicken Meat" &&
          product.title !== "Dolce Shine Eau de"
      );

      setListOfProducts(filteredProducts);

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListOfProducts();
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
  }, []);

  return (
    <ShoppingCartContext.Provider
      value={{
        listOfProducts,
        loading,
        setLoading,
        productDetails,
        setProductDetails,
        handleGoToCart,
        cartItems,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
