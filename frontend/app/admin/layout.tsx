import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></Script>
      <Header></Header>
      <Sidebar></Sidebar>
      <div>{children}</div>
      <Footer></Footer>
    </>
  )
}

export default AboutLayout
