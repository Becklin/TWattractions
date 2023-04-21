import Layout from "@/components/Layout";
import ListLayout from "@/components/ListLayout";
import AttractionItem from "@/components/AttractionItem";
import { API_URL, PER_PAGE } from "@/config/index";
import Link from "next/link";

export default function HomePage({ attractions }) {
  return (
    <>
      {attractions.length == 0 && <h3>No Attraction to show</h3>}
      {attractions.map((attraction) => {
        const newAttr = {
          ...attraction.attributes,
          id: attraction.id,
        };
        return <AttractionItem key={attraction.id} attraction={newAttr} />;
      })}
      {attractions.length > 0 && (
        <div>
          <Link className="text-neutral" href="attractions">
            View All Attractions
          </Link>
        </div>
      )}
    </>
  );
}

HomePage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <ListLayout>{page}</ListLayout>
    </Layout>
  );
};

// export async function getStaticProps() {//getServerSideProps
export async function getStaticProps() {
  //getServerSideProps

  let response = [];
  // let taipei = [];
  try {
    const res = await fetch(
      `${API_URL}/attractions?populate=*&sort[0]=createdAt:desc&pagination[pageSize]=${PER_PAGE}`
    );

    // const res2 = await fetch(
    //   `https://www.travel.taipei/open-api/en/Attractions/All`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //     },
    //   }
    // );
    // taipei = await res2.json();

    response = await res.json();
  } catch (err) {
    console.error(err);
  }
  return {
    // Make sure that you don't pass any sensitive information
    // that shouldn't be available on the client in props.
    props: { attractions: response.data || [] },
    revalidate: 1, // revalidate every 1 sec change
  };
}
