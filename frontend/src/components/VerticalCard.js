import React, { useContext } from "react";
import scrollTop from "../helpers/scrollTop";
import displayINRcurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddTocart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] mx-3 justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-hidden transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[310px]  bg-white rounded-sm shadow ">
                <div className="bg-slate-200 h-48 p-4 min-w-[128px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>

                <div className="p-4 grid">
                  <h3 className="text-lg font-semibold text-ellipsis line-clamp-1 p-1 py-2 m-2bg-slate-200 animate-pulse rounded-full"></h3>
                  <p className="capitalize text-slate-500 p-1 py-2 m-2 bg-slate-200 animate-pulse rounded-full"></p>

                  <div className="flex gap-2 ">
                    <p className=" m-2 p-1 py-2 bg-slate-200 animate-pulse rounded-full w-full"></p>
                    <i className="m-2 text-slate-500 line-through p-1 py-2 bg-slate-200 animate-pulse rounded-full w-full"></i>
                  </div>

                  <button className="text-sm  text-white px-3 py-2 rounded-full mt-1 bg-slate-200 animate-pulse"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow my-2"
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[128px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product.ProductImage[0]}
                    className="object-scale-down h-full hover:scale-105 transition-all mix-blend-multiply"
                  />
                </div>

                <div className="p-4 grid">
                  <h3 className="text-lg font-semibold text-ellipsis line-clamp-1">
                    {product?.ProductName}
                  </h3>
                  <p className="capitalize text-slate-500">
                    {product?.Category}
                  </p>

                  <div className="flex gap-2 ">
                    <p>{displayINRcurrency(product.SellingPrice)}</p>
                    <i className="text-slate-500 line-through">
                      {displayINRcurrency(product.Price)}
                    </i>
                  </div>

                  <button
                    className="text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-full mt-1"
                    onClick={(e) => handleAddTocart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default VerticalCard;
