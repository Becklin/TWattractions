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
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      router.push(`/attractions/search?keyword=${keyword}`);
      setKeyword("");
    }
  };
  return (
    <div className="form-control">
      <div className="input-group">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search attractions"
          className="input input-bordered text-slate-700"
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSubmit}
          className="btn btn-square btn-accent"
          aria-label="search attraction"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
