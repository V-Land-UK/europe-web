import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const NavMenu = () => {
  const [Open, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen(!Open);
  };
  return (
    <div className="relative">
      <button
        type="button"
        name="Menu"
        className="text-primary flex items-center text-sm font-semibold focus:outline-none"
        onMouseOver={clickHandler}
      >
        <div>Menu</div>
        <BiChevronDown size="23" />
      </button>
      <AnimatePresence>
        {Open && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className="absolute w-max grid grid-cols-2 gap-10 z-[60] top-8 left-0 bg-white drop-shadow-md py-8 px-14 rounded-xl poppins"
            onMouseOver={() => setOpen(true)}
            onMouseOut={() => setOpen(false)}
          >
            <section>
              <div className="nav-menu-link">
                <Link href="/">Home</Link>
              </div>
              <div className="nav-menu-link">
                <Link href="/team">Team</Link>
              </div>
              {/* <div className="nav-menu-link">
                <Link href="/join-us">Join Us</Link>
              </div> */}
            </section>
            <section>
              <div className="nav-menu-link">
                <Link href="/about">About</Link>
              </div>
              <div className="nav-menu-link">
                <Link href="/contact">Contact</Link>
              </div>
            </section>
            <section className="col-span-2">
              <div className="grid grid-cols-4 h-min gap-4 mt-3 cursor-pointer">
                <div className="w-min aspect-square p-2 text-white bg-primary hover:scale-95 rounded-full transition-all">
                  <a
                    href="http://instagram.com/vlanduk"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FaInstagram size={15} />
                  </a>
                </div>
                <div className="w-min aspect-square p-2 text-white bg-primary hover:scale-95 rounded-full transition-all">
                  <a
                    href="https://www.facebook.com/V-Land-UK-100137252369546"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FaFacebookF size={15} />
                  </a>
                </div>
                <div className="w-min aspect-square p-2 text-white bg-primary hover:scale-95 rounded-full transition-all">
                  <a
                    href="https://twitter.com/vlandukmag"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FaTwitter size={15} />
                  </a>
                </div>
                <div className="w-min aspect-square p-2 text-white bg-primary hover:scale-95 rounded-full transition-all">
                  <a
                    href="https://www.linkedin.com/company/v-land-uk"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FaLinkedinIn size={15} />
                  </a>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMenu;
