import Layout from "@/components/Layout";
import ListLayout from "@/components/ListLayout";
import AttractionItem from "@/components/AttractionItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";
export default function AttractionsPage({ attractions, page, total }) {
  return (
    <>
      {!attractions && <h3>No Attraction to show</h3>}
      {/* {data.map((d) => {
        return <AttractionItem key={d.id} attraction={d} />;
      })} */}
      {attractions.map((attraction) => {
        return (
          <AttractionItem
            key={attraction.id}
            attraction={attraction.attributes}
          />
        );
      })}
      <div>
        <Pagination page={page} total={total} />
      </div>
    </>
  );
}

AttractionsPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <ListLayout>{page}</ListLayout>
    </Layout>
  );
};
export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const totalRes = await fetch(`${API_URL}/attractions/count`);
  const total = await totalRes.json();
  const atrRes = await fetch(
    `${API_URL}/attractions?populate=*&sort[0]=createdAt:desc&pagination[page]=${start}&pagination[pageSize]=10`
  );
  const response = await atrRes.json();

  return {
    props: { attractions: response.data, page: +page, total },
  };
}
