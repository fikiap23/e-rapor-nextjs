import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const router = usePathname()

  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <div className="user-panel">
          <div className="pull-left image">
            <img
              src="/images/admin.png"
              className="img-circle"
              alt="User Image"
            />
          </div>
          <div className="pull-left info">
            <p>Admin</p>
            <a href="#">
              <i className="fa fa-circle text-success"></i> Online
            </a>
          </div>
        </div>
        <ul className="sidebar-menu" data-widget="tree">
          <li className={router === '/admin' ? 'active' : ''}>
            <Link href="/admin">
              {' '}
              <i className="fa fa-dashboard"></i> <span>Dashboard</span>
            </Link>
          </li>
          <li className={router === '/admin/guru' ? 'active' : ''}>
            <Link href="/admin/guru">
              <i className="fa fa-user"></i> <span>Guru</span>
            </Link>
          </li>
          <li className={router === '/admin/siswa' ? 'active' : ''}>
            <Link href="/admin/siswa">
              <i className="fa fa-users"></i> <span>Siswa</span>
            </Link>
          </li>
          <li className={router === '/admin/silabus' ? 'active' : ''}>
            <Link href="/admin/silabus">
              <i className="fa fa-pencil"></i> <span>Isian CP/TP</span>
            </Link>
          </li>
          <li className={router === '/admin/kelompok-usia' ? 'active' : ''}>
            <Link href="/admin/kelompok-usia">
              <i className="fa fa-group"></i> <span>Kelompok Usia</span>
            </Link>
          </li>
          <li className={router === '/admin/rombel' ? 'active' : ''}>
            <Link href="/admin/rombel">
              <i className="fa fa-home"></i> <span>Rombel</span>
            </Link>
          </li>
          <li className={router === '/admin/semester' ? 'active' : ''}>
            <Link href="/admin/semester">
              <i className="fa fa-calendar"></i> <span>Semester</span>
            </Link>
          </li>
          <li className={router === '/admin/sekolah' ? 'active' : ''}>
            <Link href="/admin/sekolah">
              <i className="fa fa-building"></i> <span>Sekolah</span>
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  )
}

export default Sidebar
