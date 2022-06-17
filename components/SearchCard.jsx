/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/router";
const qs = require("qs");

const SearchCard = ({ Query, setQuery }) => {
  const router = useRouter();
  const { Articles } = useContext(GlobalContext);
  const [Result, setResult] = useState([]);

  useEffect(() => {
    if (Query) {
      const filtered = Articles.filter((article) => {
        if (
          article.attributes.title
            .toLowerCase()
            .includes(Query.toLowerCase()) ||
          article.attributes.content
            .toLowerCase()
            .includes(Query.toLowerCase()) ||
          article.attributes.description
            .toLowerCase()
            .includes(Query.toLowerCase())
        ) {
          return true;
        }
      });
      setResult(filtered);
      //   console.log(filtered);
    }
  }, [Query]);

  //Search query
  const searchQuery = qs.stringify({
    q: Query,
  });
  const searchLink = `/search?${searchQuery}`;

  return (
    <AnimatePresence>
      {Query && (
        <>
          <div className="w-screen h-screen fixed top-0 right-0 left-0 bg-neutral-800 bg-opacity-50"></div>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className="w-3/6 mx-auto fixed bg-white drop-shadow-lg py-8 px-10 rounded-2xl top-[12vh] right-0 left-0 z-[75]"
          >
            <h1 className="text-3xl px-1">Search</h1>
            <div className="hidden lg:flex lg:flex-row-reverse w-full border-[1px] border-primary justify-between rounded-3xl overflow-hidden px-1 py-1 my-3">
              <input
                name="SearchText"
                type="text"
                placeholder="Search anything..."
                className="w-full px-3 py-1 text-[16px] placeholder-neutral-300 text-neutral-800 focus:outline-none"
                autoFocus
                value={Query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="text-primary h-auto aspect-square p-2 rounded-full">
                <BiSearch size={20} />
              </div>
            </div>

            <h3 className="text-xs poppins px-1 mt-2 pb-2">
              Showing results for{" "}
              <span className="text-primary font-semibold underline">
                {Query.toLowerCase()}
              </span>
            </h3>
            <div className="max-h-[45vh] overflow-y-scroll pt-2 pb-3 px-1">
              {Result.length === 0 ? (
                <h3 className="text-center text-neutral-500 font-medium text-sm poppins my-10">
                  No results
                </h3>
              ) : (
                Result.map((article, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center hover:bg-primary hover:bg-opacity-5  cursor-pointer rounded-xl py-2 px-2"
                    onClick={() => {
                      router.push(`/article/${article.attributes.slug}`);
                      setQuery("");
                    }}
                  >
                    <div className="flex items-center gap-x-4">
                      <img
                        src={`${
                          article.attributes?.media?.data[0]?.attributes
                            ?.formats?.medium?.url || "/Placeholder.png"
                        }`}
                        className="w-20 aspect-square object-cover rounded-lg"
                        alt={`${
                          article.attributes?.media?.data[0]?.attributes
                            ?.alternativeText ||
                          article?.attributes?.title ||
                          ""
                        }`}
                      />
                      <div className="flex flex-col gap-[2px]">
                        <h1 className="text-3xl text-primary">
                          {" "}
                          {article.attributes.title}
                        </h1>
                        <p className="text-neutral-400 poppins text-xs">
                          {article.attributes.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-primary w-max bg-primary bg-opacity-10 rounded-full p-1 mx-3">
                      <FiChevronRight />
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchCard;
