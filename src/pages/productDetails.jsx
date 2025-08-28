/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../context";

function ProductDetailsPage() {
    const {id} = useParams();
    const {productDetails,setProductDetails,loading,setLoading,handleGoToCart,cartItems} = useContext(ShoppingCartContext);

    async function fetchProductDetails(){
        const apiRes = await fetch(`https://dummyjson.com/products/${id}`)
        const result = await apiRes.json()

        if(result){
            setProductDetails(result)
            setLoading(false)
        }

          

    }

    useEffect(()=>{
        fetchProductDetails()
    },[id])
  

    if(loading) return <h1>Loading.. Please wait!</h1>

    return ( 
        <div>
            <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-lg p-6">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                        <div className="px-4 py-10 rounded-xl shadow-lg relative">
                            <img 
                            src={productDetails?.thumbnail} 
                            alt={productDetails?.title} 
                            className="w-4/5 rounded object-cover"/>

                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                            {
                                productDetails?.images?.length 
                                ? productDetails?.images.map(imgItem=>
                                    <div key={imgItem} className="rounded-xl p-4 shadow-md">
                                        <img src={imgItem} alt='product secondary image' className="product-secondary-image"/>
                                    </div>
                                )
                                : null
                            }
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-[#333]">
                            {productDetails?.title}
                        </h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <p className="text-sm font-bold">${productDetails?.price}</p>
                        </div>
                        <div>
                            <button 
                            onClick={()=>{handleGoToCart(productDetails)}}
                            className="view-details-button disabled:opacity-50"
                            disabled={cartItems.findIndex(item=>item.id === productDetails.id) > -1}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default ProductDetailsPage;