import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import Back from "../components/Back";
import { API } from "../config/api";
import Layout from "../defaults/Layout";
const parse = require("html-react-parser");

const About = ({ about }) => {
  return (
    <Layout
      title="About Us"
      desc="V-Land UK was founded with a passion for advocating the many benefits of living a vegan lifestyle, and sharing that passion with readers worldwide.
    "
    >
      <Back />
      <main className="w-[95%] lg:w-4/5 mx-auto mt-3">
        <h1 className="text-4xl lg:text-6xl text-primary">About V-Land</h1>
        <div className="relative w-full lg:w-3/5 mx-auto aspect-square my-3">
          <Image src="/Placeholder.png" alt="About Image" layout="fill" />
        </div>
        <div className="text-[16px] lg:text-lg text-neutral-700 tracking-wide leading-relaxed poppins my-2 whitespace-pre-line about">
          {parse(about)}
        </div>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await fetch(`${API}/about`);
  const data = await response.json();

  return {
    props: {
      about: data?.data?.attributes?.about,
    },
    revalidate: 10,
  };
}

export default About;
