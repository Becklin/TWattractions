import Head from 'next/head'
import { Children } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({
    title, keywords, description, children
}) {
    return  (
        <div>
            <head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </head>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
        title: 'Taiwan Attractions',
        description: 'Find the coolest atractions in Taiwan',
        keywords: 'taiwan attractions tour',
}