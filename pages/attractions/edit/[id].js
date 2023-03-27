import { useState } from "react";
import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import TwInput from "@/components/TwInput";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";

export default function EditAttractions({ attraction, token }) {
  const [values, setValues] = useState({
    name: attraction.name,
    location: attraction.location,
    address: attraction.address,
    date: attraction.date,
    description: attraction.description,
  });
  const [imagePreview, setImagePreview] = useState(
    // attraction.image ? attraction.image.formats.thumbnail.url : null
    attraction.image ? attraction.image.formats.thumbnail.url : null
  );
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyField = Object.values(values).some((val) => val === "");
    if (hasEmptyField) toast.error("please fill in all fields");
    const res = await fetch(`${API_URL}/attractions/${attraction.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("something went wrong");
    } else {
      const atr = await res.json();
      router.push(`/attractions/${atr.slug}`);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const uploadImage = async (e) => {
    const res = await fetch(`${API_URL}/attractions/${attraction.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Update New Attraction">
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
              name="name"
              value={values.name}
              placeholder="Name"
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <TwInput
              type="text"
              name="address"
              value={values.address}
              placeholder="Address"
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
          <div className="flex-1">
            <TwInput
              type="date"
              name="date"
              value={moment(values.date).format("YYYY-MM-DD")}
              placeholder="select date"
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
        <label className="label" htmlFor="introduction">
          <span className="label-text text-white">Introduction</span>
        </label>
        <textarea
          id="introduction"
          name="introduction"
          value={values.introduction}
          onChange={handleInputChange}
          className="textarea textarea-bordered"
          placeholder="introduction"
        ></textarea>
        <input type="submit" className="btn mt-8" value="Update Attraction" />
      </form>
      <div className="z-10 relative">
        {imagePreview ? (
          <div className="my-4 overflow-hidden rounded-4">
            <Image src={imagePreview} width="200" height="170" />
          </div>
        ) : (
          <div>No Image Uploaded</div>
        )}
        <button className="btn " onClick={() => setShowModal(true)}>
          Set Image
        </button>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ImageUpload
            atrId={attraction.id}
            imageUploaded={uploadImage}
            token={token}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/attractions/${id}`);
  const attraction = await res.json();

  return {
    props: { attraction, token },
  };
}
