import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function SingleItem({ singleProductTile }) {

    const navigate = useNavigate();

    function handleGetProductId(singleProductTile){
        navigate(`/product-details/${singleProductTile}`)
    }

    return (
      <div className="product-card">
        <div className="product-image-wrapper">
          <img
            src={singleProductTile.thumbnail}
            alt={singleProductTile.title}
            className="product-image"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold">{singleProductTile.title}</h3>
          <p className="text-gray-500">{singleProductTile.price} USD</p>
        </div>
        <button 
        className="view-details-button"
        onClick={()=>handleGetProductId(singleProductTile.id)}>View Details</button>
      </div>
    );
  }
  
  export default SingleItem;
  