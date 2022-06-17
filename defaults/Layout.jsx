/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Fade as Hamburger } from "hamburger-react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
  Box,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import { useScrollDirection } from "react-use-scroll-direction";
import NavLink from "../components/NavLink";
import { AnimatePresence, motion } from "framer-motion";
import NavMenu from "../components/NavMenu";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import SearchCard from "../components/SearchCard";
import Icon from "../components/Icon";
const qs = require("qs");

const Layout = ({ children, title, desc, keywords, image }) => {
  const router = useRouter();
  const { isScrollingUp, isScrollingDown, isScrolling } = useScrollDirection();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Open, setOpen] = useState(false);
  const [Nav, setNav] = useState(true);
  const [Query, setQuery] = useState("");
  const [MobileQuery, setMobileQuery] = useState("");

  //Function to toggle drawer
  const toggleDrawer = () => {
    // setOpen(isOpen ? false : true);
    onOpen();
  };

  //Event listener for the links
  useEffect(() => {
    if (!isScrolling && scrollY < 150) {
      setNav(true);
    }
    isScrollingDown && setNav(false);
    isScrollingUp && setNav(true);
  }, [isScrollingDown, isScrollingUp, isScrolling]);

  //Search query
  const searchQuery = qs.stringify({
    q: MobileQuery,
  });
  const searchLink = `/search?${searchQuery}`;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://v-land.co.uk" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://v-land.co.uk" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={desc} />
        <meta property="twitter:image" content={image} />

        <meta property="og:site_name" content="Frikax" />
        <meta property="og:site" content="https://v-land.co.uk" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content="https://v-land.co.uk" />
        <title>{title}</title>
      </Head>

      <nav className="bg-transparent w-screen h-auto fixed top-0 drop-shadow-md z-[999]">
        <div className="relative bg-white flex lg:grid lg:grid-cols-3 lg:justify-items-center justify-between items-center py-1 px-5 lg:px-8 z-[999]">
          <div className="items-center space-x-4 hidden lg:block lg:place-self-start lg:self-center">
            {/* <button
              className="bg-primary text-white text-sm py-2 px-6 rounded-3xl hover:bg-transparent hover:border-[1.5px] border-primary hover:text-primary transition-all"
            >
              Subscribe
            </button> */}
            <NavMenu />
          </div>
          <div
            className="h-[8vh] lg:h-[9vh] py-[1.8vh] lg:py-[1.5vh] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img src="/Header.svg" alt="Header" className="h-full" />
            {/* <img src="/Header.svg" /> */}
          </div>
          <div className="lg:hidden">
            <Hamburger
              color="#4BAC48"
              size={22}
              toggled={isOpen}
              toggle={toggleDrawer}
            />
          </div>
          <div className="hidden lg:flex lg:flex-row-reverse w-[22vw] border-[1px] border-neutral-800 justify-between rounded-3xl overflow-hidden px-1 py-1 place-self-end self-center">
            <input
              name="SearchText"
              type="text"
              placeholder="Search anything..."
              className="w-full px-3 py-1 text-[16px] placeholder-neutral-300 text-neutral-800 focus:outline-none"
              value={Query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="text-neutral-800 h-auto aspect-square p-2 rounded-full">
              <BiSearch size={20} />
            </div>
          </div>
          <SearchCard Query={Query} setQuery={setQuery} />
        </div>
        <AnimatePresence>
          {Nav && (
            <motion.div
              initial={{ y: -45, originY: "top", zIndex: 0 }}
              animate={{ opacity: 1, y: 0, originY: "top", zIndex: 0 }}
              transition={{ duration: 0.2 }}
              exit={{ y: -45, originY: "top", zIndex: 0 }}
            >
              <div className="h-auto bg-neutral-50 flex gap-1 lg:gap-2 flex-nowrap 2xl:justify-center overflow-x-scroll py-[12px] px-4 lg:pr-0 pr-6">
                <NavLink link="/">Home</NavLink>
                <NavLink link="/category/articles">Articles</NavLink>
                <NavLink link="/category/interviews">Interviews</NavLink>
                <NavLink link="/category/food-and-drink">Food & Drink</NavLink>
                <NavLink link="/category/lifestyle">Lifestyle</NavLink>
                <NavLink link="/category/fashion-and-beauty">
                  Fashion & Beauty
                </NavLink>
                <NavLink link="/category/health-and-wellbeing">
                  Health & Wellbeing
                </NavLink>
                <NavLink link="/category/shopping">Shopping</NavLink>
                <NavLink link="/category/entertainment">Entertainment</NavLink>
                <NavLink link="/category/environment">Environment</NavLink>
                <NavLink link="/category/recipes">Recipes</NavLink>
                {/* <NavLink link="/category/shoutout">Shoutout</NavLink> */}
                {/* <NavLink link="/category/europe">Europe</NavLink> */}
                {/* <NavLink link="/category/events">Events</NavLink> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="w-[94%] lg:w-4/5 2xl:w-4/6 mx-auto mt-[16vh] lg:mt-[17vh]">
        {children}
      </main>
      <Footer />

      {/* NAVIGATION DRAWER */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _focus={{ border: "none" }} />
          <DrawerHeader>
            <Box
              width="40%"
              mt={6}
              mb={8}
              mx="auto"
              onClick={() => router.push("/")}
            >
              <img src="/Header.svg" alt="Header" className="w-full" />
            </Box>
            <div className="flex border-[1px] border-neutral-800 justify-between rounded-3xl overflow-hidden px-1 py-1">
              <input
                name="SearchText"
                type="text"
                placeholder="Search anything..."
                className="w-full px-3 py-1 text-[16px] placeholder-neutral-300 text-neutral-800 focus:outline-none"
                value={MobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
              />
              <button
                className="bg-neutral-800 text-white h-auto aspect-square p-2 rounded-full"
                onClick={() => router.push(searchLink)}
              >
                <BiSearch size={20} />
              </button>
            </div>
          </DrawerHeader>
          <DrawerBody fontSize={18}>
            <div className="flex flex-col text-base font-bold gap-y-5 px-2">
              <Link href="/">
                <div className="hover:text-primary hover:translate-x-3 transition-all">
                  Home
                </div>
              </Link>

              {/* <div className="hover:text-primary hover:translate-x-3 transition-all">
                <Link href="/shop">Shop</Link>
              </div>

              <div className="hover:text-primary hover:translate-x-3 transition-all">
                <Link href="/join-us">Join Us</Link>
              </div> */}
              <Link href="/about">
                <div className="hover:text-primary hover:translate-x-3 transition-all">
                  About
                </div>
              </Link>
              <Link href="/team">
                <div className="hover:text-primary hover:translate-x-3 transition-all">
                  Team
                </div>
              </Link>

              <Link href="/contact">
                <div className="hover:text-primary hover:translate-x-3 transition-all">
                  Contact
                </div>
              </Link>

              <div className="flex py-3 space-x-4">
                <Icon url="http://instagramm.com/vlanduk">
                  <FaInstagram size={13} />
                </Icon>
                <Icon url="https://www.facebook.com/V-Land-UK-100137252369546">
                  <FaFacebookF size={13} />
                </Icon>
                <Icon url="https://twitter.com/vlandukmag">
                  <FaTwitter size={13} />
                </Icon>
                <Icon url="https://www.linkedin.com/company/v-land-uk">
                  <FaLinkedinIn size={13} />
                </Icon>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "V-Land UK",
  page: "Home",
  image: "Logo.JPG",
  keywords: "vland, vegan, uk, green, nutritional, v-l, v-land, v",
  desc: "🇬🇧 Your UK Vegan Magazine ✨ News | Entertainment | And more 📌 ",
};
