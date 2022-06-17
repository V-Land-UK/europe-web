/* eslint-disable @next/next/no-img-element */
import React from "react";
import Back from "../components/Back";
import Layout from "../defaults/Layout";

const NotFound = () => {
  return (
    <Layout title="Page Not Found!" desc="This page does not exist yet...">
      <Back />
      <div className="h-[50vh] w-full flex flex-col items-center justify-center">
        <img
          src="/404.png"
          alt="Page Not Found"
          className="w-[85vw] lg:w-2/5 object-contain"
        />
        {/* <h1 className="text-[5rem] lg:text-[9rem] text-red-500">404</h1> */}
        <h2 className="text-sm font-medium poppins">Oops. Page not found!</h2>
      </div>
    </Layout>
  );
};

export default NotFound;
