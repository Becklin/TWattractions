
import { useRouter } from 'next/router'

export default function AttractionPage() {
    const router = useRouter()
    console.log(router);
    return (
        <div>
            <div><h1>My Attraction</h1></div>
            <h1>{router.query.slug}</h1>
        </div>
    )
}
