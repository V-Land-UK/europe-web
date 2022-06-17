/* eslint-disable @next/next/no-img-element */
// import { useContext, useEffect } from "react";
import Layout from "../../defaults/Layout";
import ArticleCard from "../../components/ArticleCard";
import Pagination from "../../components/Pagination";
import { API } from "../../config/api";
import { PAGINATION_LIMIT } from "../../config/meta";
const qs = require("qs");

export default function Categories({ articles, meta, category }) {
  const Title =
    category?.charAt(0).toUpperCase() + category?.slice(1) ||
    "Category Not Found";

  return (
    <Layout title={Title}>
      {articles ? (
        <>
          {/* <h1 className="text-3xl lg:text-5xl mb-4 lg:mb-5">{Title}</h1> */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5 lg:gap-y-6">
            {articles.map((article, index) => (
              <ArticleCard article={article} key={index} />
            ))}
          </div>
          {/* <Pagination meta={meta} min={3} prefix="articles?" /> */}
        </>
      ) : (
        <div className="h-[50vh] w-full flex flex-col items-center justify-center">
          <img
            src="/404.png"
            alt="Page Not Found"
            className="w-[85vw] lg:w-2/5 object-contain"
          />
          <h2 className="text-sm text-red-500 font-semibold poppins">
            Oops. No articles yet!
          </h2>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res, query, params }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const { page = "1" } = query;
  const { cat } = params;

  const response = await fetch(
    `${API}/categories?filters[slug][$eq]=${cat}&pagination[pageSize]=${PAGINATION_LIMIT}&pagination[page]=${page}&populate=*`
  );
  const data = await response.json();

  //Get data for users

  if (data?.data[0]?.attributes?.articles?.data?.length > 0) {
    const articles = [];

    // Fetch the articles themselves
    for (var i = 0; i < data.data[0].attributes.articles.data.length; i++) {
      const getEach = await fetch(
        `${API}/articles/${data.data[0].attributes.articles.data[i].id}?populate=*`
      );
      const article = await getEach.json();
      articles.push(article.data);
    }

    //Only show past and current posts
    const visible_articles = articles.filter((article) => {
      const publishedDate = new Date(article?.attributes?.PublishDate);
      const currentDate = new Date();
      return publishedDate <= currentDate;
    });

    //Sort articles by published date
    const sorted_articles = visible_articles?.sort((a, b) => {
      const dateA = new Date(a?.attributes?.PublishDate);
      const dateB = new Date(b?.attributes?.PublishDate);
      return dateB - dateA;
    });

    return {
      props: {
        articles: sorted_articles,
        meta: data?.meta,
        category: data?.data[0]?.attributes?.name || cat,
      },
    };
  } else {
    return {
      props: {
        article: null,
        meta: null,
      },
    };
  }
}
