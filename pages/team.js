/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Back from "../components/Back";
import { API } from "../config/api";
import Layout from "../defaults/Layout";
const qs = require("qs");
import Icon from "../components/Icon";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
const parse = require("html-react-parser");

const Team = ({ excerpt, team }) => {
  const twitter = "https://twitter.com";
  const instagram = "https://instagram.com";
  const facebook = "https://facebook.com";
  const linkedin = "https://www.linkedin.com/in";
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    if (window.screen.availWidth < 500) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [mobileView]);

  return (
    <Layout
      title="Meet The Team"
      desc="The V-Land UK team are a bunch of like-minded vegan writers, bloggers, influencers, designers etc who are dedicated to bringing you the best vegan content from around the UK"
    >
      <Back />
      <main className="mt-4">
        <h1 className="text-3xl lg:text-3xl text-primary font-bold mt-4 lg:mt-7">
          Team
        </h1>
        <h2 className="text-sm font-medium lg:text-[16px] leading-relaxed poppins mt-4 px-1">
          {parse(excerpt)}
        </h2>

        {mobileView ? (
          <section className="grid grid-cols-1  gap-y-14  mt-10">
            {team?.length > 0 &&
              team.map((staff, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="w-full flex flex-col gap-2 bg-white rounded-xl drop-shadow-md"
                >
                  <div className="flex items-center space-x-10 px-3 lg:px-7 py-5 ">
                    <div className="w-[50%] ">
                      <img
                        src={
                          staff?.attributes?.image?.data?.attributes?.formats
                            ?.small?.url ||
                          staff?.attributes?.image?.data?.attributes?.formats
                            ?.medium?.url ||
                          staff?.attributes?.image?.data?.attributes?.formats
                            ?.large?.url ||
                          staff?.attributes?.image?.data?.attributes?.formats
                            ?.thumbnail?.url ||
                          "Placeholder.png"
                        }
                        alt={staff?.attributes?.name || "Staff"}
                        className="w-full h-full aspect-square rounded-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <h1 className="text-2xl lg:text-3xl text-primary font-bold mt-4 lg:mt-7">
                        {staff?.attributes?.name || "Staff"}
                      </h1>
                      <p className="text-xs lg:text-xl font-light poppins">
                        {staff?.attributes?.pronouns}
                      </p>
                      <p className="text-sm lg:text-xl font-semibold poppins">
                        {staff?.attributes?.position}
                      </p>

                      <div className="flex gap-2">
                        {staff?.attributes?.twitter && (
                          <Icon
                            url={`${twitter}/${staff?.attributes?.twitter}`}
                          >
                            <FaTwitter size={12} />
                          </Icon>
                        )}
                        {staff?.attributes?.linkedin && (
                          <Icon
                            url={`${linkedin}/${staff?.attributes?.linkedin}`}
                          >
                            <FaLinkedinIn size={12} />
                          </Icon>
                        )}
                        {staff?.attributes?.facebook && (
                          <Icon
                            url={`${facebook}/${staff?.attributes?.facebook}`}
                          >
                            <FaFacebookF size={12} />
                          </Icon>
                        )}

                        {staff?.attributes?.instagram && (
                          <Icon
                            url={`${instagram}/${staff?.attributes?.instagram}`}
                          >
                            <FaInstagram size={12} />
                          </Icon>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" bg-neutral-400 bg-opacity-[0.03] text-neutral-800 font-medium poppins text-sm lg:text-lg leading-relaxed px-4  lg:px-0 py-5">
                    {parse(staff?.attributes?.bio)}
                  </div>
                </motion.div>
              ))}
          </section>
        ) : (
          <section className="grid grid-cols-1  gap-y-16  mt-10">
            {team?.length > 0 &&
              team.map((staff, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="w-full flex flex-col gap-2 bg-white rounded-xl drop-shadow-md"
                >
                  <div className="flex items-center space-x-10 px-3 lg:px-7 py-5 ">
                    <div className="w-[35%]">
                      <img
                        src={
                          staff?.attributes?.image?.data?.attributes?.formats
                            ?.small?.url ||
                          staff?.attributes?.image?.data?.attributes?.formats
                            ?.medium?.url ||
                          staff?.attributes?.image?.data?.attributes?.formats
                            ?.large?.url ||
                          staff?.attributes?.image?.data?.attributes?.formats
                            ?.thumbnail?.url ||
                          "Placeholder.png"
                        }
                        alt={staff?.attributes?.name || "Staff"}
                        className="w-9/12 aspect-square rounded-full object-cover"
                      />
                    </div>
                    <div className="w-[65%]">
                      <div className="flex flex-col ">
                        <h1 className="text-3xl lg:text-3xl text-primary font-bold mt-4 lg:mt-7">
                          {staff?.attributes?.name || "Staff"}
                        </h1>
                        <p className="text-xs lg:text-xl font-light poppins">
                          {staff?.attributes?.pronouns}
                        </p>
                        <p className="text-sm lg:text-xl font-semibold poppins">
                          {staff?.attributes?.position}
                        </p>
                        <div className=" bg-neutral-400 bg-opacity-[0.03] text-neutral-800 font-medium poppins text-sm lg:text-lg leading-relaxed px-4  lg:px-0 py-5">
                          {parse(staff?.attributes?.bio)}
                        </div>
                        <div className="flex gap-2">
                          {staff?.attributes?.twitter && (
                            <Icon
                              url={`${twitter}/${staff?.attributes?.twitter}`}
                            >
                              <FaTwitter size={20} />
                            </Icon>
                          )}
                          {staff?.attributes?.linkedin && (
                            <Icon
                              url={`${linkedin}/${staff?.attributes?.linkedin}`}
                            >
                              <FaLinkedinIn size={20} />
                            </Icon>
                          )}
                          {staff?.attributes?.facebook && (
                            <Icon
                              url={`${facebook}/${staff?.attributes?.facebook}`}
                            >
                              <FaFacebookF size={20} />
                            </Icon>
                          )}

                          {staff?.attributes?.instagram && (
                            <Icon
                              url={`${instagram}/${staff?.attributes?.instagram}`}
                            >
                              <FaInstagram size={20} />
                            </Icon>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </section>
        )}
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const excerptRequest = await fetch(`${API}/team-excerpt`);
  const excerpt = await excerptRequest.json();
  console.log(excerpt);

  // Query
  const filters = qs.stringify(
    {
      populate: "*",
      sort: ["order:asc"],
    },
    { encodeValuesOnly: true }
  );

  const teamRequest = await fetch(`${API}/teams?${filters}`);
  const team = await teamRequest.json();

  return {
    props: {
      excerpt: excerpt?.data?.attributes?.content,
      team: team?.data,
    },
    revalidate: 10,
  };
}

export default Team;
