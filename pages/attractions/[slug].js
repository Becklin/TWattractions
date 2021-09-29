import { useRouter } from "next/router";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
// import AttractionMap from "@/components/AttractionMap";
import styles from "@/styles/Attraction.module.scss";
import Link from "next/link";
import { toast } from "react-toastify";

export default function AttractionPage({ attraction }) {
  const router = useRouter();
  const deleteAttraction = async (e) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/attractions/${attraction.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        console.log("倒也");
        router.push("/attractions");
      }
    }
  };
  console.log("LOGLOG ", attraction);
  return (
    <Layout>
      <div className={styles.attraction}>
        <div className={styles.controls}>
          <Link href={`/attractions/edit/${attraction.id}`}>
            <a>
              <FaPencilAlt /> Edit Attraction
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteAttraction}>
            <FaTimes /> Delete Attraction
          </a>
        </div>
        {attraction.image && (
          <div className={styles.image}>
            <Image
              src={attraction.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <span>{new Date(attraction.date).toLocaleDateString("en-ca")}</span>
        <h1>{attraction.name}</h1>
        <span>
          {attraction.address} at {attraction.location}
        </span>
        <p>{attraction.description}</p>
        <Link href="/attractions">
          <a className={styles.back}>{"<"} Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/attractions`);
//   const attractions = await res.json();
//   const paths = attractions.map((atr) => ({
//     params: { slug: atr.slug },
//   }));
//   return {
//     paths: paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   console.log("史拉殼", slug);
//   const res = await fetch(`${API_URL}/attractions?slug=${slug}`);
//   const attractions = await res.json();
//   console.log("下一個attractions", attractions);

//   return {
//     props: {
//       attraction: attractions[0],
//     },
//     revalidate: 1,
//   };
// }
export async function getServerSideProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/attractions?slug=${slug}`);
  const attractions = await res.json();
  const paths = attractions.map((atr) => ({
    params: { slug: atr.slug },
  }));
  return {
    props: {
      attraction: attractions[0],
    },
  };
}
