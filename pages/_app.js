import "normalize.css/normalize.css";
import "../styles/globals.scss";
import { AuthProvider } from "@/context/AuthContext";
import { Montserrat } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";

const newMontserrat = Montserrat({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <AuthProvider>
      <style jsx global>{`
        html {
          font-family: ${newMontserrat.style.fontFamily};
        }
      `}</style>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}

export default MyApp;
