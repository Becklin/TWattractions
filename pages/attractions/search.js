import Layout from "@/components/Layout";
import AttractionItem from "@/components/AttractionItem";
import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";

import { API_URL } from "@/config/index";
export default function SearchPage({ attractions }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/">Back</Link>
      <h1>Search Results for {router.query.keyword}</h1>
      {attractions.length === 0 && <h3>No Attractions to show</h3>}
      {attractions.map((attraction) => {
        return <AttractionItem key={attraction.id} attraction={attraction} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps({ query: { keyword } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: keyword },
        { location_contains: keyword },
        // { introduction_contains: keyword },
      ],
    },
  });

  const res = await fetch(`${API_URL}/attractions?${query}`);
  const response = await res.json();
  return {
    props: { attractions: response.data },
  };
}

// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/attractions`);
//   const attractions = await res.json();
//   console.log('attractions', attractions);
//   return {
//     props: { attractions },
//   }
// }
