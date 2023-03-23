import Link from "next/link";
import styles from "@/styles/Pagination.module.scss";
import { PER_PAGE } from "@/config/index";

export default function Pagination({ page, total }) {
  console.log(page, total, PER_PAGE);
  const lastPage = Math.ceil(total / PER_PAGE);
  console.log(lastPage, "pagination");
  return (
    <>
      {page > 1 && <Link href={`/attractions?page=${page - 1}`}>Prev</Link>}
      {page < lastPage && (
        <Link href={`/attractions?page=${lastPage}`}>Next</Link>
      )}
    </>
  );
}
