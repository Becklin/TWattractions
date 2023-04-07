import { useState } from "react";
import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import TwInput from "@/components/TwInput";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";

export default function EditAttractions({
  attraction: { id, attributes },
  token,
}) {
  const [values, setValues] = useState({
    name: attributes.name,
    location: attributes.location,
    address: attributes.address,
    date: attributes.createdAt,
    introduction: attributes.introduction,
  });
  const [imagePreview, setImagePreview] = useState(
    attributes.image && attributes.image.data
      ? attributes.image.data.attributes.formats.thumbnail.url
      : null
  );
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyField = Object.values(values).some((val) => val === "");
    if (hasEmptyField) toast.error("please fill in all fields");
    const res = await fetch(`${API_URL}/attractions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: values,
      }),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("something went wrong");
    } else {
      const {
        data: {
          attributes: { slug },
        },
      } = await res.json();
      router.push(`/attractions/${slug}`);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const uploadImage = async () => {
    const res = await fetch(`${API_URL}/attractions/${id}?populate=*`);
    const {
      data: {
        attributes: { image },
      },
    } = await res.json();
    setImagePreview(image.data.attributes.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Update New Attraction">
      <div className="mt-24 mx-3 mb-12 md:w-[780px] md:mx-auto">
        <ToastContainer />
        <Image
          priority
          alt="background image"
          src="/images/vacation.jpg"
          fill
          className="z-0 object-cover"
        />
        <Link className={""} href="/attractions">
          Back
        </Link>
        <form
          className="z-10 relative form-control w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <h2>Update Attractions</h2>
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <TwInput
                type="text"
                name="address"
                value={values.address}
                placeholder="Address"
                handleInputChange={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <TwInput
                type="text"
                name="name"
                value={values.name}
                placeholder="Name"
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <TwInput
                type="text"
                name="location"
                value={values.location}
                placeholder="location"
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
          <label className="label" htmlFor="introduction">
            <span className="label-text">Introduction</span>
          </label>
          <textarea
            id="introduction"
            name="introduction"
            value={values.introduction}
            onChange={handleInputChange}
            className="textarea textarea-bordered"
            placeholder="introduction"
          ></textarea>
          <input
            type="submit"
            className="btn mt-8 normal-case"
            value="Update Attraction"
          />
        </form>
        <div className="z-10 relative">
          {imagePreview ? (
            <div className="my-4 overflow-hidden rounded-4">
              <Image
                alt="image preview"
                src={imagePreview}
                width="200"
                height="170"
              />
            </div>
          ) : (
            <div className="my-4 normal-case">No Image Uploaded</div>
          )}
          <button
            className="btn normal-case"
            onClick={() => setShowModal(true)}
            aria-label="show image upload modal"
          >
            Set Image
          </button>
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <ImageUpload atrId={id} imageUploaded={uploadImage} token={token} />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/attractions/${id}?populate=*`);
  const response = await res.json();

  return {
    props: { attraction: response.data, token },
  };
}
