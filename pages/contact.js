import React from "react";
import Back from "../components/Back";
import Layout from "../defaults/Layout";

const Contact = () => {
  return (
    <Layout title="Contact Us">
      <Back />
      <main className="poppins text-base font-normal lg:pt-6 lg:pb-[20vh]">
        <h1 className="text-3xl lg:text-3xl text-primary font-bold mt-4 lg:mt-7">
          Contact
        </h1>
        <h1 className="text-2xl lg:text-3xl text-primary font-bold mt-4 lg:mt-7 mb-1">
          Editorial
        </h1>
        If you are a business, event, public relations, or organization you can
        submit a story for consideration. Please send your pitch and press
        release to{" "}
        <a href="mailto:press@v-landmagazine.com" className="email_txt">
          press@v-landmagazine.com
        </a>
        .
        <h1 className="text-2xl lg:text-3xl text-primary font-bold mt-4 lg:mt-7 mb-1">
          Advertising
        </h1>
        For more information about advertising on our website and our social
        media accounts, email{" "}
        <a href="mailto:advertising@v-landmagazine.com" className="email_txt">
          advertising@v-landmagazine.com
        </a>
        .
        <h1 className="text-2xl lg:text-3xl text-primary font-bold mt-4 lg:mt-7 mb-1">
          General comments and questions
        </h1>
        Comments and questions? Send an email to{" "}
        <a href="mailto:contact@v-landmagazine.com" className="email_txt">
          contact@v-landmagazine.com
        </a>
        .
      </main>
    </Layout>
  );
};

export default Contact;
