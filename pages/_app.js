import "normalize.css/normalize.css";
import "../styles/globals.scss";
import { AuthProvider } from "@/context/AuthContext";
import { Montserrat } from "next/font/google";
const newMontserrat = Montserrat({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <style jsx global>{`
        html {
          font-family: ${newMontserrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
