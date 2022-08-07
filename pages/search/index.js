import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";
import ArticleCard from "../../components/ArticleCard";
import Layout from "../../defaults/Layout";
const qs = require("qs");
import { PAGINATION_LIMIT } from "../../config/meta";
import Back from "../../components/Back";
import { BiSearch } from "react-icons/bi";
import Loader from "../../components/Loader";
import request from "../../utils/request.util";

const Search = () => {
  const router = useRouter();
  const [All, setAll] = useState([]);
  const [Results, setResults] = useState([]);
  const [Meta, setMeta] = useState({});
  const [stringQuery, setStringQuery] = useState("");
  const [Loading, setLoading] = useState(false);

  //  Get query from router
  const { query } = router;
  const { q, page } = query;

  //  Stringify query
  const { q: string } = qs.parse(query);

  //  Search function
  const searchFunc = () => {
    ///// Live Search From Strapi /////
    const filters = qs.stringify(
      {
        populate: "*",
        filters: {
          $or: [
            {
              title: {
                $contains: q,
              },
            },
            {
              content: {
                $contains: q,
              },
            },
            {
              description: {
                $contains: q,
              },
            },
          ],
        },
        pagination: {
          pageSize: PAGINATION_LIMIT,
          page: page || "1",
        },
        sort: ["PublishDate:desc"],
      },
      {
        encodeValuesOnly: true,
      }
    );

    if (q) {
      setLoading(true);

      request
        .get(`/articles?${filters}`)
        .then(({ data }) => {
          setResults(data?.data);
          setMeta(data?.meta);
          // console.log(data?.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  //Handle query change
  const handleChange = (e) => {
    const queryFilter = qs.stringify({ q: e.target.value, page: "1" });

    router.replace({
      pathname: "/search",
      query: queryFilter,
    });
    ///// Live Search From Strapi /////
    searchFunc();
  };

  //   If query changes
  useEffect(() => {
    setStringQuery(string);
  }, [q]);

  //   On page load
  useEffect(() => {
    searchFunc();
  }, []);

  return (
    <Layout>
      <div className="flex flex-row-reverse border-[1px] border-primary justify-between rounded-3xl overflow-hidden px-1 py-1 mb-3">
        <input
          name="SearchText"
          type="text"
          placeholder="Search anything..."
          className="w-full px-3 py-1 text-[16px] placeholder-neutral-300 text-neutral-800 focus:outline-none"
          value={stringQuery}
          onChange={handleChange}
        />
        <div className="text-primary h-auto aspect-square p-2 rounded-full">
          <BiSearch size={20} />
        </div>
      </div>
      <h3 className="text-xs poppins px-1 pb-3">
        Showing results for{" "}
        <span className="text-primary font-semibold underline">
          {stringQuery?.toLowerCase()}
        </span>
      </h3>
      {Loading ? (
        <Loader />
      ) : (
        <>
          {Results.length > 0 && q ? (
            <>
              <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5 lg:gap-y-6">
                {Results.map((article, index) => (
                  <ArticleCard article={article} key={index} />
                ))}
              </div>

              <Pagination meta={Meta} min={3} prefix={`search?q=${q}&`} />
            </>
          ) : (
            <>
              <Back />
              {q ? (
                <div className="text-center text-xs my-[20vh] poppins">
                  No results found!
                </div>
              ) : (
                <div className="text-center text-xs my-[20vh] poppins">
                  You haven&apos;t searched for anything yet!
                </div>
              )}
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default Search;
