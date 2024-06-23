import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    conforpassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handlOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUpLoadImg = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password == data.conforpassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("please check password and conform password");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-3 py-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-100 bg-opacity-80 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUpLoadImg}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="enter your name"
                  name="name"
                  value={data.name}
                  onChange={handlOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handlOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handlOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Conform Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConPassword ? "text" : "password"}
                  placeholder="enter conform password"
                  name="conforpassword"
                  value={data.conforpassword}
                  onChange={handlOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConPassword((preve) => !preve)}
                >
                  <span>{showConPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 w-full  rounded-full hover:scale-100  transition-all mx-auto block mt-6">
              Signup
            </button>
          </form>
          <div className=" block w-fit mx-auto m-3">
            <p>
              Already have an account ?{" "}
              <Link
                to={"/login"}
                className="hover:text-red-600 hover:underline text-blue-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
