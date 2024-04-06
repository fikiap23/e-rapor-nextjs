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
              expandedMenus.includes('subject')
                ? 'treeview menu-open'
                : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('subject')}>
              <i className="fa fa-pencil"></i> <span>Isian CP/TP</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('subject')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('subject') ? 'block' : 'none',
              }}
            >
              <li>
                <Link href="/admin/subject">
                  <span>Daftar Isian CP/TP</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/subject/add">
                  <span>Tambah Isian CP/TP</span>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={
              expandedMenus.includes('age-group')
                ? 'treeview menu-open'
                : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('age-group')}>
              <i className="fa fa-group"></i> <span>Kelompok Usia</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('age-group')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('age-group') ? 'block' : 'none',
              }}
            >
              <li>
                <Link href="/admin/age-group">
                  <span>Daftar Kelompok Usia</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/age-group/add">
                  <span>Tambah Kelompok Usia</span>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={
              expandedMenus.includes('class')
                ? 'treeview menu-open'
                : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('class')}>
              <i className="fa fa-home"></i> <span>Rombel</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('class')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('class') ? 'block' : 'none',
              }}
            >
              <li>
                <Link href="/admin/class">
                  <span>Daftar Rombel</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/class/add">
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
              expandedMenus.includes('school')
                ? 'treeview menu-open'
                : 'treeview'
            }
          >
            <a href="#" onClick={() => toggleMenu('school')}>
              <i className="fa fa-building"></i> <span>Sekolah</span>
              <span className="pull-right-container">
                <i
                  className={
                    expandedMenus.includes('school')
                      ? 'fa fa-angle-down pull-right'
                      : 'fa fa-angle-left pull-right'
                  }
                ></i>
              </span>
            </a>
            <ul
              className="treeview-menu"
              style={{
                display: expandedMenus.includes('school') ? 'block' : 'none',
              }}
            >
              <li>
                <Link href="/admin/school">
                  <span>Daftar Sekolah</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/school/add">
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
