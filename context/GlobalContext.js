import axios from "axios";
const qs = require("qs");
import { createContext, useEffect, useState } from "react";
import { API } from "../config/api";
import { PAGINATION_LIMIT } from "../config/meta";
const GlobalContext = createContext(null);
const { Provider } = GlobalContext;

const GlobalProvider = ({ children }) => {
  const [Authors, setAuthors] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Articles, setArticles] = useState([]);
  const [Status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    text: "",
  });

  //Get Articles again
  useEffect(() => {
    if (Articles.length < 1) {
      const filters = qs.stringify({
        populate: "*",
        pagination: {
          pageSize: PAGINATION_LIMIT,
        },
      });

      axios
        .get(`${API}/articles?${filters}`)
        .then(({ data }) => {
          setArticles(data?.data);
          // console.log(res);
        })
        .catch((err) => {
          setStatus((prev) => {
            return { ...prev, error: true };
          });
        });
    }

    if (Categories.length < 1) {
      axios
        .get(`${API}/categories?populate=*`)
        .then(({ data }) => {
          setCategories(data?.data);
        })
        .catch((err) => {
          setStatus((prev) => {
            return { ...prev, error: true };
          });
        });
    }
  }, [Categories.length, Categories, Articles.length, Articles]);

  //Get all authors
  useEffect(() => {
    if (Authors.length < 1) {
      axios
        .get(`${API}/authors?populate=*`)
        .then((response) => {
          setAuthors(response.data.data);
        })
        .catch((err) => {
          setStatus((prev) => {
            return { ...prev, error: true };
          });
        });
    }
  }, [Authors.length, Authors]);

  //Find a user by ID
  const findUserByID = (id) => {
    const author = Authors?.filter(
      (user) => parseInt(user?.id) === parseInt(id)
    );
    return author[0];
  };

  return (
    <Provider
      value={{
        Authors,
        Categories,
        Status,
        Articles,
        setArticles,
        setStatus,
        setAuthors,
        setCategories,
        findUserByID,
      }}
    >
      {children}
    </Provider>
  );
};

export { GlobalProvider, GlobalContext };
