/* eslint-disable @next/next/no-img-element */
// import { useContext, useEffect } from "react";
import Layout from "../../defaults/Layout";
import ArticleCard from "../../components/ArticleCard";
import Pagination from "../../components/Pagination";
import { API } from "../../config/api";
import { PAGINATION_LIMIT } from "../../config/meta";
const qs = require("qs");

export default function ArticlesPage({ articles, meta }) {
  return (
    <Layout title="Articles">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5 lg:gap-y-6">
        {articles.map((article, index) => (
          <ArticleCard article={article} key={index} />
        ))}
      </div>
      <Pagination meta={meta} min={3} prefix="articles?" />
    </Layout>
  );
}

export async function getServerSideProps({ req, res, query }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const { page } = query;

  //Get data for articles
  const filters = qs.stringify(
    {
      populate: "*",
      pagination: {
        pageSize: PAGINATION_LIMIT,
        page: page || "1",
      },
      // sort: ["publishedAt:desc"],
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(`${API}/articles?${filters}`);
  const data = await response.json();

  //Only show past and current posts
  const visible_articles = data?.data?.filter((article) => {
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
    },
  };
}
