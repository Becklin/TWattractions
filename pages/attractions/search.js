import Layout from "@/components/Layout";
import ListLayout from "@/components/ListLayout";
import AttractionItem from "@/components/AttractionItem";
import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";

import { API_URL } from "@/config/index";
export default function SearchPage({ attractions }) {
  const router = useRouter();
  return (
    <>
      <Link href="/">Back</Link>
      <h1>Search Results for {router.query.keyword}</h1>
      {attractions.length === 0 && <h3>No Attractions to show</h3>}
      {attractions.map((attraction) => {
        return <AttractionItem key={attraction.id} attraction={attraction} />;
      })}
    </>
  );
}

SearchPage.getLayout = function getLayout(page) {
  return (
    <Layout title="Search Results">
      <ListLayout>{page}</ListLayout>
    </Layout>
  );
};

export async function getServerSideProps({ query: { keyword } }) {
  const query = qs.stringify(
    {
      sort: ["name:asc"],
      filters: {
        name: {
          $eq: keyword,
        },
      },
      populate: "*",
      fields: ["name"],
      publicationState: "live",
      locale: ["en"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`${API_URL}/attractions?${query}`);
  const response = await res.json();
  return {
    props: { attractions: response.data },
  };
}
