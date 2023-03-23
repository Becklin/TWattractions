import { useRouter } from "next/router";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
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
        router.push("/attractions");
      }
    }
  };

  return (
    <Layout>
      <div className={styles.attraction}>
        {attraction.image && (
          <div className={styles.image}>
            <Image
              src={attraction.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <span className={styles.controls}>
          <Link href={`/attractions/edit/${attraction.id}`}>
            <FaPencilAlt /> Edit Attraction
          </Link>
          <a href="#" className="btn-third" onClick={deleteAttraction}>
            <FaTimes /> Delete Attraction
          </a>
        </span>
        <h1>{attraction.name}</h1>
        <span className={styles.subinfo}>
          {new Date(attraction.date).toLocaleDateString("en-ca")}{" "}
          {attraction.address} at {attraction.location}
        </span>
        <p>{attraction.description}</p>
        <Link href="/attractions">Back</Link>
      </div>
    </Layout>
  );
}

//  If a page uses Server-side Rendering, the page HTML is generated on each request.
//  In this case,
//  Maybe your page shows frequently updated data,
//  and the page content changes on every request.
//  getServerSideProps is similar to getStaticProps, but the difference is that
//  getServerSideProps is run on every request instead of on build time.
export async function getServerSideProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/attractions?slug=${slug}`);
  const attractions = await res.json();
  if (!attractions) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      attraction: attractions[0],
    },
  };
}
