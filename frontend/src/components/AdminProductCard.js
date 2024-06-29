import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import AdminEditProduct from "../components/AdminEditProduct";
import displayINRcurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editproduct, setEditproduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-48">
        <div className="h-32 w-32 flex  justify-center items-center">
          <img
            src={data?.ProductImage[0]}
            className="object-fil h-full mx-auto"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.ProductName}</h1>

        <div>
          <p className="font-semibold">
            {displayINRcurrency(data.SellingPrice)}
          </p>

          <div
            className="w-fit ml-auto p-2 bg-green-100 cursor-pointer hover:bg-green-600 rounded-full  hover:text-white"
            onClick={() => setEditproduct(true)}
          >
            <GrEdit />
          </div>
        </div>
      </div>

      {editproduct && (
        <AdminEditProduct
          ProductData={data}
          onClose={() => setEditproduct(false)}
          fetchdata={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
