import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import Providers from './provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "RA. Daarun Na'im Ambon",
  description: `Rapor online - RA. Daarun Na'im Ambon`,
  icons: {
    icon: '/images/logo.jpg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
