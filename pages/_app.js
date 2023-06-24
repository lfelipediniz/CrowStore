import '../styles/globals.css'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

// import firestore from './_firestore.jsx'

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
            if (loader)
                loader.remove();
        }
    }, []);

    return <Component {...pageProps} />
}

export default MyApp
