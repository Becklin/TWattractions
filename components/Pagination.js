import Link from "next/link";
import { PER_PAGE } from "@/config/index";

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <div className="flex justify-center">
      <div class="btn-group">
        <Link
          className={
            page == 1
              ? "btn  btn-sm btn-outline bg-white text-slate-300 hover:text-slate-300 hover:bg-white"
              : "btn btn-sm btn-outline bg-white"
          }
          href={page > 1 ? `/attractions?page=${page - 1}` : ""}
        >
          Prev
        </Link>
        <button class="btn btn-sm">Page {page}</button>
        <Link
          className={
            page == lastPage
              ? "btn btn-sm btn-outline bg-white text-slate-300 hover:text-slate-300 hover:bg-white"
              : "btn btn-sm btn-outline bg-white"
          }
          href={page < lastPage ? `/attractions?page=${page + 1}` : ""}
        >
          {page < lastPage ? "Next" : "First Page"}
        </Link>
      </div>
    </div>
  );
}
