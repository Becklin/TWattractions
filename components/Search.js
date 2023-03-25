import { useState } from "react";
import { useRouter } from "next/router";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/attractions/search?keyword=${keyword}`);
    setKeyword("");
  };

  return (
    <div class="form-control">
      <div class="input-group">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search attractions"
          className="input input-bordered text-slate-700"
        />
        <button onClick={handleSubmit} className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
