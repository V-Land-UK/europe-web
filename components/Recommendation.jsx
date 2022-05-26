/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import Moment from "react-moment";

const Recommendation = ({ article }) => {
  const { findUserByID } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`w-full flex flex-col bg-white rounded-xl shadow-md lg:drop-shadow-none lg:shadow-lg article-container`}
    >
      {/* POST IMAGE */}
      <div className="relative w-full aspect-square object-cover block rounded-t-xl overflow-hidden">
        <img
          src={`${
            article.attributes?.media?.data[0]?.attributes?.formats?.medium
              ?.url || "/Placeholder.png"
          }`}
          className="w-full h-full object-cover"
          alt={`${
            article.attributes?.media?.data[0]?.attributes?.alternativeText ||
            article?.attributes?.title ||
            ""
          }`}
        />
        <div className="absolute flex flex-wrap gap-2 bottom-3 w-[94%] mx-auto right-0 left-0">
          {/* TAGS/CATEGORIES */}
          {article.attributes?.categories?.data.length > 0 &&
            article.attributes.categories.data.map((category, current) => (
              <p
                key={current}
                className={`text-[9px] lg:text-[10px]  px-2 py-1 rounded-2xl drop-shadow-md cursor-pointer hover:bg-primary hover:text-white hover:scale-95 transition-all tag ${
                  category.attributes.name.toLowerCase() === "sponsored"
                    ? "text-white bg-purple-600"
                    : "text-primary bg-green-50"
                }`}
                onClick={() =>
                  router.push(`/category/${category.attributes.slug}`)
                }
              >
                {category.attributes.name}
              </p>
            ))}
        </div>
      </div>
      {/* POST BODY */}

      <div className="article-body">
        <h1 className="text-[1.75rem] lg:text-4xl leading-tight article-title">
          {article?.attributes?.title}
        </h1>
        <p className="lg:text-xs article-desc">
          {article?.attributes?.description}
        </p>
      </div>

      <div className="article-author">
        <img
          src={
            findUserByID(article?.attributes?.author)?.attributes?.image?.data
              ?.attributes?.formats?.small?.url || "/User.svg"
          }
          alt="Author"
          className="w-7 aspect-square object-cover rounded-full"
        />

        <div className="article-author-data">
          <p>
            {findUserByID(article?.attributes?.author)?.attributes?.fullname ||
              "V-Land UK"}
          </p>
          {article?.attributes?.publishedAt && (
            <Moment format="MMM Do YYYY" className="article-date">
              {article?.attributes?.publishedAt}
            </Moment>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Recommendation;
