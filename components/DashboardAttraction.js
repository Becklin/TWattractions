import Link from "next/link";
import Image from "next/Image";

export default function DashboardAttraction({ attraction, handleDelete }) {
  return (
    <div>
      <div className="card lg:card-side lg:h-28 bg-white shadow-lg my-4">
        <figure className="block w-40 relative shrink-0">
          <Image
            alt={attraction.name}
            src={
              attraction.image && attraction.image.url
                ? attraction.image.formats.thumbnail.url
                : "/images/default_image.svg"
            }
            fill
          />
        </figure>
        <div className="card-body">
          <h4 className="card-title text-slate-700 flex justify-between">
            {attraction.name}{" "}
            <div className="btn-group">
              <button className="btn btn-active btn-xs normal-case">
                <Link href={`/attractions/edit/${attraction.id}`}>
                  <span>Edit Attraction</span>
                </Link>
              </button>
              <button className="btn btn-xs normal-case">
                <a href="#" onClick={() => handleDelete(attraction.id)}>
                  <span>Delete</span>
                </a>
              </button>
              <Link
                className="btn btn-xs btn-primary normal-case"
                href={`/attractions/${attraction.slug}`}
              >
                Details
              </Link>
            </div>
          </h4>
          <p className="overflow-hidden">{attraction.introduction}</p>
        </div>
      </div>
    </div>
  );
}
