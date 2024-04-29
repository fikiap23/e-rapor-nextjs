import useAuth from '@/hooks/useAuth'
import { useMe } from '@/hooks/useMe'
import Link from 'next/link'

const SidebarTeacher = () => {
  const { token } = useAuth()
  const { data } = useMe(token)
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <div className="user-panel">
          <div className="pull-left image">
            <img
              src="/images/teacher.png"
              className="img-circle"
              alt="User Image"
            />
          </div>
          <div className="pull-left info">
            <p>{data?.guru?.nama}</p>
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
            <Link href="/guru/riwayat-mengajar">
              <i className="fa fa-bookmark"></i> <span>Riwayat Mengajar</span>
            </Link>
          </li>

          <li>
            <Link href="/guru/modul-ajar">
              <i className="fa fa-edit"></i> <span>Modul Ajar</span>
            </Link>
          </li>

          <li>
            <Link href="/guru/penilaian">
              <i className="fa fa-pencil"></i> <span>Penilaian</span>
            </Link>
          </li>

          <li>
            <Link href="/guru/rapor">
              <i className="fa fa-book"></i> <span>Raport</span>
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  )
}

export default SidebarTeacher
