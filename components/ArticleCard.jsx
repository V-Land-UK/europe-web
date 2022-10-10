/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import Moment from "react-moment";
import React from "react";
import { stringify } from "qs";

import Image from "next/image";

const ArticleCard = ({ article, index }) => {
  const { findUserByID, Articles } = useContext(GlobalContext);
  const router = useRouter();

  //HELPER FUNC REMOVING WHITESPACE FROM STRING
  /*const rmvWhiteSpace = (str)=>{
    return str.replace(/\s+/g, '');
  }*/

  //FIND POSTS WITH TITLE LENGTHS > 50 CHARACTERS
  /*const checkCharCount = (post) => {
    const titleChars = rmvWhiteSpace(post);
    const titleCharsCount = titleChars.split('').length - 1;

    return titleCharsCount > 50;
  };*/
  //FIND SPONSORED POSTS
  //const Sponsored = (post) =>{
  //const AddClass = 0;

  /*post.some((cat) => {
     if (
        cat.attributes.name.toLowerCase() === "culture" 
        
      ) {
       return true;
      } else {
       return false;
     }*/

  /*if (titleCharsCount > 40) {
      console.log(titleCharsCount);
      return "col-span-2";
    }
    else{
      
      return "";
    }
  };*/

  // className={`w-full flex flex-col bg-white rounded-xl shadow-md lg:drop-shadow-none lg:shadow-lg article-container ${Sponsored(
  //   article.attributes?.categories?.data
  // )}`}

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`w-full flex flex-col bg-white rounded-2xl shadow-md lg:drop-shadow-lg row-span-2 card_${article.attributes?.size} will-change-transform`}
    >
      {/* POST IMAGE */}
      <div className="relative w-full aspect-square object-cover block rounded-t-xl overflow-hidden img_ctnr">
        <Image
          style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
          blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8e+rUUwAIFQNIlnFEqgAAAABJRU5ErkJggg=="
          placeholder="blur"
          src={`${
            article.attributes?.media?.data[0]?.attributes?.formats?.medium
              ?.url ||
            article.attributes?.media?.data[0]?.attributes?.formats?.large
              ?.url ||
            article.attributes?.media?.data[0]?.attributes?.formats?.small
              ?.url ||
            article.attributes?.media?.data[0]?.attributes?.formats?.thumbnail
              ?.url ||
            article.attributes?.media?.data[0]?.attributes?.url ||
            "/Placeholder.png"
          }`}
          alt={`${
            article.attributes?.media?.data[0]?.attributes?.alternativeText ||
            article?.attributes?.title ||
            ""
          }`}
          layout="fill"
          objectFit="cover"
        />

        <div className="absolute flex flex-wrap gap-2 bottom-3 w-[94%] mx-auto right-0 left-0">
          {/* TAGS/CATEGORIES */}
          {article.attributes?.categories?.data.length > 0 &&
            article.attributes.categories.data.map((category, current) => (
              <Link
                key={current}
                href={`/category/${category.attributes.slug}`}
                passHref
              >
                <a className="no-underline">
                  <p
                    className={`text-[9px] lg:text-[10px]  px-2 py-1 rounded-2xl drop-shadow-md cursor-pointer  hover:scale-95 transition-all tag ${
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
        className={`${
          article.attributes?.categories?.data[0]?.attributes?.name ===
          "Food & Drink"
            ? "green-body "
            : ""
        } aCard__body px-3 py-1 flex flex-col justify-between rounded-b-2xl`}
      >
        <div className="article-body">
          <Link
            href={`/article/${article.attributes.slug}`}
            className="cursor-pointer"
            passHref
          >
            <a>
              <h1
                className={` xxs:text-[.8rem] xs:text-[1.3rem] sm:text-[1.5rem] md:text-2xl lg:text-2xl xl:text-3xl border-box xxs:pb-[0.12rem] xs:pb-[0.17rem] mb-[0.1875rem] sm:pb-[0.15rem] mb-[0.1875rem] md: pb-[0.1875rem] mb-[0.1875rem] ${
                  article.attributes?.categories?.data[0]?.attributes?.name ===
                  "Food & Drink"
                    ? "article-title-green "
                    : "article-title"
                }`}
              >
                <span className="underline__span">
                  {article?.attributes?.title?.length > 66
                    ? article?.attributes?.title.slice(0, 66) + "..."
                    : article?.attributes?.title}
                </span>
              </h1>
            </a>
          </Link>
        </div>
        {/* <div className="my-auto">
          <p className=" lg:text-xs article-desc-home">
            {article?.attributes?.description?.length > 160
              ? article?.attributes?.description.slice(0, 160) + "..."
              : article?.attributes?.description}
          </p>
        </div> */}

        <div className="article-author-home flex xs:mb-[.2rem] sm:mb-[.5rem] md:mb-[.5rem] lg:mb-[.5rem] lg:space-x-4">
          <div className="relative author_img-ctnr xss:w-7 xss:h-7 xs:w-7 xs:h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 mr-1">
            <Image
              blurDataURL={`data:image/jpeg;base64,/iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8e+rUUwAIFQNIlnFEqgAAAABJRU5ErkJggg==`}
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
              placeholder="blur"
              style={{ borderRadius: "50%" }}
            />
          </div>

          {/*<img
          src={
            findUserByID(article?.attributes?.author?.data?.id)?.attributes
              ?.image?.data?.attributes?.formats?.small?.url ||
            findUserByID(article?.attributes?.author?.data?.id)?.attributes
              ?.image?.data?.attributes?.url ||
            "/User.svg"
          }
          alt="Author"
          className="w-8 h-8 lg:w-9 lg:h-9 aspect-square object-cover rounded-full"
        />*/}

          <div className={"article-author-data"}>
            <p
              className={`txt ${
                article.attributes?.categories?.data[0]?.attributes?.name ===
                "Food & Drink"
                  ? " text-white"
                  : " text-primary"
              }`}
            >
              {findUserByID(article?.attributes?.author?.data?.id)?.attributes
                ?.fullname || "V-Land UK"}
            </p>

            <Moment
              format="MMM Do YYYY"
              className={`${
                article.attributes?.categories?.data[0]?.attributes?.name ===
                "Food & Drink"
                  ? "article-date-green"
                  : "article-date"
              }`}
            >
              {article?.attributes?.PublishDate}
            </Moment>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
