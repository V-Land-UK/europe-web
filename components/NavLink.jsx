import Link from "next/link";
import React from "react";

const NavLink = ({ children, link }) => {
  return (
    <Link href={link} passHref>
      <a className="no-underline w-auto flex-shrink-0 text-xs lg:text-sm text-black font-bold px-4 py-[4px] bg-white rounded-2xl hover:scale-90 hover:bg-primary hover:text-white transition-all cursor-pointer poppins shadow-sm">
        
        {children}
      </a>
    </Link>
  );
  // border-[1.5px] border-primary
};

export default NavLink;
