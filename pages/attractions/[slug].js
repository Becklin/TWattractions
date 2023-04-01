import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function AttractionPage({
  attraction: { id, attributes },
  all,
}) {
  const router = useRouter();
  const { name, address, location, introduction, author, createdAt, image } =
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
      {all}
      <div className="mt-24 mx-3 mb-12 md:w-[780px] md:mx-auto">
        <ToastContainer />
        <h2 className="flex items-center justify-between">
          {name}{" "}
          <div className="btn-group ">
            <button className="btn btn-active btn-sm normal-case">
              <Link href={`/attractions/edit/${id}`}>Edit Attraction</Link>
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
                image && image.formats.medium.url
                  ? image.formats.medium.url
                  : "/images/default_image.svg"
              }
              width={760}
              height={400}
            />
            <span className="text-sm text-slate-500 inline-block my-3">
              {new Date(createdAt).toLocaleDateString("en-ca")} {address} at{" "}
              {location}
              {/* official site */}
            </span>
          </section>
          <section className="flex-1">
            <p>{introduction}</p>
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
  // const res = await fetch(`${API_URL}/attractions?slug=${slug}`);// expect to get the correct result but in no avail
  //const res = await fetch(`${API_URL}/attractions/slug/${slug}`); // expect to get the correct result but in no avail
  const res = await fetch(
    `${API_URL}/attractions?filters\[Slug\][$eq]=${slug}`
  );

  const response = await res.json();
  if (!response.data) {
    return {
      notFound: true,
    };
  }

  console.log(response);
  return {
    props: {
      attraction: response.data[0],
      all: JSON.stringify(res),
    },
  };
}
