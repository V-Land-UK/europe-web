import { useRouter } from "next/router";
import { IoMdArrowRoundBack } from "react-icons/io";

const Back = () => {
  const router = useRouter();
  return (
    <div
      className="w-min flex items-center text-neutral-800 text-sm hover:bg-primary hover:text-white transition-all cursor-pointer rounded-3xl space-x-1 py-1 px-2"
      onClick={() => router.back()}
    >
      <IoMdArrowRoundBack />
      <div>Back</div>
    </div>
  );
};

export default Back;
