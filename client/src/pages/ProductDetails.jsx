import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets"; // Assuming assets contains necessary images/icons

const ProductDetails = () => {
  const { products, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);

  // Debugging logs
  console.log("Products:", products);
  console.log("Product ID from URL:", id);

  // Ensure products are loaded before finding the product
  const product = products?.find((p) => String(p._id) === String(id));

  useEffect(() => {
    if (product) {
      setThumbnail(product.images?.[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-red-600 text-center mt-10">
        <h1>Product Not Found</h1>
        <p>Please check the product ID or try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 py-8">
      {/* Images Section */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={thumbnail || assets.placeholderImage} // Use placeholder image if thumbnail is null
          alt={product.name}
          className="w-[300px] h-[300px] object-cover rounded-xl border"
        />
        <div className="flex gap-3">
          {product.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded-xl border cursor-pointer ${
                thumbnail === img ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setThumbnail(img)}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600 capitalize">Category: {product.category}</p>
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold text-green-600">
            {currency}{product.offerPrice}
          </span>
          <span className="line-through text-gray-500">
            {currency}{product.price}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-yellow-500">{"⭐".repeat(product.rating)}</span>
          <span className="text-gray-600">({product.rating})</span>
        </div>
        <div>
          <h2 className="font-medium">Highlights:</h2>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {product.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
        <button
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 w-fit"
          onClick={() => addToCart(product._id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;