import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'

import React from 'react'
const AboutLayout = ({ children }) => {
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
