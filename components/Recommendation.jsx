/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import Moment from "react-moment";
import Image from "next/image";

const Recommendation = ({ article}) => {
  const { findUserByID } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <div className="rounded-2xl shadow-md lg:drop-shadow-lg">
      {/* POST IMAGE */}
      <div className="relative w-full aspect-square object-cover block rounded-t-xl overflow-hidden img_ctnr">
        <Image
          style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
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
          layout="fill"
          alt={`${
            article.attributes?.media?.data[0]?.attributes?.alternativeText ||
            article?.attributes?.title ||
            ""
          }`}
          objectFit="cover"
        />
        <div className="absolute flex flex-wrap gap-2 bottom-3 w-[94%] mx-auto right-0 left-0">
          {/* TAGS/CATEGORIES */}
          {article.attributes?.categories?.data.length > 0 &&
            article.attributes.categories.data.map((category, current) => (
              <Link  key={current} href={`/category/${category.attributes.slug}`} passHref>
                <a className="no-underline">
                  <p
                   
                    className={`text-[5px] lg:text-[10px]  px-2 py-1 rounded-2xl drop-shadow-md cursor-pointer  hover:scale-95 transition-all tag ${
                      category.attributes.name.toLowerCase() === "sponsored"
                        ? "text-white bg-green-800 hover:bg-white hover:text-primary"
                        : "text-white bg-primary hover:bg-white hover:text-primary"
                    }`}
                    
                  >
                    {category.attributes.name}
                  </p>
                </a>
              </Link>
            ))}
        </div>
      </div>
      {/* POST BODY */}
      <div
        className={`flex flex-col h-[12rem] lg:h-[18.3rem]  bg-white rounded-b-xl shadow-md lg:drop-shadow-none lg:shadow-lg article-container`}
      >
        <div className="article-body px-4 lg:px-5 my-auto ">
          <Link
              href={`/article/${article.attributes.slug}`}
              className="cursor-pointer"
              passHref
          >
            <a>
              <h1
                className={`xxs:text-[.8rem] xs:text-[1rem] sm:text-[1.1rem] md:text-[1.3rem] lg:text-2xl xl:text-3xl border-box xxs:pb-[0.12rem] xs:pb-[0.12rem] mb-[0.1875rem] sm:pb-[0.11rem] mb-[0.1875rem] md: pb-[0.1875rem] mb-[0.1875rem] article-title rec__card`}
              >
                <span className="underline__span">{article?.attributes?.title?.length > 65
                  ? article?.attributes?.title.slice(0, 65) + "..."
                  : article?.attributes?.title}
                </span>
              </h1>
            </a>
          </Link>
        </div>
        <p className="lg:text-xs  article-desc my-auto px-4 lg:px-10">
          {article?.attributes?.description?.length > 160
            ? article?.attributes?.description.slice(0, 160) + "..."
            : article?.attributes?.description}
        </p>
        <div className="article-author ml-2 pb-2 lg:pb-3 ml-5">
          <div className= "relative  w-7 h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9">
              <Image
                src={
                  findUserByID(article?.attributes?.author?.data?.id)?.attributes
                  ?.image?.data?.attributes?.formats?.small?.url ||
                findUserByID(article?.attributes?.author?.data?.id)?.attributes
                  ?.image?.data?.attributes?.url ||
                "/User.svg"
                }
                
                alt="Picture of author"
                layout="fill"
                objectFit="cover"
                style={{borderRadius: "50%",
                       
                      }}
              
                

              />
            </div>
         
          <div className="article-author-data ">
            <p className="txt">
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
      </div>
    </div>
  );
};

export default Recommendation;
