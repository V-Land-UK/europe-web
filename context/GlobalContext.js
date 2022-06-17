import axios from "axios";
const qs = require("qs");
import { createContext, useEffect, useState } from "react";
import { API } from "../config/api";
import { PAGINATION_LIMIT } from "../config/meta";
const GlobalContext = createContext(null);
const { Provider } = GlobalContext;

const GlobalProvider = ({ children }) => {
  const [Authors, setAuthors] = useState([]);
  const [Articles, setArticles] = useState([]);
  const [Status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    text: "",
  });

  //Get Articles again
  useEffect(() => {
    if (Articles.length == 0) {
      const filters = qs.stringify({
        populate: "*",
        pagination: {
          pageSize: PAGINATION_LIMIT,
        },
      });

      axios
        .get(`${API}/articles?${filters}`)
        .then((res) => {
          setArticles(res.data.data);
          // console.log(res.data.data);
        })
        .catch((err) => {
          setStatus((prev) => {
            return { ...prev, error: true };
          });
        });
    }
  }, [Articles.length, Articles]);

  //Get all authors
  if (Authors.length == 0) {
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
        Status,
        Articles,
        setArticles,
        setStatus,
        setAuthors,
        findUserByID,
      }}
    >
      {children}
    </Provider>
  );
};

export { GlobalProvider, GlobalContext };
