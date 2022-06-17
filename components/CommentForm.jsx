import { useState } from "react";
import axios from "axios";
import { API } from "../config/api";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";

const CommentForm = ({ id, slug, setComments }) => {
  const [Data, setData] = useState({
    email: "",
    name: "",
    comment: "",
  });
  const [Loading, setLoading] = useState(false);

  //Input change handler
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  //Toast options
  const options = {
    position: "top-right",
    autoClose: 4000,
    draggable: true,
    pauseOnHover: true,
    closeOnClick: true,
  };

  //Handle form submission
  const formHandler = (e) => {
    e.preventDefault();

    const url = `${API}/feedbacks`; //Feedback url

    //Feedback data to be sent
    const data = {
      data: {
        email: Data.email,
        name: Data?.name || "Anonymous",
        comment: Data.comment,
        articleId: id,
        articleSlug: slug,
      },
    };

    //Make API call to back-end
    setLoading(true); //set loading to true
    axios
      .post(url, data)
      .then((res) => {
        setLoading(false); //Stop loading
        setComments((prev) => [...prev, res.data.data]); //Add to the comments array
        setData({ email: "", name: "", comment: "" }); //Reset the state
        toast.success("Comment added successfully", options); //Show toast
      })
      .catch((err) => {
        setLoading(false); //Stop loading
        toast.error("Something went wrong", options); //Show error toast
      });
  };

  //Input style
  const inputStyle =
    "w-full px-4 py-4 mb-4 text-xs lg:text-sm leading-tight text-primary placeholder-neutral-300 border-2 border-primary border-opacity-30 rounded-lg focus:outline-none focus:border-opacity-100 transition-all";

  return (
    <main className="px-2 mt-3 mb-6">
      <h1 className="text-2xl lg:text-4xl">What do you think?</h1>
      {/* <h3 className="text-[11px] text-primary poppins pt-2">
        Let other readers know what you think about this topic or article.
      </h3> */}
      <form onSubmit={formHandler} className="mt-4 lg:mt-6">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-3">
          <input
            type="text"
            name="name"
            className={inputStyle}
            placeholder="Your name"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className={inputStyle}
            placeholder="Email Address"
            onChange={handleChange}
          />
        </div>
        <textarea
          name="comment"
          placeholder="I think this is a great article!"
          rows="8"
          required
          className={`${inputStyle} resize-none`}
          onChange={handleChange}
        ></textarea>
        <button
          className="w-full py-3 bg-primary text-white hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all  rounded-lg"
          disabled={Loading}
          type="submit"
        >
          {!Loading ? "Submit" : <Loader />}
        </button>
      </form>
      <ToastContainer />
    </main>
  );
};

export default CommentForm;
