import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const Pagination = ({ meta, min, prefix }) => {
  const router = useRouter();

  //Page count array
  const pageArray = [];
  for (var i = 1; i <= meta.pagination.pageCount; i++) {
    pageArray.push(i);
  }

  //Page navigation url and data
  var metaLink = `/${prefix}page=`;
  const { query: currentRoute } = router;

  //Default style
  const defaultStyle =
    "w-7 aspect-square flex items-center justify-center drop-shadow-sm font-medium text-xs poppins rounded-md cursor-pointer";

  return (
    <>
      {meta?.pagination?.pageCount > 1 && (
        <div className="flex items-center justify-center gap-3 py-1 mt-10 lg:mt-16">
          {parseInt(currentRoute?.page) > parseInt(pageArray[0]) && (
            <Link href={metaLink + (parseInt(currentRoute?.page) - 1)} passHref>
              <div>
                <HiOutlineChevronLeft />
              </div>
            </Link>
          )}
          {pageArray.length > parseInt(min) ? (
            <>
              {pageArray.splice(0, min).map((page, index) => (
                <Link key={index} href={metaLink + page} passHref>
                  <div
                    className={`w-7 aspect-square flex items-center justify-center  drop-shadow-sm font-medium text-xs poppins rounded-md cursor-pointer ${
                      currentRoute?.page == parseInt(page)
                        ? "border-[1px] border-primary text-primary bg-green-50 bg-opacity-30"
                        : "bg-white"
                    }`}
                  >
                    {page}
                  </div>
                </Link>
              ))}

              <div className="text-xs poppins tracking-wide">...</div>
              <Link href={metaLink + pageArray[pageArray.length - 1]} passHref>
                <div
                  className={`${defaultStyle} ${
                    currentRoute?.page == pageArray[pageArray.length - 1]
                      ? "border-[1px] border-primary text-primary bg-green-50 bg-opacity-30"
                      : "bg-white"
                  }`}
                >
                  {pageArray[pageArray.length - 1]}
                </div>
              </Link>
            </>
          ) : (
            pageArray.map((page, index) => (
              <Link key={index} href={metaLink + page} passHref>
                <div
                  className={`w-7 aspect-square flex items-center justify-center  drop-shadow-sm font-medium text-xs poppins rounded-md cursor-pointer ${
                    currentRoute?.page == page
                      ? "border-[1px] border-primary text-primary bg-green-50 bg-opacity-30"
                      : "bg-white"
                  }`}
                >
                  {page}
                </div>
              </Link>
            ))
          )}
          {parseInt(currentRoute?.page) <
            parseInt(pageArray[pageArray.length - 1]) && (
            <Link href={metaLink + (parseInt(currentRoute?.page) + 1)} passHref>
              <div>
                <HiOutlineChevronRight />
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

Pagination.defaultProps = {
  min: 3,
  prefix: "",
};

export default Pagination;
