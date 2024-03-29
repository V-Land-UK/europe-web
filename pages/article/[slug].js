/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { API, SITE_URL } from "../../config/api";
import { getPreviewArticleBySlug } from "../../lib/api.js";
import Layout from "../../defaults/Layout";
import { GlobalContext } from "../../context/GlobalContext";
import ReactMarkdown from "react-markdown";
import Back from "../../components/Back";
import ArticleCard from "../../components/ArticleCard";
const qs = require("qs");
const parse = require("html-react-parser");
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  FaFacebookF,
  FaTelegram,
  FaTelegramPlane,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import { RiShareBoxFill } from "react-icons/ri";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import CommentForm from "../../components/CommentForm";
import CommentsArea from "../../components/CommentsArea";
import Recommendation from "../../components/Recommendation";
import Slider from "react-slick";
import request from "../../utils/request.util";


const Article = ({ article }) => {
  const router = useRouter();

  const imageInText = article?.attributes?.content.replace(
    "<img",
    "<img  style={{ borderRadius: '16px !important' }} "
  );

  const { findUserByID, Articles } = useContext(GlobalContext);

  // Share State
  const [ShareState, setShareState] = useState(false);

  // Comments
  const [Comments, setComments] = useState([]);

  //Other Articles
  const Others = Articles.filter((Article) => Article?.id !== article?.id);

  //Article Data
  const Title = article?.attributes?.title;
  const Slug = article?.attributes?.slug;

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: false,
    infinite: true,
    centerPadding: "0px",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Layout
      title={article?.attributes?.title || "Page Not Found!"}
      desc={
        article?.attributes?.seo?.metaDescription ||
        article?.attributes?.description ||
        "This page does not exist yet."
      }
      keywords={
        article?.attributes?.seo?.keywords ||
        article?.attributes?.keywords ||
        "vland, magazine, article, vegan, v-land, uk, brazil, veggy"
      }
      image={
        article?.attributes?.seo?.metaImge?.data?.attributes?.url ||
        article?.attributes?.media?.data[0]?.attributes?.formats?.medium?.url
      }
      metaTitle={
        article?.attributes?.seo ? article?.attributes?.seo?.metaTitle : ""
      }
      metaDescription={
        article?.attributes?.seo
          ? article?.attributes?.seo?.metaDescription
          : ""
      }
      canonicalUrl={
        article?.attributes?.seo ? article?.attributes?.seo?.canonicalURL : null
      }
    >
      <div className="w-[94%] lg:w-4/5 2xl:w-3/4 mx-auto mt-[17vh] lg:mt-[18vh]">
        <Back />
        {article ? (
          <main className="grid grid-cols-1 gap-0 lg:grid-cols-12 lg:gap-5">
            <section className="lg:col-span-12">
              {/* IMAGE & CATEGORIES */}
              <div className="relative w-full max-w-full aspect-square lg:h-[40vh] rounded-2xl mt-4 mb-4 lg:mb-8  overflow-hidden">
                <img
                  src={
                    article?.attributes?.media?.data[0]?.attributes?.formats
                      ?.large?.url ||
                    article?.attributes?.media?.data[0]?.attributes?.formats
                      ?.medium?.url ||
                    article?.attributes?.media?.data[0]?.attributes?.formats
                      ?.small?.url ||
                    article?.attributes?.media?.data[0]?.attributes?.formats
                      ?.thumbnail?.url ||
                    article?.attributes?.media?.data[0]?.attributes?.url ||
                    "/Placeholder.png"
                  }
                  alt={
                    article?.attributes?.media?.data[0]?.attributes
                      ?.alternativeText || "Blog image"
                  }
                  className="min-w-full w-full h-full object-cover"
                />
                {/* CATEGORIES */}
                <div className="absolute flex flex-wrap gap-2 bottom-3 w-[50%] right-0 left-3">
                  {article?.attributes?.categories?.data?.length > 0 &&
                    article?.attributes?.categories?.data?.map(
                      (category, current) => (
                        <p
                          key={current}
                          className={`text-[11px] lg:text-[12px] font-bold  px-2 py-1 rounded-2xl drop-shadow-md cursor-pointer hover:bg-white hover:text-primary hover:scale-95 transition-all tag ${
                            category.attributes.name.toLowerCase() ===
                            "sponsored"
                              ? "text-white bg-primary"
                              : "text-white bg-primary"
                          }`}
                          onClick={() =>
                            router.push(`/category/${category.attributes.slug}`)
                          }
                        >
                          {category.attributes.name}
                        </p>
                      )
                    )}
                </div>
                <a
                  href={article?.attributes?.FeaturedURL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="max-w-[48%] absolute bottom-3 right-2 text-white bg-white bg-opacity-10 backdrop-blur-lg font-semibold text-[11px] py-2 px-5 rounded-3xl drop-shadow-sm hover:scale-95 hover:-translate-y-1 transition-all">
                    {article?.attributes?.FeaturedText}
                  </div>
                </a>
              </div>

              {/* AUTHOR AND DATE */}
              <div className="flex items-center gap-x-2 px-2 my-4">
                <img
                  src={
                    findUserByID(article?.attributes?.author?.data?.id)
                      ?.attributes?.image?.data?.attributes?.formats?.small
                      ?.url ||
                    findUserByID(article?.attributes?.author?.data?.id)
                      ?.attributes?.image?.data?.attributes?.url ||
                    "/User.svg"
                  }
                  alt="Author"
                  className="w-11 aspect-square object-cover rounded-full"
                  loading="lazy"
                />
                <div className="flex flex-col gap-y-[1px]">
                  <p className="text-sm font-semibold">
                    {findUserByID(article?.attributes?.author?.data?.id)
                      ?.attributes?.fullname || "V-Land UK"}
                  </p>
                  {article?.attributes?.publishedAt && (
                    <Moment
                      format="MMM Do YYYY"
                      className="text-[11px] font-normal poppins"
                    >
                      {article?.attributes?.PublishDate}
                    </Moment>
                  )}
                </div>
              </div>

              {/* ARTICLE TITLE */}
              <h1 className="text-primary font-[900] text-2xl lg:text-4xl mt-2 lg:mt-3 mb-0 px-2">
                {article?.attributes?.title}
              </h1>

              {/* <ReactMarkdown className="text-base lg:text-lg article-preview mt-3 lg:mt-4 mb-5 whitespace-pre-line"> */}
              <div className="text-base pt-3 lg:text-lg article-preview mt-3 lg:mt-4 mb-5 whitespace-pre-line">
                {parse(article?.attributes?.content)}
              </div>
              {/* {article?.attributes?.content} */}
              {/* </ReactMarkdown> */}

              {/* ARTICLE COMMENTS */}
              {/* <CommentsArea id={article?.id} /> */}
              {/* COMMENTS POSTING SECTION */}
              {/* <CommentForm
              id={article.id}
              slug={article.attributes.slug}
              setComments={setComments}
            /> */}

              {/* SHARE */}
              <AnimateSharedLayout>
                <motion.div
                  layout
                  transition={{ duration: 0.2 }}
                  className="fixed bottom-[10vh] lg:bottom-[15vh] right-2 flex flex-col-reverse gap-8 bg-primary text-white bg-opacity-[0.8] rounded-xl py-7 px-4 z-[99]"
                >
                  <div onClick={() => setShareState((current) => !current)}>
                    {!ShareState ? (
                      <RiShareBoxFill size={18} />
                    ) : (
                      <BiDotsHorizontalRounded />
                    )}
                  </div>
                  <AnimatePresence>
                    {ShareState && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -50,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          height: "100%",
                        }}
                        exit={{
                          opacity: 0,
                          y: -50,
                          height: 0,
                        }}
                        transition={{ duration: 0.2 }}
                        layout
                        className="flex flex-col gap-8"
                      >
                        <FacebookShareButton
                          url={`${SITE_URL}/article/${Slug}`}
                          quote={Title}
                        >
                          <FaFacebookF size={18} />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={`${SITE_URL}/article/${Slug}`}
                          title={Title}
                          related={[
                            "v-land",
                            "vegan",
                            "UK",
                            "v-land uk",
                            "magazine",
                          ]}
                        >
                          <FaTwitter size={18} />
                        </TwitterShareButton>
                        <LinkedinShareButton
                          title={Title}
                          url={`${SITE_URL}/article/${Slug}`}
                        >
                          <FaLinkedin size={18} />
                        </LinkedinShareButton>
                        <WhatsappShareButton
                          url={`${SITE_URL}/article/${Slug}`}
                          title={Title}
                          separator=" - "
                        >
                          <FaWhatsapp size={18} />
                        </WhatsappShareButton>
                        <TelegramShareButton
                          url={`${SITE_URL}/article/${Slug}`}
                          title={Title}
                        >
                          <FaTelegramPlane size={18} />
                        </TelegramShareButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimateSharedLayout>
            </section>
            <section className="col-span-12">
              <h1 className="text-2xl lg:text-3xl text-primary text-center font-[800] mt-2 px-2">
                Read More
              </h1>
              <div className=" grid grid-cols-1 lg:grid-cols-1 mt-4 gap-3 lg:gap-0  px-2 pb-5">
                <Slider {...settings}>
                  {Others.slice(0, 6).map((current, index) => (
                    <Recommendation key={index} article={current} />
                  ))}
                </Slider>
              </div>
            </section>
          </main>
        ) : (
          <div className="h-[50vh] w-full flex flex-col items-center justify-center">
            <h1 className="text-[5rem] lg:text-[9rem] text-red-500">404</h1>
            <h2 className="text-sm font-medium poppins">
              Oops. Page not found!
            </h2>
          </div>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const { data } = await request.get(`/articles`);
  const articles = data.data;
  const paths = articles.map((current) => ({
    params: { slug: current.attributes.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, preview = null }) {
  const { slug } = params;

  const filter = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: "*",
  });

  // const query = await fetch(`${API}/articles?${filter}`);
  // const data = await query.json();

  const { data } = preview
    ? await request.get(`/articles?${filter}&publicationState=preview`)
    : await request.get(`/articles?${filter}`);

  // return {
  //   props: {
  //     props: {
  //       article: data?.data[0] || null,
  //     },
  //     revalidate: 10, // In seconds
  //   },
  // };

  if (data?.data?.length > 0) {
    return {
      props: {
        article: data?.data[0],
      },
      revalidate: 10, // In seconds
    };
  } else {
    return {
      props: {
        article: null,
        meta: null,
      },
      revalidate: 10, // In seconds
    };
  }
}

export default Article;
