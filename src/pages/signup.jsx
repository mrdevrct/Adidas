import { useEffect, useState } from "react";
import Input from "../components/modules/Input";
import apiRequest from "../services/Axios/config";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
// import ReCAPTCHA from "react-google-recaptcha";

export default function Example() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [zip, setZip] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const registerHandler = async (event) => {
    try {
      event.preventDefault();

      if (!username) {
        toast.error("Please enter your username", {
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
        toast.error("Invalid email format", {
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
        toast.error("Invalid password format", {
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

      const emilCheck = await apiRequest.get(`/user?email=${email}`);

      if (emilCheck.data.length > 0) {
        toast.error("This email has already been used.", {
          position: "top-center",
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
      const currentDate = new Date();
      const timestamp = currentDate.toISOString();

      apiRequest
        .post("/user", {
          id: uuidv4(),
          username,
          email,
          password,
          address,
          city,
          zip,
          photoSrc,
          state,
          firstname,
          lastname,
          timestamp
        })
        .then((response) => {
          Cookies.set("Token", email, {
            expires: 7,
            domain: "localhost",
            httpOnly: false,
          });

          toast.success("Success", {
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

          setUserName("");
          setLastname("");
          setFirstname("");
          setState("");
          setEmail("");
          setPassword("");
          setAddress("");
          setCity("");
          setZip("");
          setPhotoSrc("");

          window.location.pathname = "/";
        })
        .catch((err) => {
          toast.error("Error signing up", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        });
    } catch (err) {
      // console.log(err);
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
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <Input
              label="User Name"
              type="text"
              placeholder="Enter Your User Name"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              maxLength="15"
              id="hs-strong-password-api-with-indicator-and-hint-in-popover"
            />
            
            <div className="py-2">
              <button
                type="submit"
                className="flex w-full justify-center mt-2 rounded-md bg-[#18181b] px-3 py-1.5 text-sm font-semibold leading-6 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow "
                onClick={registerHandler}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Do you already have an account?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
