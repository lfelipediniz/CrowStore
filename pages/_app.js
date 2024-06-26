import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UserProvider } from '../context/UserContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.remove();
    }
  }, []);
  
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
