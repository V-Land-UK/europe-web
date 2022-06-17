/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import Moment from "react-moment";

const ArticleCard = ({ article, index }) => {
  const { findUserByID } = useContext(GlobalContext);
  const router = useRouter();

  // ARTICLE INDEX
  const articleIndex = parseInt(index) + 1;

  //FIND SPONSORED POSTS
  const Sponsored = (post) => {
    const AddClass = post.some((cat) => {
      if (
        cat.attributes.name.toLowerCase() === "sponsored" &&
        articleIndex % 2 !== 0
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (AddClass) {
      return " col-span-2";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`w-full flex flex-col bg-white rounded-xl shadow-md lg:drop-shadow-none lg:shadow-lg article-container ${Sponsored(
        article.attributes?.categories?.data
      )}`}
    >
      {/* POST IMAGE */}
      <div className="relative w-full aspect-square object-cover block rounded-t-xl overflow-hidden">
        <img
          src={`${
            article.attributes?.media?.data[0]?.attributes?.formats?.medium
              ?.url ||
            article.attributes?.media?.data[0]?.attributes?.formats?.large
              ?.url ||
            article.attributes?.media?.data[0]?.attributes?.formats?.small
              ?.url ||
            article.attributes?.media?.data[0]?.attributes?.formats?.thumbnail
              ?.url ||
            "/Placeholder.png"
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
                className={`text-[9px] lg:text-[10px]  px-2 py-1 rounded-2xl drop-shadow-md cursor-pointer  hover:scale-95 transition-all tag ${
                  category.attributes.name.toLowerCase() === "sponsored"
                    ? "text-white bg-green-800 hover:bg-white hover:text-primary"
                    : "text-white bg-primary hover:bg-white hover:text-primary"
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
        <Link
          href={`/article/${article.attributes.slug}`}
          className="cursor-pointer"
          passHref
        >
          <h1 className="text-[1.75rem] lg:text-4xl article-title">
            {article?.attributes?.title}
          </h1>
        </Link>
        <p className="lg:text-xs article-desc">
          {article?.attributes?.description}
        </p>
      </div>

      <div className="article-author">
        <img
          src={
            findUserByID(article?.attributes?.author?.data?.id)?.attributes
              ?.image?.data?.attributes?.formats?.small?.url || "/User.svg"
          }
          alt="Author"
          className="w-7 aspect-square object-cover rounded-full"
        />

        <div className="article-author-data">
          <p>
            {findUserByID(article?.attributes?.author?.data?.id)?.attributes
              ?.fullname || "V-Land UK"}
          </p>

          <Moment format="MMM Do YYYY" className="article-date">
            {article?.attributes?.PublishDate ||
              article?.attributes?.publishedAt ||
              article?.attributes?.createdAt}
          </Moment>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
