import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {/* <div className="mt-24 mx-3 mb-12 md:w-[780px] md:mx-auto relative"> */}
      {children}
      {/* </div> */}
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Taiwan Attractions",
  description: "Find the coolest atractions in Taiwan",
  keywords: "taiwan attractions tour",
};
