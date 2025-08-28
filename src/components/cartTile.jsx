/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ShoppingCartContext } from "../context";

function CartTile({singleCartItem}) {

    const {handleRemoveFromCart,handleGoToCart} = useContext(ShoppingCartContext);

    return ( 
        <>
        <div className="grid grid-cols-3 gap-4 items-start">
            <div className="col-span-2 flex items-start gap-4">
                    <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
                        <img 
                        src={singleCartItem?.thumbnail}
                        className="w-full h-full object-contain rounded-sm"
                        />
                        <div>
                            <h3 className="text-base font-bold text-gray-800">
                                {singleCartItem?.title}
                            </h3>
                            <button 
                            className="text-sm px-4 py-3 bg-black text-white font-extrabold"
                            onClick={()=>handleRemoveFromCart(singleCartItem,true)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
            </div>
            <div className="ml-auto">
                  <h3 className="text-lg font-bold text-gray-900">${singleCartItem?.totalPrice.toFixed(2)}</h3>
            </div>
            <p className="mt-2 mb-3 font-bold text-[16px]">Quantity: {singleCartItem?.quantity}</p>
            <div className="mt-64">
                <button 
                className="border border-[#000]"
                onClick={()=>handleRemoveFromCart(singleCartItem,false)}
                disabled={singleCartItem?.quantity === 1}>-</button>
                <button 
                className="border border-[#000]"
                onClick={()=>handleGoToCart(singleCartItem)}>+</button>
            </div>
        </div>
        <hr className="border-grey-500"/>
        </>
     );
}

export default CartTile;