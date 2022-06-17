import axios from "axios";
import { useEffect, useState } from "react";
import { FaTruckMonster } from "react-icons/fa";
import Moment from "react-moment";
import { API } from "../config/api";
import Loader from "./Loader";
const qs = require("qs");

const CommentsArea = ({ id }) => {
  const [Local, setLocal] = useState([]);
  const [Loading, setLoading] = useState(FaTruckMonster);

  const filter = qs.stringify({
    filters: {
      articleId: {
        $eq: id,
      },
    },
    populate: "*",
  });

  useEffect(() => {
    const url = `${API}/feedbacks?${filter}`;
    axios
      .get(url)
      .then((res) => {
        setLocal(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  return (
    <section className="px-2 lg:pb-3">
      <h1 className="text-3xl lg:text-4xl">Comments</h1>
      {!Loading ? (
        <div className="w-full mt-2 lg:mt-3">
          {Local.length < 1 ? (
            <div className="text-primary text-opacity-60 text-xs text-center poppins mt-6 mb-8">
              No comments.
            </div>
          ) : (
            Local.map((comment, index) => (
              <div
                key={index}
                className="bg-primary bg-opacity-[0.05] py-4 px-5 mb-2 lg:mb-3 rounded-lg"
              >
                <div className="flex gap-x-1">
                  <p className="text-xs tracking-wide">
                    {comment?.attributes?.name}
                  </p>
                  <Moment
                    format="MMM Do YYYY"
                    className="text-[10px] text-primary text-opacity-70 poppins"
                  >
                    {comment?.attributes?.createdAt || Date.now()}
                  </Moment>
                </div>
                <p className="text-primary text-[12px] lg:text-sm poppins tracking-wide leading-normal mt-2 mb-0">
                  {comment?.attributes?.comment}
                </p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="my-4">
          <Loader type="normal" />
        </div>
      )}
    </section>
  );
};

export default CommentsArea;
