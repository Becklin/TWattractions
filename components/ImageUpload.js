import { useState } from "react";
import { API_URL } from "../config";

export default function ImageUpload({ atrId, imageUploaded, token }) {
  const [image, setImage] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "attractions");
    formData.append("refId", atrId);
    formData.append("field", "image");
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      imageUploaded();
    }
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div>
      <h1>Upload Attraction Image</h1>
      <form onSubmit={handleSubmit} className="form-control my-4">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Pick an image</span>
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        <input type="submit" value="Upload" className=" my-4 btn" />
      </form>
    </div>
  );
}
