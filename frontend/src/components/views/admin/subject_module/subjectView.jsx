'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Link from 'next/link'
import CapaianPage from './component/capaianPage'
import TujuanPage from './component/tujuanPage'

const SubjecetView = () => {
  const [activeTab, setActiveTab] = useState('view')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // console.log(tab);
  }

  const siswa = [
    { id: 1, nis: '123', nisn: '456', nama: 'John Doe' },
    { id: 2, nis: '789', nisn: '012', nama: 'Jane Doe' },
    { id: 3, nis: '345', nisn: '678', nama: 'Alice Smith' },
  ]

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
                {activeTab === 'view' && <TujuanPage tujuanData={[]} />}
                {activeTab === 'input' && <CapaianPage />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SubjecetView
