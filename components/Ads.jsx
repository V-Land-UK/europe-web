/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";

const Ads = ({ ad }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="relative w-full flex flex-col items-center justify-center hover:scale-[0.98] transition-all rounded-2xl overflow-hidden"
      >
        <p className="absolute bottom-2 left-2 bg-green-800 text-white text-[10px] font-semibold rounded-2xl px-3 py-1 drop-shadow-sm">
          Advertisement
        </p>
        <a
          href={ad?.attributes?.url}
          target="_blank"
          rel="noreferrer"
          className="h-full w-full"
        >
          <img
            src={
              ad?.attributes?.image?.data?.attributes?.formats?.medium?.url ||
              ad?.attributes?.image?.data?.attributes?.formats?.large?.url ||
              ad?.attributes?.image?.data?.attributes?.formats?.small?.url ||
              ad?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url
            }
            alt={ad?.attributes?.name || "Advertisement"}
            className="w-full min-w-full max-h-full h-full object-cover"
          />
        </a>
      </motion.div>
    </>
  );
};

export default Ads;
