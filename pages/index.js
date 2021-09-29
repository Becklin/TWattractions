import Layout from "@/components/Layout";
import AttractionItem from "@/components/AttractionItem";

import { API_URL } from "@/config/index";
import Link from "next/link";
export default function HomePage({ attractions }) {
  console.log("首頁", attractions);
  return (
    <Layout>
      <h1>New Attractions</h1>
      {attractions.length === 0 && <h3>No Attraction to show</h3>}
      {attractions.map((attraction) => {
        return <AttractionItem key={attraction.id} attraction={attraction} />;
      })}
      {attractions.length > 0 && (
        <Link href="attractions">
          <a>View All Attractions</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/attractions?_sort=date:ASC&_limit=3`);
  // const res = await fetch(`${API_URL}/attractions`);
  const attractions = await res.json();
  console.log("attractions", attractions);
  return {
    props: { attractions },
    revalidate: 1, // revalidate every 1 sec change
  };
}
