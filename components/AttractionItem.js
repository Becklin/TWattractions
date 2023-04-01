import Link from "next/link";
import Image from "next/image";

export default function AttractionItem({ attraction }) {
  return (
    <div>
      <div className="card lg:card-side lg:h-28 bg-white shadow-lg my-4">
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
          <p className="overflow-hidden">{attraction.introduction}</p>
          {/* <div className="card-actions justify-end"></div> */}
        </div>
      </div>
    </div>
  );
}
