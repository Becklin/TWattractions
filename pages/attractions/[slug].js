import { useRouter } from 'next/router'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout';
import styles from '@/styles/Attraction.module.scss'

import Link from 'next/link';

export default function AttractionPage({attraction}) {
    console.log('attractionwwwww', attraction);
    const deleteAttraction = e => {
        console.log('delete');
    }
    return (
        <Layout>
            <div className={styles.attraction}>
            <div className={styles.controls}>
                <Link href={`/attractions/edit/${attraction.id}`}>
                <a>
                    <FaPencilAlt /> Edit Attraction
                </a>
                </Link>
                <a href='#' className={styles.delete}
                    onClick={deleteAttraction}
                >
                    <FaTimes /> Delete Attraction
                </a>
            </div>
            <span>
                {attraction.location} at {attraction.province}
            </span>
            <h1>{attraction.name}</h1>
            {attraction.image && (
                <div className={styles.image}>
                    <Image src={attraction.image} width={960} height={600} />
                </div>
            )}
            <p>{attraction.description}</p>
                <Link href='/attractions' >
                    <a className=''>
                        {'<'} Back
                    </a>
            </Link>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/attractions`);
    const attractions = await res.json();
    const paths = attractions.map( atr => ({
        params: { slug: atr.slug }
    }));
    console.log('結果paths', paths);
    return {
        paths: paths,
        fallback: true,
    };
} 

export async function getStaticProps({params: {slug}}) {
    const res = await fetch(`${API_URL}/attractions/${slug}`);
    const attractions = await res.json();
    return {
        props: {
            attraction: attractions[0],
        },
        revalidate: 1,
    }
}