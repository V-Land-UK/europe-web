import React from "react";
import Back from "../components/Back";
import Layout from "../defaults/Layout";

const ServerError = () => {
  return (
    <Layout
      title="Server Error!"
      desc="It is not you, it is us and we are sorry..."
    >
      <Back />
      <div className="h-[50vh] w-full flex flex-col items-center justify-center">
        <h1 className="text-[5rem] lg:text-[9rem] text-red-500">500</h1>
        <h2 className="text-sm font-medium poppins">Ouch, we are sorry</h2>
      </div>
    </Layout>
  );
};

export default ServerError;
