import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/AttractionItem.module.scss'

export default function AttractionItem({attraction}) {
    return (
        <div className={styles.attraction}>
            <div className={styles.img}>
                <Image src={attraction.image.url ? attraction.image.url : '/images/default.png'} width={170} height={100} />
            </div>
            <div className={styles.info}>
                <span>
                    {attraction.description}
                </span>
                <h3>{attraction.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/attractions/${attraction.slug}`}>
                    <a className='btn'>Details {attraction.slug}</a>
                </Link>
            </div>
        </div>
    )
}
