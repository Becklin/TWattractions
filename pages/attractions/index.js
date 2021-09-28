import Layout from "@/components/Layout";
import AttractionItem from "@/components/AttractionItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function AttractionsPage({ attractions, page, total }) {
  console.log("ＸＸＸattractions", attractions);
  return (
    <Layout>
      <h1>Home</h1>
      {attractions.length === 0 && <h3>No Attractions to show</h3>}
      {attractions.map((attraction) => {
        return <AttractionItem key={attraction.id} attraction={attraction} />;
      })}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const totalRes = await fetch(`${API_URL}/attractions/count`);
  const total = await totalRes.json();
  console.log("toto", total);
  const atrRes = await fetch(
    `${API_URL}/attractions?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const attractions = await atrRes.json();

  return {
    props: { attractions, page: +page, total },
  };
}
// export async function getServerSideProps({ query: { page = 1 } }) {
//   // Calculate start page
//   const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

//   // Fetch total/count
//   // const totalRes = await fetch(`${API_URL}/events/count`)
//   // const total = await totalRes.json()

//   // Fetch events
//   const eventRes = await fetch(
//     `${API_URL}/attractions?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
//   );
//   const attractions = await eventRes.json();

//   return {
//     props: { attractions },
//   };
// }
