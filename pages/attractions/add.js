import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.scss";

export default function AddAttractions() {
  const [values, setValues] = useState({
    name: "",
    location: "",
    address: "",
    date: "",
    description: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyField = Object.values(values).some((val) => val === "");
    if (hasEmptyField) toast.error("please fill in all fields");
    const res = await fetch(`${API_URL}/attractions/`, {
      method: "POST",
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
  return (
    <Layout title="Add New Attraction">
      <ToastContainer />
      <Image
        alt="background image"
        src="/images/twbuilding.j[g"
        fill
        // style={
        //   color: 'blue',
        //   backgroundImage: 'url(' + imgUrl + ')',
        // }
      />
      <div className="form-control w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label className="label" htmlFor="name">
              <span className="label-text">Attraction name</span>
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
          </div>
          <div className="flex-1">
            <label className="label" htmlFor="address">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.Address}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label className="label" htmlFor="location">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={values.location}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <label className="label" htmlFor="date">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
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
        <label className="label" htmlFor="image">
          <span className="label-text">Image</span>
        </label>
        <input
          id="image"
          name="image"
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <input type="submit" className="btn" value="Add Attraction" />
      </div>
      {/* <form onSubmit={handleSubmit} className={styles.form}> */}
      {/* <div className={styles.grid}>
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
              value={values.date}
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
          </div> */}
      {/* </div> */}
      {/* <input type="submit" className="btn" value="Add Attraction" />
      </form> */}
      <Link href="/attractions">Back</Link>
      <div className="divider"></div>
    </Layout>
  );
}
