import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRcurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    ProductName: "",
    BrandName: "",
    Category: "",
    ProductImage: [],
    Discription: "",
    Price: "",
    SellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const ProductImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.producDetails.url, {
      method: SummaryApi.producDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);

    const dataResponse = await response.json();
    console.log("ProductDetails dataResponse", dataResponse);

    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.ProductImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const zoomHandleImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientX - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleByProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-full lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="w-full h-full object-scale-down mix-blend-multiply"
              onMouseMove={zoomHandleImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/* Zoom Image Section */}

            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 rounded">
                <div
                  className="w-full h-full min-w-[500px] min-h-[400px]  mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}%  ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-hidden h-full">
                {ProductImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-hidden h-full">
                {data?.ProductImage?.map((imgURL, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded  p-1 cursor-pointer"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className="h-full w-full object-scale-down mix-blend-multiply"
                        onMouseDown={() => handleMouseEnterProduct(imgURL)}
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="flex flex-col gap-1 w-full">
            <h3 className=" bg-slate-200 animate-pulse  h-6  text-2xl rounded-full lg:text-4xl font-medium"></h3>
            <span className="bg-slate-200 animate-pulse my-1 h-6  px-2 rounded-full"></span>
            <p className="capitalize bg-slate-200  animate-pulse h-6  rounded-full"></p>

            <div className="bg-slate-200 h-6 animate-pulse  my-1 rounded-full flex gap-2"></div>

            <div className="flex items-center gap-2  my-1">
              <p className="h-8 w-60 bg-slate-200 animate-pulse rounded-full "></p>
              <p className="h-8 w-60 bg-slate-200 animate-pulse rounded-full "></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="bg-slate-200 h-8 animate-pulse  rounded px-3 py-1 min-w-[200px]"></button>
              <button className="bg-slate-200 h-8 animate-pulse  rounded px-3 py-1 min-w-[200px] "></button>
            </div>

            <div className="bg-slate-200 h-40 w-full rounded">
              <p className=" font-medium my-1"></p>
              <p></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl lg:text-4xl font-medium">
              {data?.ProductName}
            </h3>
            <span className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.BrandName}
            </span>
            <p className="capitalize text-slate-400">{data?.Category}</p>

            <div className="text-red-500 flex gap-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 lg:text-3xl text-2xl font-medium my-1">
              <p>{displayINRcurrency(data?.SellingPrice)}</p>
              <p className=" line-through text-slate-600">
                {displayINRcurrency(data?.Price)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button
                className="border border-yellow-600 font-bold rounded px-3 py-1 min-w-[100px] hover:bg-yellow-600 hover:text-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add to Cart
              </button>
              <button
                className="border bg-yellow-500 font-bold rounded px-3 py-1 min-w-[100px] "
                onClick={(e) => handleByProduct(e, data?._id)}
              >
                Buy
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Discription :</p>
              <p>{data?.Discription}</p>
            </div>
          </div>
        )}
      </div>

      {data.Category && (
        <CategoryWiseProductDisplay
          category={data.Category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
