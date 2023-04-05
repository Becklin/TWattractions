import Link from "next/link";
import Image from "next/image";

export default function DashboardAttraction({ attributes, id, handleDelete }) {
  const { name, image, introduction, slug } = attributes;
  return (
    <div>
      <div className="card lg:card-side lg:h-28 bg-white shadow-lg my-4">
        <figure className="block w-40 relative shrink-0">
          <Image
            alt={name}
            src={
              image && image.data
                ? image.data.attributes.formats.thumbnail.url
                : "/images/default_image.svg"
            }
            fill
          />
        </figure>
        <div className="card-body">
          <h4 className="card-title text-slate-700 flex justify-between">
            {name}{" "}
            <div className="btn-group">
              <button
                className="btn btn-active btn-xs normal-case"
                aria-label="edit attraction"
              >
                <Link href={`/attractions/edit/${id}`}>
                  <span>Edit Attraction</span>
                </Link>
              </button>
              <button
                className="btn btn-xs normal-case"
                aria-label="delete attraction"
              >
                <a href="#" onClick={() => handleDelete(id)}>
                  <span>Delete</span>
                </a>
              </button>
              <Link
                className="btn btn-xs btn-primary normal-case"
                href={`/attractions/${slug}`}
              >
                Details
              </Link>
            </div>
          </h4>
          <p className="overflow-hidden">{introduction}</p>
        </div>
      </div>
    </div>
  );
}
