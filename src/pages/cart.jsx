/* eslint-disable react/jsx-key */
import { useContext } from "react";
import { ShoppingCartContext } from "../context";
import { useNavigate } from "react-router-dom";
import CartTile from "../components/cartTile";

function CartPage() {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  return (
    <div className="py-4 max-w-5xl mx-auto max-md:max-w-xl">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        My Cart Page
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 mt-12">
        {/* Cart Items Section */}
        <div className="flex-1 flex flex-col space-y-4">
          {cartItems?.length ? (
            cartItems.map((singleCartItem) => (
              <CartTile singleCartItem={singleCartItem} />
            ))
          ) : (
            <h1>No items available in cart! Please add some items</h1>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-gray-100 rounded-sm p-4 h-max lg:w-1/3">
          <h3 className="text-xl font-extrabold text-gray-950 border-gray-300">
            Order Summary
          </h3>
          <ul className="text-gray-700 mt-4 space-y-2">
            <p 
            className="flex flex-wrap gap-4 text-sm font-bold"
            >
              Total <span>{cartItems.reduce((acc,curr)=>acc+curr.totalPrice,0).toFixed(2)}</span>
            </p>
          </ul>
          <div className="mt-5 flex flex-col gap-2">
            <button 
            className="text-sm px-4 py-3 bg-black text-white font-extrabold"
            disabled={!cartItems?.length}>
              Checkout
            </button>
            <button
              onClick={() => navigate("/product-list")}
              className="text-sm px-4 py-3 bg-black text-white font-extrabold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CartPage;
