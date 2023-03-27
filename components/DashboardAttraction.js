import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function DashboardAttraction({ evt, handleDelete }) {
  return (
    <div>
      <h4>
        <Link href={`/attractions/${evt.slug}`}>{evt.name}</Link>
      </h4>
      <Link href={`/attractions/edit/${evt.id}`}>
        <FaPencilAlt /> <span>Edit Attraction</span>
      </Link>
      <a href="#" onClick={() => handleDelete(evt.id)}>
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
}
