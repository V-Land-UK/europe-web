import "../styles/globals.css";
import "../styles/main.css";
import "../styles/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import nProgress from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalProvider } from "../context/GlobalContext";

//Router events
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalProvider>
  );
}

export default MyApp;
