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
            <Link href="/admin/teacher">
              <i className="fa fa-user"></i> <span>Guru</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/student">
              <i className="fa fa-users"></i> <span>Siswa</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/subject">
              <i className="fa fa-pencil"></i> <span>Modul Ajar</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/age-group">
              <i className="fa fa-group"></i> <span>Kelompok Usia</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/class">
              <i className="fa fa-home"></i> <span>Rombel</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/semester">
              <i className="fa fa-calendar"></i> <span>Semester</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/school">
              <i className="fa fa-building"></i> <span>Sekolah</span>
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  )
}

export default Sidebar
