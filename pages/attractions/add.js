import { useState, useEffect } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "@/helpers/index";
import Link from "next/link";
import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import TwInput from "@/components/TwInput";

import { API_URL } from "@/config/index";
import AuthContext from "@/context/AuthContext";

export default function AddAttractions({ token }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    location: "",
    address: "",
    date: new Date(),
    introduction: "",
    author: user.username,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyField = Object.values(values).some((val) => val === "");
    if (hasEmptyField) toast.error("please fill in all fields");

    const formData = new FormData();
    formData.append("files.image", image, image.name);
    formData.append("data", JSON.stringify(values));

    const res = await fetch(`${API_URL}/attractions/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <Layout title="Add New Attraction">
      <div className="mt-24 mx-3 mb-12 md:w-[780px] md:mx-auto">
        <ToastContainer />
        <Image
          priority
          alt="background image"
          src="/images/vacation.jpg"
          fill
          className="z-0 object-cover"
        />
        <form
          className="z-[1] relative form-control w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <h2>Add Attractions</h2>
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
                name="location"
                value={values.location}
                placeholder="location"
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
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
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick an image</span>
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full max-w-xs"
            />
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
          </div>
          <input type="submit" className="btn mt-8" value="Add Attraction" />
        </form>
        <div className="z-10 relative"></div>
        <Link href="/attractions">Back</Link>
        <div className="divider"></div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
