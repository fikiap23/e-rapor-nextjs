import Link from 'next/link'
import React, { useState } from 'react'

const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState([])

  const toggleMenu = (menuName) => {
    if (expandedMenus.includes(menuName)) {
      setExpandedMenus(expandedMenus.filter((item) => item !== menuName))
    } else {
      setExpandedMenus([...expandedMenus, menuName])
    }
  }

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
          <li
            className={
              expandedMenus.includes('guru') ? 'treeview menu-open' : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('guru')}>
              <i className="fa fa-user"></i> <span>Guru</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('guru')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('guru') ? 'block' : 'none',
              }}
            >
              <li>
                <Link href="/admin/guru">
                  <span>Daftar Guru</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/guru/add">
                  <span>Tambah Guru</span>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={
              expandedMenus.includes('siswa')
                ? 'treeview menu-open'
                : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('siswa')}>
              <i className="fa fa-users"></i> <span>Siswa</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('siswa')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('siswa') ? 'block' : 'none',
              }}
            >
              <li>
                <Link href="/admin/siswa">
                  <span>Daftar Siswa</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/siswa/add">
                  <span>Tambah Siswa</span>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={
              expandedMenus.includes('silabus')
                ? 'treeview menu-open'
                : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('silabus')}>
              <i className="fa fa-pencil"></i> <span>Isian CP/TP</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('silabus')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('silabus') ? 'block' : 'none',
              }}
            >
              <li>
                <Link href="/admin/silabus">
                  <span>Daftar Isian CP/TP</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/silabus/add">
                  <span>Tambah Isian CP/TP</span>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={
              expandedMenus.includes('kelompok-usia')
                ? 'treeview menu-open'
                : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('kelompok-usia')}>
              <i className="fa fa-group"></i> <span>Kelompok Usia</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('kelompok-usia')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('kelompok-usia')
                  ? 'block'
                  : 'none',
              }}
            >
              <li>
                <Link href="/admin/kelompok-usia">
                  <span>Daftar Kelompok Usia</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/kelompok-usia/add">
                  <span>Tambah Kelompok Usia</span>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={
              expandedMenus.includes('rombel')
                ? 'treeview menu-open'
                : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('rombel')}>
              <i className="fa fa-home"></i> <span>Rombel</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('rombel')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('rombel') ? 'block' : 'none',
              }}
            >
              <li>
                <Link href="/admin/rombel">
                  <span>Daftar Rombel</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/rombel/add">
                  <span>Tambah Rombel</span>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={
              expandedMenus.includes('semester')
                ? 'treeview menu-open'
                : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('semester')}>
              <i className="fa fa-calendar"></i> <span>Semester</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('semester')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('semester') ? 'block' : 'none',
              }}
            >
              <li>
                <Link href="/admin/semester">
                  <span>Daftar Semester</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/semester/add">
                  <span>Tambah Semester</span>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={
              expandedMenus.includes('sekolah')
                ? 'treeview menu-open'
                : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('sekolah')}>
              <i className="fa fa-building"></i> <span>Sekolah</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('sekolah')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('sekolah') ? 'block' : 'none',
              }}
            >
              <li>
                <Link href="/admin/sekolah">
                  <span>Daftar Sekolah</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/sekolah/add">
                  <span>Tambah Sekolah</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </aside>
  )
}

export default Sidebar
