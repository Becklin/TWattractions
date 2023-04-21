import "normalize.css/normalize.css";
import "../styles/globals.scss";
import Head from "next/head";
import { AuthProvider } from "@/context/AuthContext";
import { Montserrat } from "next/font/google";
// reference: https://github.com/FortAwesome/Font-Awesome/issues/19348
const { library, config } = require("@fortawesome/fontawesome-svg-core");
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { DefaultSeo } from "next-seo";

library.add(faLinkedin);
const newMontserrat = Montserrat({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <DefaultSeo
        title="Taiwan Attractions"
        description="Taiwan Attractions is a place where you can share us with your tours in Taiwan"
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://twattractions.vercel.app/",
          siteName: "TwAttractions",
        }}
      />
      <AuthProvider>
        <style jsx global>{`
          html {
            font-family: ${newMontserrat.style.fontFamily};
          }
        `}</style>
        {getLayout(
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              ></meta>
            </Head>
            <Component {...pageProps} />
          </>
        )}
      </AuthProvider>
    </>
  );
}

export default MyApp;
