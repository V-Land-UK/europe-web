/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, Fragment } from "react";
import Layout from "../defaults/Layout";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import { GlobalContext } from "../context/GlobalContext";
import { API } from "../config/api";
import { PAGINATION_LIMIT } from "../config/meta";
import Ads from "../components/Ads";
const qs = require("qs");

export default function Home({ articles, meta, ads }) {
  const { setArticles } = useContext(GlobalContext);
  useEffect(() => {
    setArticles(articles);
  }, []);

  const articlesBeforeAd = 15;

  const checkAds = (index) => {
    if (ads[(index + 1) / articlesBeforeAd - 1] !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const getAdsIndex = (index) => {
    return (index + 1) / articlesBeforeAd - 1;
  };

  return (
    <Layout>
      {articles.length > 0 ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px] lg:gap-5 lg:gap-y-6">
            {articles?.map((article, index) => (
              <Fragment key={index}>
                <ArticleCard article={article} index={index} />
                {/* Show Ads */}
                {ads.length > 0 && checkAds(index) && (
                  <Ads
                    ad={ads[getAdsIndex(index)]}
                    hey={ads[getAdsIndex(index)]}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <Pagination meta={meta} min={3} prefix="articles?" />
        </>
      ) : (
        <div className="py-[10vh] lg:py-[15vh] text-center text-primary text-3xl lg:text-4xl font-semibold px-6">
          No Articles Yet.
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res, query }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=15, stale-while-revalidate=59"
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

  // get ads
  const adsResponse = await fetch(`${API}/ads?populate=*`);
  const ads = await adsResponse?.json();

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
      ads: ads?.data,
    },
  };
}
