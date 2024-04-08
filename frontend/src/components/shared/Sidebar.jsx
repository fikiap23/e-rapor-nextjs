import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <div className="user-panel">
          <div className="pull-left image">
            <img
              src="https://picsum.photos/200"
              className="img-circle"
              alt="User Image"
            />
          </div>
          <div className="pull-left info">
            <p>John Doe</p>
            <a href="#">
              <i className="fa fa-circle text-success"></i> Online
            </a>
          </div>
        </div>
        <ul className="sidebar-menu" data-widget="tree">
          <li className="active">
            <Link href="/admin">
              {' '}
              <i className="fa fa-dashboard"></i> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/guru">
              <i className="fa fa-user"></i> <span>Guru</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/siswa">
              <i className="fa fa-users"></i> <span>Siswa</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/silabus">
              <i className="fa fa-pencil"></i> <span>Isian CP/TP</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/kelompok-usia">
              <i className="fa fa-group"></i> <span>Kelompok Usia</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/rombel">
              <i className="fa fa-home"></i> <span>Rombel</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/semester">
              <i className="fa fa-calendar"></i> <span>Semester</span>
            </Link>
          </li>
          <li>
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
