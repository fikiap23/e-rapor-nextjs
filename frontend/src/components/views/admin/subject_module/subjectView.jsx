'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Link from 'next/link'
import CapaianPage from './component/capaianPage'
import TujuanPage from './component/tujuanPage'
import useAuth from '@/hooks/useAuth'
import { useCpTp } from '@/services/cp-tpService/useCpTp'
import Loading from '@/components/shared/Loading'

const SubjecetView = () => {
  const [activeTab, setActiveTab] = useState('view')

  const { token } = useAuth()
  const {
    data: listCp,
    error: errorCp,
    isFetching: isFetchingCp,
    refetch: refetchCp,
  } = useCpTp(token)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  const handleDelete = () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus siswa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Data Dihapus!', 'Siswa telah dihapus.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan pada data siswa.', 'error')
      }
    })
  }

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            {/* {action === "view" && ( */}
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className={activeTab === 'view' ? 'active' : ''}>
                  <Link href="" onClick={() => handleTabChange('view')}>
                    Tujuan Pembelajaran
                  </Link>
                </li>
                <li className={activeTab === 'input' ? 'active' : ''}>
                  <Link href="" onClick={() => handleTabChange('input')}>
                    Capaian Pembelajaran
                  </Link>
                </li>
              </ul>
              <div className="tab-content">
                {isFetchingCp && <Loading />}
                {activeTab === 'view' && !isFetchingCp && (
                  <TujuanPage cp={listCp} refetch={refetchCp} token={token} />
                )}
                {activeTab === 'input' && !isFetchingCp && (
                  <CapaianPage cp={listCp} refetch={refetchCp} token={token} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SubjecetView
