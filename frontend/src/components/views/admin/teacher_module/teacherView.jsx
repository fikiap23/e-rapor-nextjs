'use client'
import Swal from 'sweetalert2'
import { useState } from 'react'
import AddGuruModal from './addGuruModal'
import Link from 'next/link'
import ManageTeacher from './manageTeacher'
import TeacherTable from './teacherTable'

const TeacherView = () => {
  const [activeTab, setActiveTab] = useState('view')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // console.log(tab);
  }

  const handleNonactiveUserClick = () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan mengubah status menjadi Nonactive!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, nonaktifkan!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Nonaktifkan!',
          'Status pengguna telah diubah menjadi Nonactive.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan status pengguna.', 'error')
      }
    })
  }

  return (
    <div className="content-wrapper" id="guru">
      <section className="content">
        <div className="callout callout-info">
          <h4>
            <i className="icon fa fa-info-circle"></i> Informasi Penting !!!
          </h4>
          <p>
            1. Untuk Login Guru (PNS) gunakan{' '}
            <b>username : NIP dan password : guru123 </b>
          </p>
          <p>
            2. Untuk Login Guru (Honor) gunakan{' '}
            <b>username : NIK dan password : guru123 </b>
          </p>
          <p>
            3. <b>PASTIKAN GURU SUDAH AKTIF!! </b>
          </p>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-user"></i>{' '}
                  <span style={{ marginLeft: '10px' }}> Data Guru </span>
                </h3>
              </div>
              <div className="nav-tabs-pills">
                <ul className="nav nav-tabs">
                  <li className={activeTab === 'view' ? 'active' : ''}>
                    <Link href="" onClick={() => handleTabChange('view')}>
                      Kelola Guru
                    </Link>
                  </li>
                  <li className={activeTab === 'view_rombel' ? 'active' : ''}>
                    <Link
                      href=""
                      onClick={() => handleTabChange('daftarkan_guru')}
                    >
                      Daftarkan Guru di Rombel
                    </Link>
                  </li>
                </ul>
                {activeTab === 'view' && <ManageTeacher />}
                {activeTab === 'daftarkan_guru' && <TeacherTable />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TeacherView
