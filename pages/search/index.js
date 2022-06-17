import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";
import ArticleCard from "../../components/ArticleCard";
import Layout from "../../defaults/Layout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const qs = require("qs");
import { API } from "../../config/api";
import { PAGINATION_LIMIT } from "../../config/meta";
import Back from "../../components/Back";
import { BiSearch } from "react-icons/bi";
import { Result } from "postcss";
import Loader from "../../components/Loader";
import Recommendation from "../../components/Recommendation";

const Search = () => {
  const router = useRouter();
  const [All, setAll] = useState([]);
  const [Results, setResults] = useState([]);
  const [Meta, setMeta] = useState({});
  const [stringQuery, setStringQuery] = useState("");
  const [Loading, setLoading] = useState(false);

  //Get query from router
  const { query } = router;
  const { q, page } = query;

  //Stringify query
  const { q: string } = qs.parse(query);

  //Handle query change
  const handleChange = (e) => {
    const queryFilter = qs.stringify({ q: e.target.value, page: "1" });

    router.replace({
      pathname: "/search",
      query: queryFilter,
    });

    //Filters
    const filters = `filters[$or][0][description][$containsi]=${q}&filters[$or][1][content][$containsi]=${q}&filters[$or][2][title][$containsi]=${q}&populate=*&pagination[pageSize]=${PAGINATION_LIMIT}&pagination[page]=${
      page || "1"
    }`;

    //Set loading state to true
    setLoading(true);

    axios
      .get(`${API}/articles?${filters}`)
      .then((res) => {
        // console.log("lOading");
        setResults(res.data.data);
        console.log(res.data.meta);
        setMeta(res.data.meta);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong", options);
      });
  };

  //Toast options
  const options = {
    position: "top-right",
    autoClose: 4000,
    draggable: true,
    pauseOnHover: true,
    closeOnClick: true,
  };

  //   //If query changes
  useEffect(() => {
    setStringQuery(string);
  }, [q]);

  useEffect(() => {
    //Get data for external query
    //Filters
    const filters = `filters[$or][0][description][$containsi]=${q}&filters[$or][1][content][$containsi]=${q}&filters[$or][2][title][$containsi]=${q}&populate=*&pagination[pageSize]=${PAGINATION_LIMIT}&pagination[page]=${
      page || "1"
    }`;

    //Set loading state to true
    setLoading(true);

    axios
      .get(`${API}/articles?${filters}`)
      .then((res) => {
        // console.log("lOading");
        setResults(res.data.data);
        console.log(res.data.meta);
        setMeta(res.data.meta);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong", options);
      });
  }, []);

  //Sort articles that match query
  //   useEffect(() => {
  //     if (q) {
  //       const filtered = All.filter((article) => {
  //         if (
  //           article.attributes.title.toLowerCase().includes(q.toLowerCase()) ||
  //           article.attributes.content.toLowerCase().includes(q.toLowerCase()) ||
  //           article.attributes.description.toLowerCase().includes(q.toLowerCase())
  //         ) {
  //           return true;
  //         }
  //       });
  //       setResults(filtered);
  //       //   console.log(filtered);
  //     }
  //   }, [All, q, page]);

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
                  <Recommendation article={article} key={index} />
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
      <ToastContainer />
    </Layout>
  );
};

export default Search;
