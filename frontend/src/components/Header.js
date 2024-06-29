import React, { useContext, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [manuDisplay, setManuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInpt = useLocation();
  const URLsearch = new URLSearchParams(searchInpt?.search);
  const searchQuery = URLsearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  console.log("user header", user);

  const handlelogout = async () => {
    const fetchData = await fetch(SummaryApi.user_logout.url, {
      method: SummaryApi.user_logout.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-0 flex items-center px-1 justify-between">
        <div className="flex  items-center justify-between ">
          <div className="font-bold">
            <Link to={"/"}>
              {/* <Logo w={90} h={50} /> */}
              MANOJ
            </Link>
          </div>
        </div>

        <div className=" hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow md:pl-2">
          <input
            type="text"
            placeholder="search product here.."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-orange-600 flex items-center justify-center rounded-r-full text-white">
            <HiOutlineSearch />
          </div>
        </div>

        <div className="flex items-center  gap-1 md:gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setManuDisplay((prevel) => !prevel)}
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user?.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                  />
                ) : (
                  <FaCircleUser />
                )}
              </div>
            )}

            {manuDisplay && (
              <div className="absolute bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 "
                      onClick={() => setManuDisplay((prevel) => !prevel)}
                    >
                      Admin panal
                    </Link>
                  )}
                  <Link
                    to={"/order"}
                    className="whitespace-nowrap  md:block hover:bg-slate-100 p-2"
                    onClick={() => setManuDisplay((prevel) => !prevel)}
                  >
                    Order
                  </Link>

                </nav>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 md:gap-7">
            {user?._id && (
              <Link to={"/cart"} className=" md:block text-2xl relative">
                <span>
                  <FaShoppingCart />
                </span>
                <div className="bg-orange-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                  <p className="text-sm">{context.countcartproduct}</p>
                </div>
              </Link>
            )}

            <div>
              {user?._id ? (
                <button
                  onClick={handlelogout}
                  className="px-1 md:px-3 md:py-1 rounded-full border-2 border-orange-700 hover:text-white hover:bg-orange-700"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="px-3 py-1 rounded-full border-2 border-orange-700 hover:text-white hover:bg-orange-700"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
