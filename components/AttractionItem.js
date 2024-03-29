import Link from "next/link";
import Image from "next/image";

export default function AttractionItem({ attraction }) {
  return (
    <div>
      <div className="card h-24 md:card-side bg-white shadow-lg my-4 rounded">
        <figure className="block w-40 relative shrink-0">
          <Image
            alt={attraction.name}
            src={
              attraction.image && attraction.image.data
                ? attraction.image.data.attributes.formats.thumbnail.url
                : "/images/default_image.svg"
            }
            fill
          />
        </figure>
        <div className="card-body">
          <h4 className="card-title text-slate-700 flex justify-between">
            {attraction.name}{" "}
            <Link
              className="btn btn-xs btn-primary normal-case"
              href={`/attractions/${attraction.slug}`}
            >
              Details
            </Link>
          </h4>
          <p className="h-[70px] overflow-hidden text-neutral">
            {attraction.introduction}
          </p>
        </div>
      </div>
    </div>
  );
}
