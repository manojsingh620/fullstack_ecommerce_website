import React, { useContext, useState } from "react";
// import Logo from "./Logo";
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
import { IoMdHome } from "react-icons/io";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [manuDisplay, setManuDisplay] = useState(false);
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInpt = useLocation()
  const URLsearch = new URLSearchParams(searchInpt?.search)
  const searchQuery = URLsearch.getAll("q")
  const [search,setSearch]=useState(searchQuery)

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
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch=(e)=>{
      const {value} =e.target
      setSearch(value)
      if(value){
        navigate(`/search?q=${value}`)
      }else{
        navigate("/search")
      }
  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="flex  items-center justify-between  h-full ">
          <div className=" flex justify-between ">
              <div className="font-bold ">
                <Link to={"/"}>
                  {/* <Logo w={90} h={50} /> */}
                  MANOJ
                </Link>
              </div>
              <div className="hidden md:block font-bold hover:underline mx-3">
                <Link to={"/"}>
                  {/* <Logo w={90} h={50} /> */}
                  {/* <IoMdHome className="size-7 "/> */}
                  HOME
                </Link>
              </div>
              <div className="hidden md:block font-bold hover:underline">
                <Link to={"/"}>
                  {/* <Logo w={90} h={50} /> */}
                  ABOUT US
                </Link>
              </div>
          </div>
        </div>

        <div className=" hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
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

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">

          {
            user?._id && (<div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setManuDisplay((prevel) => !prevel)}
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user?.name}
                  className=" w-10 h-10 rounded-full"
                />
              ) : (
                <FaCircleUser />
              )}
            </div>)
          }
            

            {manuDisplay && (
              <div className="absolute bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  {
                    user?.role === ROLE.ADMIN && (
                      <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 "  onClick={() => setManuDisplay((prevel) => !prevel)}
                    >
                      Admin panal
                    </Link>
                    )
                  }
                  <Link to={"/order"} className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2" onClick={() => setManuDisplay((prevel) => !prevel)}>Order</Link>
                  
                </nav>
              </div>
            )}

          </div>

          

            {
            user?._id && (
                <Link to={"/cart"} className="hidden md:block text-2xl relative">
                  <span>
                    <FaShoppingCart />
                  </span>
                  <div className="bg-orange-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                  <p className="text-sm">{context.countcartproduct}</p>
                  </div>
                </Link>
              )
            }    
          

          <div>
            {user?._id ? (
              <button
                onClick={handlelogout}
                className="px-3 py-1 rounded-full text-white bg-orange-600 hover:bg-orange-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-orange-600 hover:bg-orange-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
