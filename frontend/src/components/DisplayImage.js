import React from "react";
import { IoMdClose } from "react-icons/io";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center ">

      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto ">

            <div className="w-fit ml-auto text-2xl hover:text-red-600  p-4 cursor-pointer" onClick={onClose}>
                <IoMdClose />
            </div>
            <div className="flex justify-center items-center p-4 max-w-[80vh] max-h-[70vh]">
                <img src={imgUrl} className="h-full w-full" />
            </div>

      </div>

    </div>
  );
};

export default DisplayImage;
