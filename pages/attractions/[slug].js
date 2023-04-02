import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import Link from "next/link";
import qs from "qs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function AttractionPage({ attraction: { id, attributes } }) {
  const router = useRouter();
  const { author, name, address, location, introduction, createdAt, image } =
    attributes;
  const deleteAttraction = async (e) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/attractions/${id}`, {
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
      <div className="fixed w-full h-screen bg-[#e6e6e6]">
        <div className="artboard-demo phone-6 mt-24 mx-3 mb-12 md:w-[780px] md:mx-auto box-content p-4">
          <ToastContainer />
          <h2 className="w-full flex items-baseline justify-between">
            {name}
            <span className="text-sm text-slate-300">
              {new Date(createdAt).toLocaleDateString("en-ca")}
            </span>
          </h2>
          <section className="flex gap-6 mb-6 w-full">
            <section className="flex-1">
              <Image
                priority
                src={
                  image && image.data
                    ? image.data.attributes.formats.medium.url
                    : "/images/default_image.svg"
                }
                width={760}
                height={400}
              />
              <div className="btn-group mt-4">
                <button className="btn btn-active btn-xs normal-case">
                  <Link href={`/attractions/edit/${id}`}>Edit Attraction</Link>
                </button>
                <button className="btn btn-xs normal-case">
                  <a href="#" className="btn-third" onClick={deleteAttraction}>
                    Delete Attraction
                  </a>
                </button>
                <button className="btn btn-xs normal-case">
                  <Link href="/attractions">Back</Link>
                </button>
              </div>
              <div className="my-4">
                <FontAwesomeIcon icon={faLocationDot} size="md" />
                <span className="ml-2">
                  {address} at {location}
                </span>
              </div>
              <div className="text-sm text-slate-500">Posted by {author}</div>
            </section>
            <section className="flex-1">
              <p>{introduction}</p>
            </section>
          </section>
          <section className="flex w-full justify-between items-center"></section>
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
  // the following code trigger 404 status in vercel host becasue of nextjs build, need investigation
  // const res = await fetch(
  //   `${API_URL}/attractions?populate=*&filters\[Slug\][$eq]=${slug}`
  // );
  // const res = await fetch(`${API_URL}/attractions?populate=*&slug=${slug}`);
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
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
  if (!response.data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      attraction: response.data[0],
    },
  };
}
