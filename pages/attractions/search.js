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
      <h1 className="text-neutral-content">
        Search Results for {router.query.keyword}
      </h1>
      {attractions.length === 0 && <h3>No Attractions to show</h3>}
      {attractions.map((attraction) => {
        const newAttr = {
          ...attraction.attributes,
          id: attraction.id,
        };
        return <AttractionItem key={attraction.id} attraction={newAttr} />;
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
        introduction: {
          $eq: keyword,
        },
      },
      populate: "*",
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
