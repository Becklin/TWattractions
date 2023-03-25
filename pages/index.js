import Layout from "@/components/Layout";
import AttractionItem from "@/components/AttractionItem";
import styles from "@/styles/Layout.module.scss";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function HomePage({ attractions, taipei }) {
  const { data, total } = taipei;
  console.log("ccjajajaj", data);
  return (
    <Layout>
      {!attractions && <h3>No Attraction to show</h3>}
      {/* {data.map((d) => {
        return <AttractionItem key={d.id} attraction={d} />;
      })} */}
      {attractions.map((attraction) => {
        return <AttractionItem key={attraction.id} attraction={attraction} />;
      })}
      {attractions.length > 0 && (
        <div className={styles.controls}>
          {/* Any <Link /> in the viewport (initially or through scroll) will be prefetched 
          by default (including the corresponding data) for pages using Static Generation. 
          The corresponding data for server-rendered routes is fetched only 
          when the <Link /> is clicked. */}
          {/* client-side route transitions */}
          <Link href="attractions">View All Attractions</Link>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  let attractions = [];
  let taipei = [];
  try {
    const res = await fetch(`${API_URL}/attractions?_sort=date:DESC&_limit=8`);
    const res2 = await fetch(
      `https://www.travel.taipei/open-api/en/Attractions/All`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    taipei = await res2.json();
    attractions = await res.json();
  } catch (err) {
    console.error(err);
  }
  return {
    // Make sure that you don't pass any sensitive information
    // that shouldn't be available on the client in props.
    props: { attractions, taipei },
    revalidate: 1, // revalidate every 1 sec change
  };
}
