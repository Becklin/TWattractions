import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/AttractionItem.module.scss";

export default function AttractionItem({ attraction }) {
  return (
    <div className={styles.attraction}>
      <div className={styles.img}>
        <Image
          src={
            attraction.image.url
              ? attraction.image.formats.thumbnail.url
              : "/images/default.png"
          }
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>{new Date(attraction.date).toLocaleDateString("en-ca")}</span>
        <h3>{attraction.name}</h3>
        <span>{attraction.description}</span>
      </div>
      <div className={styles.link}>
        <Link href={`/attractions/${attraction.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
