import Link from 'next/link'

const SidebarTeacher = () => {
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
            <p>User Name</p>
            <a href="#">
              <i className="fa fa-circle text-success"></i> Online
            </a>
          </div>
        </div>

        <ul className="sidebar-menu" data-widget="tree">
          <li>
            <Link href="/guru">
              {' '}
              <i className="fa fa-dashboard"></i> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/guru/rombel">
              <i className="fa fa-book"></i> <span>Raport Siswa</span>
            </Link>
          </li>
          <li>
            <Link href="/guru/modul-ajar">
              <i className="fa fa-edit"></i> <span>Modul Ajar</span>
            </Link>
          </li>
          {/* <li>
            <a href="/guru/absensi">
              <i className="fa fa-calendar"></i> <span>Input Absen</span>
            </a>
          </li> */}

          <li>
            <Link href="/guru/validation">
              <i className="fa fa-edit"></i> <span>Validasi Nilai</span>
            </Link>
          </li>
          <li className="active">
            <Link href="/guru/rapor">
              <i className="fa fa-print"></i> <span>Cetak Raport</span>
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  )
}

export default SidebarTeacher
