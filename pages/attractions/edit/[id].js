import { useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.scss";

export default function EditAttractions({ attraction }) {
  const [values, setValues] = useState({
    name: attraction.name,
    location: attraction.location,
    address: attraction.address,
    date: attraction.date,
    description: attraction.description,
  });
  const [imagePreview, setImagePreview] = useState(
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
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
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
      <Link className={styles.back} href="/attractions">
        Back
      </Link>
      <h1>Edit Attraction!</h1>
      <ToastContainer />
      <div className="form-control w-full max-w-xs" onSubmit={handleSubmit}>
        <label className="label" htmlFor="name">
          <span className="label-text">Attraction name</span>
          <span className="label-text-alt">Top Right label</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
        />

        <label className="label" htmlFor="Address">
          <span className="label-text">Address</span>
          <span className="label-text-alt">Top Right label</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.Address}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
        />

        <label className="label" htmlFor="location">
          <span className="label-text">Location</span>
          <span className="label-text-alt">Top Right label</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.location}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
        />

        <label className="label" htmlFor="date">
          <span className="label-text">Date</span>
          <span className="label-text-alt">Top Right label</span>
        </label>
        <input
          type="text"
          id="name"
          name="date"
          value={moment(values.date).format("YYYY-MM-DD")}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
        />

        <label className="label" htmlFor="introduction">
          <span className="label-text">Introduction</span>
          <span className="label-text-alt">Top Right label</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.introduction}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
        />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={values.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format("YYYY-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={values.description}
              onChange={handleInputChange}
            />
          </div>
          <input type="submit" className="btn" value="Update Attraction" />
        </div>
      </form>
      <h2>Attraction Image</h2>
      {/* {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>No Image Uploaded</div>
      )} */}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload atrId={attraction.id} imageUploaded={uploadImage} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/attractions/${id}`);
  const attraction = await res.json();
  return {
    props: { attraction },
  };
}
