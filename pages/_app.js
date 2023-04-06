import "normalize.css/normalize.css";
import "../styles/globals.scss";
import { AuthProvider } from "@/context/AuthContext";
import { Montserrat } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { DefaultSeo } from "next-seo";

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
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </>
  );
}

export default MyApp;
