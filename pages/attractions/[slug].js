import { useRouter } from "next/router";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
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
      <div className="mt-24 mx-3 mb-12 md:w-[780px] md:mx-auto">
        <h2 className="flex items-center justify-between">
          {attraction.name}{" "}
          <div className="btn-group ">
            <button className="btn btn-active btn-sm normal-case">
              <Link href={`/attractions/edit/${attraction.id}`}>
                Edit Attraction
              </Link>
            </button>
            <button className="btn btn-sm normal-case">
              <a href="#" className="btn-third" onClick={deleteAttraction}>
                Delete Attraction
              </a>
            </button>
          </div>
        </h2>
        <div className="flex gap-6 mb-6 w-full">
          <section className="flex-1">
            <Image
              priority
              src={
                attraction.image && attraction.image.formats.medium.url
                  ? attraction.image.formats.medium.url
                  : "/images/default_image.svg"
              }
              width={760}
              height={400}
            />
            <span className="text-sm text-slate-500 inline-block my-3">
              {new Date(attraction.date).toLocaleDateString("en-ca")}{" "}
              {attraction.address} at {attraction.location}
              {/* official site */}
            </span>
          </section>
          <section className="flex-1">
            <p>{attraction.introduction}</p>
          </section>
        </div>
        <div className="flex w-full justify-between items-center">
          <Link href="/attractions">Back</Link>
        </div>
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
