import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import SidebarTeacher from '@/components/shared/SidebarTeacher'

import React from 'react'
const AboutLayout = ({ children }) => {
  return (
    <>
      <Header />
      <SidebarTeacher />
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default AboutLayout
