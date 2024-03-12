import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import apiRequest from "../services/Axios/config";
import Cookies from "js-cookie";
import Input from "../components/modules/Input";

export default function Example() {
  const token = Cookies.get("Token");
  const [userId, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [zip, setZip] = useState("");
  const [bio, setBio] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const defaultImageSrc =
    "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745";

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest.get("/user");
        const user = res.data;
        const userFind = user.find((userInfo) => userInfo.email === token);
        setUserId(userFind.id);
        setUserName(userFind.username);
        setPassword(userFind.password);
        setEmail(userFind.email);
        setFirstname(userFind.firstname);
        setLastname(userFind.lastname);
        setAddress(userFind.address);
        setZip(userFind.zip);
        setCity(userFind.city);
        setState(userFind.state);
        setPhotoSrc(userFind.photoSrc || defaultImageSrc);
      } catch (error) {
        console.error("Fetch Failed:", error.message);
      }
    };

    fetchData();
  }, [token]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
      const fileSrc = URL.createObjectURL(file);
      setPhotoSrc(fileSrc);
    }
  };

  const updateData = useCallback(async () => {
    try {
      console.log("Updating user with ID:", userId);
      console.log("Data to be sent:", {
        username,
        email,
        password,
        address,
        city,
        state,
        firstname,
        lastname,
        zip,
      });

      const response = await apiRequest.put(`/user/${userId}`, {
        username,
        email,
        password,
        address,
        city,
        state,
        firstname,
        lastname,
        zip,
        photoSrc: photoSrc || defaultImageSrc,
      });
      alert("Update Successful");
    } catch (error) {
      console.error("Update Failed:", error.message);
    }
  }, [
    userId,
    username,
    email,
    password,
    address,
    city,
    state,
    firstname,
    lastname,
    zip,
    bio,
  ]);

  return (
    <>
      <form className="container flex flex-col p-10 mx-auto my-10 bg-[#f5f5f5] space-y-12 rounded-[10px]">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div className="mt-2 flex justify-between w-full">
                  <Input
                    label="username"
                    type="text"
                    value={username}
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                  />
                  <div className="flex">
                    <Input
                      label="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}          
                      />
                    <button type="button" className="mt-8" onClick={handleTogglePassword}>
                      {showPassword ? (
                        <svg
                          width={35}
                          height={35}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15 11.64a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path d="M2.4 11.64S6 5.04 12 5.04s9.6 6.6 9.6 6.6-3.6 6.6-9.6 6.6-9.6-6.6-9.6-6.6Zm9.6 4.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" />
                        </svg>
                      ) : (
                        <svg
                          width={35}
                          height={35}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m15.348 17.47-1.936-1.938a4.2 4.2 0 0 1-5.37-5.369l-2.47-2.472C3.526 9.51 2.4 11.576 2.4 11.576s3.6 6.6 9.6 6.6a8.436 8.436 0 0 0 3.347-.706ZM8.652 5.681A8.434 8.434 0 0 1 12 4.976c6 0 9.6 6.6 9.6 6.6s-1.127 2.065-3.169 3.885l-2.474-2.474a4.199 4.199 0 0 0-5.37-5.369L8.653 5.681Z" />
                          <path d="M9.03 11.15a3 3 0 0 0 3.396 3.395L9.03 11.15Zm5.94.85-3.394-3.396a3 3 0 0 1 3.395 3.395Zm3.806 7.2L4.376 4.8l.85-.85 14.4 14.4-.85.85Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <img
                    src={photoSrc || defaultImageSrc}
                    alt="User Photo"
                    className="h-12 w-12 rounded-full"
                  />
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  ></label>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1 ml-2">
                        {selectedFileName || "or drag and drop"}
                      </p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Input
                  label="firstname"
                  type="text"
                  value={firstname}
                  onChange={(event) => {
                    setFirstname(event.target.value);
                  }}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  label="lastname"
                  type="text"
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
                />
              </div>

              <div className="sm:col-span-4">
                <Input
                  label="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <Input
                  label="Sreet Address"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="ZIP / Postal Code"
                  type="text"
                  value={zip}
                  onChange={(event) => {
                    setZip(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={updateData}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
