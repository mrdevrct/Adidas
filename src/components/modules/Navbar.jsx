import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { setOpenMenu } from "../../services/Redux/actions";
import ShoppingCart from "../template/Shopping/shoppingCart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from "../../services/Axios/config";
import Input from "./Input";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const dispatch = useDispatch();
  const openMenu = useSelector((state) => state.openMenu);

  const [ imageUser , setImageUser] = useState('')
  const [ search , setSearch ] = useState('')
  const imageDefault ='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'


  // variables Redux
  const showCartHandler = () => {
    dispatch(setOpenMenu(true));
  };


  // log out handler
  const logoutHandler = () => {
    Cookies.remove("Token");
  };


  // get token is local host
  const token = Cookies.get("Token");


  // values menu
  const navigation = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Category", href: "/category" },
    { id: 3, name: "Products", href: "/products" },
    { id: 4, name: "Dashboard", href: "/dashboard" },
  ];



  // get user 
  useEffect(()=>{
    apiRequest.get('/user')
    .then((res)=>{
      const response = res.data
      const findUser = response.find(user => user.email === token)
      setImageUser(findUser.photoSrc)
    })
  },[])


  
  
  // search for products
  const navigate = useNavigate(); // استفاده از useNavigate برای ناوبری
  
  const searchHandler = (event) => {
    if (event.keyCode === 13) {
      if (search.trim()) {
        navigate(`/products/search?q=${search}`);
      } else if (!search.trim()) {
        navigate(`/products`);
      }
    }
  }


  return (
    <Disclosure as="nav" className="bg-[#18181b] rounded-[0_0_20px_20px]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#3e3e3e] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="h-8 w-auto"
                      src="../../../public/img/logo.png"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(
                      (item) =>
                        (item.name !== "Dashboard" || token !== undefined) && (
                          <Link
                            key={item.id}
                            to={item.href}
                            className={classNames(
                              "block text-white rounded-md px-3 py-2 text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        )
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                <fieldset className="w-full space-y-1 dark:text-gray-100 hidden lg:block">
                  <label className="hidden">Search</label>
                  <div className="relative flex">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-[#fff]">
                      <button
                        type="button"
                        title="search"
                        className="p-1 focus:outline-none focus:ring"
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 512 512"
                          className="w-4 h-4"
                        >
                          <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                        </svg>
                      </button>
                    </span>
                    <Input
                      type="search"
                      name="Search"
                      placeholder="Search..."
                      onChange={()=>setSearch(event.target.value)}
                      onKeyDown={searchHandler}
                      className="w-32 py-2 px-2  mb-2 pl-10 bg-[#3e3e3e] text-[#fff] text-sm rounded-md sm:w-auto focus:outline-none hidden lg:block"
                    />
                  </div>
                </fieldset>
                {token ? (
                  <>

                  {/* menu shopping cart start */}
                    <ShoppingCart />
                  {/* menu shopping cart close */}


                  {/* icon btn open menu shopping cart */}
                    <div className="mb-[-4px] ml-4 rounded-full border-solid border-[2px] border-[#3e3e3e]">
                      <button onClick={showCartHandler}>
                        <svg
                          width={46}
                          height={46}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ height: "30px",width: "40px", color: "#fff",marginTop: "4px"}}
                        >
                          <path d="M2.31 11.242A1 1 0 0 1 3.28 10h17.44a1 1 0 0 1 .97 1.242l-1.811 7.243A2 2 0 0 1 17.939 20H6.061a2 2 0 0 1-1.94-1.515L2.31 11.243z" />
                          <path d="M9 14v2" />
                          <path d="M15 14v2" />
                          <path d="m6 10 4-6" />
                          <path d="m18 10-4-6" />
                        </svg>
                      </button>
                    </div>

                  </>
                ) : (
                  ""
                )}

                <Menu as="div" className="relative ml-3 mb-1">
                  <div>
                    <Menu.Button className="relative flex mt-2 rounded-full bg-gray-800 text-sm focus:outline-none border-solid border-[2px] border-[#3e3e3e]">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <div className="w-10 h-10">
                        {token ? (
                          <img
                            className="w-fit h-fit rounded-full"
                            src={imageUser || imageDefault}
                            alt=""
                          />
                        ) : (
                          <img
                            className="w-fit h-fit rounded-full"
                            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                            alt=""
                          />
                        )}
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute h-fit shadow-[0px_6px_16px_rgba(255,255,255,0.2)] right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#3e3e3e] text-center py-1 focus:outline-none">
                      <Menu.Item>
                        {({ active }) =>
                          token !== undefined ? (
                            <>
                              <Link
                                to="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-white transition duration-300 ease-in-out transform hover:scale-105"
                                )}
                                onClick={() => {
                                  logoutHandler();
                                  closeMenu();
                                }}
                              >
                                Sign out
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link
                                to="/signup"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-white transition duration-300 ease-in-out transform hover:scale-105"
                                )}
                              >
                                Sign Up
                              </Link>
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-white transition duration-300 ease-in-out transform hover:scale-105"
                                )}
                              >
                                Login
                              </Link>
                            </>
                          )
                        }
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <fieldset className="w-full space-y-1 dark:text-gray-100 py-2">
                <label className="hidden">Search</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-[#fff]">
                    <button
                      type="button"
                      title="search"
                      className="p-1 focus:outline-none focus:ring"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="w-4 h-4"
                      >
                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    name="Search"
                    placeholder="Search..."
                    onChange={()=>setSearch(event.target.value)}
                    onKeyDown={()=>searchHandler(event)}
                    className="w-full py-2 pl-10 bg-[#3e3e3e] text-[#fff] text-sm rounded-md sm:w-auto focus:outline-none"
                  />
                </div>
              </fieldset>
              {navigation.map(
                (item) =>
                  (item.name !== "Dashboard" || token !== undefined) && (
                    <Link
                      key={item.id}
                      to={item.href}
                      className={classNames(
                        "block text-white rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
