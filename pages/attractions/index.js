
import Layout from '@/components/Layout'
import AttractionItem from '@/components/AttractionItem'

import { API_URL } from '@/config/index'
export default function AttractionsPage({attractions}) {
  console.log('attractions', attractions);
  return (
    <Layout>
      <h1>Home</h1>
      {attractions.length === 0 && <h3>No Attractions to show</h3>}
      {attractions.map(attraction => {
        return <AttractionItem key={attraction.id} attraction={attraction}/>
      })}
    </Layout>
  )
}


export async function getStaticProps() {
  const res = await fetch(`${API_URL}/attractions`);
  const attractions = await res.json();
  return {
    props: { attractions },
    revalidate: 1, // revalidate every 1 sec change
  }
}

// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/attractions`);
//   const attractions = await res.json();
//   console.log('attractions', attractions);
//   return {
//     props: { attractions },
//   }
// }