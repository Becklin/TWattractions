import Link from "next/link";
import Image from "next/image";

export default function AttractionItem({ attraction }) {
  return (
    <div>
      <div className="card lg:card-side lg:h-28 bg-white shadow-lg my-4">
        <figure className="block w-40 relative shrink-0">
          {/* {attraction.images && attraction.images.length > 0 && (
            <Image alt={attraction.name} src={attraction.images[0].src} fill />
          )} */}
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
