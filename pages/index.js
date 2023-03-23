import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import AttractionItem from "@/components/AttractionItem";
import Showcase from "@/components/Showcase";
import styles from "@/styles/Layout.module.scss";
import { API_URL } from "@/config/index";
import Link from "next/link";
export default function HomePage({ attractions }) {
  const router = useRouter();
  return (
    <Layout>
      {router.pathname === "/" && <Showcase />}
      <h2>New Attractions</h2>
      {!attractions && <h3>No Attraction to show</h3>}
      {attractions.map((attraction) => {
        return <AttractionItem key={attraction.id} attraction={attraction} />;
      })}
      {attractions.length > 0 && (
        <div className={styles.controls}>
          <Link href="attractions">
            <a className="btn-secondary">View All Attractions</a>
          </Link>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  let attractions = [];
  try {
    const res = await fetch(`${API_URL}/attractions?_sort=date:ASC&_limit=3`);
    attractions = await res.json();
  } catch (err) {
    console.error(err);
  }
  return {
    // Make sure that you don't pass any sensitive information
    // that shouldn't be available on the client in props.
    props: { attractions },
    revalidate: 1, // revalidate every 1 sec change
  };
}
