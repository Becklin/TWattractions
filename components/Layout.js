import { useRouter } from "next/router";
import Head from "next/head";
import { Children } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Showcase from "@/components/Showcase";
import styles from "@/styles/Layout.module.scss";
export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Taiwan Attractions",
  description: "Find the coolest atractions in Taiwan",
  keywords: "taiwan attractions tour",
};
