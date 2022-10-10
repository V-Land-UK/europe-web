/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Image from "next/image";

const Ads = ({ ad }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`relative w-full flex flex-col  adCard__${ad?.attributes?.size} items-center justify-center hover:scale-[0.98] transition-all rounded-2xl overflow-hidden`}
      >
        <p className="absolute bottom-2 left-2 bg-green-800 text-white text-[10px] font-bold rounded-2xl px-3 py-1 drop-shadow-sm tag">
          Advertisement
        </p>
        <a
          href={ad?.attributes?.url}
          target="_blank"
          rel="noreferrer"
          className="relative h-full w-full"
        >
          <Image
            blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8e+rUUwAIFQNIlnFEqgAAAABJRU5ErkJggg=="
            placeholder="blur"
            src={
              ad?.attributes?.image?.data?.attributes?.formats?.medium?.url ||
              ad?.attributes?.image?.data?.attributes?.formats?.large?.url ||
              ad?.attributes?.image?.data?.attributes?.formats?.small?.url ||
              ad?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url
            }
            alt={ad?.attributes?.name || "Advertisement"}
            layout='fill'
            objectFit="cover"
            
          />
        </a>
      </motion.div>
    </>
  );
};

export default Ads;
