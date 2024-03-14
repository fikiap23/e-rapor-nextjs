import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'
const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <div>{children}</div>
      <Footer></Footer>
    </>
  )
}

export default AboutLayout
