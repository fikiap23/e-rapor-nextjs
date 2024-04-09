'use client'
import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import '../bootstrap.css'
import React, { useState } from 'react'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div
      className={` skin-blue-light sidebar-mini ${
        sidebarOpen ? 'sidebar-open' : 'sidebar-collapse'
      }`}
    >
      <div className="wrapper">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default AdminLayout
