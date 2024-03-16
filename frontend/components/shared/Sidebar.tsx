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
            <a href="/dashboard">
              {' '}
              <i className="fa fa-dashboard"></i> <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/dashboard/guru">
              <i className="fa fa-user"></i> <span>Guru</span>
            </a>
          </li>
          <li>
            <a href="/admin/siswa">
              <i className="fa fa-users"></i> <span>Siswa</span>
            </a>
          </li>
          <li>
            <a href="/admin/mata-pelajaran">
              <i className="fa fa-link"></i> <span>Mata Pelajaran</span>
            </a>
          </li>
          <li>
            <a href="/admin/kelas">
              <i className="fa fa-home"></i> <span>Kelas</span>
            </a>
          </li>
          <li>
            <a href="/admin/tahun">
              <i className="fa fa-calendar"></i> <span>Tahun</span>
            </a>
          </li>
          <li>
            <a href="/admin/ekstra">
              <i className="fa fa-edit"></i> <span>Ekstrakurikuler</span>
            </a>
          </li>
          <li>
            <a href="/admin/set-kelas">
              <i className="fa fa-user-plus"></i> <span>Kelompok Kelas</span>
            </a>
          </li>
          <li>
            <a href="/admin/set-matpel">
              <i className="fa fa-book"></i>{' '}
              <span>Kelompok Mata Pelajaran</span>
            </a>
          </li>
          <li>
            <a href="/admin/set-wali-kelas">
              <i className="fa fa-user-secret"></i>{' '}
              <span>Kelompok Wali Kelas</span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  )
}

export default Sidebar
