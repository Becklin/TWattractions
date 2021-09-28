import { useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Search.module.scss";

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
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="Search Attractions"
        />
      </form>
    </div>
  );
}
