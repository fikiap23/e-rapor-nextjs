import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import SidebarTeacher from '@/components/shared/SidebarTeacher'

import React from 'react'
const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header></Header>
      <SidebarTeacher></SidebarTeacher>
      <div>{children}</div>
      <Footer></Footer>
    </>
  )
}

export default AboutLayout
