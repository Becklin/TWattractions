import Layout from "@/components/Layout";
import styles from "@/styles/Layout.module.scss";

import AttractionItem from "@/components/AttractionItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function AttractionsPage({ attractions, page, total }) {
  return (
    <Layout>
      <h1>Home</h1>
      {attractions.length === 0 && <h3>No Attractions to show</h3>}
      {attractions.map((attraction) => {
        return <AttractionItem key={attraction.id} attraction={attraction} />;
      })}
      <div className={styles.controls}>
        <Pagination page={page} total={total} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const totalRes = await fetch(`${API_URL}/attractions/count`);
  const total = await totalRes.json();
  const atrRes = await fetch(
    `${API_URL}/attractions?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const attractions = await atrRes.json();

  return {
    props: { attractions, page: +page, total },
  };
}
