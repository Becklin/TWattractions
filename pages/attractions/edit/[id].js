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
    // router.push();
    // validation
    console.log(values);
    const hasEmptyField = Object.values(values).some((val) => val === "");
    if (hasEmptyField) toast.error("please fill in all fields");
    const res = await fetch(`${API_URL}/attractions/${attraction.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log("res", res);

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
    console.log("upload");
    const res = await fetch(`${API_URL}/attractions/${attraction.id}`);
    const data = await res.json();
    console.log("資料", data);
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };
  console.log(imagePreview);
  return (
    <Layout title="Update New Attraction">
      <Link className={styles.back} href="/attractions">
        Back
      </Link>
      <h1>Edit Attraction!</h1>
      <ToastContainer />
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
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>No Image Uploaded</div>
      )}

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
