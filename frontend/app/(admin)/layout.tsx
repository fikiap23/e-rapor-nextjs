import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/ui/admin/Sidebar'
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
