import Header from "../components/template/Home/Header";
import LogoClouds from "../components/modules/logoClouds";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from "react";


export default function home() {
  
  useEffect(()=>{
    toast.success('Welcome to are  adidas', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
  },[])


  return (
    <>
      <Header />
      <LogoClouds />
      <ToastContainer />
    </>
  );
}
