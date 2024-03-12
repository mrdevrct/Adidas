import Input from "../components/modules/Input";
import { useEffect, useState } from "react";
import apiRequest from "../services/Axios/config";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';

export default function Example() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      if (!email || !password) {
        toast.error('Please fill in all fields', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return;
      }

      if (!isValidEmailFormat(email)) {
        setIsValidEmail(false);
        toast.error('Invalid email format', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return;
      }

      if (!isValidPasswordFormat(password)) {
        setIsValidPassword(false);
        toast.error('Invalid password format', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return;
      }

      const response = await apiRequest.get('/user');
      const users = response.data;
  
      const foundUser = users.find(userData => userData.email === email);
  
      if (foundUser) {
        const isPasswordValid = foundUser.password === password;
  
        if (isPasswordValid) {
          Cookies.set('Token', email , { expires: 7, domain: 'localhost', httpOnly: false});
          window.location.pathname = '/';
        } else {
          toast.error('Invalid password or email', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } else {
        toast.error('Invalid password or email', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPasswordFormat = (password) => {
    return password.length >= 8;
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://logodix.com/logo/6071.png"
            alt="Your Company"
          />
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <Input
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            
            {/* {!isValidEmail && (
              <p className="text-xs text-red-500">Invalid email format</p>
            )} */}
            
            <Input
              label="Password"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {/* {!isValidPassword && (
              <p className="text-xs text-red-500">Invalid password format</p>
            )} */}
            
            <div className="text-sm">
              <a href="#" className="font-semibold text-">
                Forgot password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center mt-2 rounded-md bg-[#18181b] px-3 py-1.5 text-sm font-semibold leading-6 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow "
                onClick={loginHandler}
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Do you not have an account?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              signup
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
