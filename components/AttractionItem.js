import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/AttractionItem.module.scss";

export default function AttractionItem({ attraction }) {
  return (
    <div className={styles.attraction}>
      <div className={styles.img}>
        <Image
          alt={attraction.name}
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
        <p>{attraction.description}</p>
      </div>
      <div className={styles.detail}>
        <Link href={`/attractions/${attraction.slug}`}>Details</Link>
      </div>
    </div>
  );
}
