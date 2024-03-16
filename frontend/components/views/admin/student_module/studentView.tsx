'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import TabInputSiswa from './TabInputStudent'
import Link from 'next/link'

const StudentView = () => {
  const [activeTab, setActiveTab] = useState('view')

  const handleTabChange = (tab: any) => {
    setActiveTab(tab)
    // console.log(tab);
  }

  const siswa = [
    { id: 1, nis: '123', nisn: '456', nama: 'John Doe' },
    { id: 2, nis: '789', nisn: '012', nama: 'Jane Doe' },
    { id: 3, nis: '345', nisn: '678', nama: 'Alice Smith' },
  ]

  const deleteSiswa = (id: number) => {
    handleDelete()
    console.log(`Menghapus siswa dengan id ${id}`)
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
      <section className="content-header">
        {/* {action === "view" && alert.message !== '' && (
          <div className={`alert alert-${alert.status}`}>
            <h4><i className="icon fa fa-info-circle"></i> {alert.message}</h4>
          </div>
        )} */}
      </section>

      {/* Main content */}
      <section className="content">
        <div className="callout callout-info">
          <h4>
            <i className="icon fa fa-info-circle"></i> Informasi Penting !!!
          </h4>
          <p>
            Untuk Login Siswa gunakan <b>USERNAME dan password NIS </b>
          </p>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* {action === "view" && ( */}
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className={activeTab === 'view' ? 'active' : ''}>
                  <Link href="" onClick={() => handleTabChange('view')}>
                    Lihat Siswa
                  </Link>
                </li>
                <li className={activeTab === 'input' ? 'active' : ''}>
                  <Link href="" onClick={() => handleTabChange('input')}>
                    Input Siswa
                  </Link>
                </li>
              </ul>
              <div className="tab-content">
                {activeTab === 'view' && (
                  <div className="active tab-pane" id="activity">
                    <div className="box-body table-responsive no-padding">
                      <table id="siswa" className="table table-hover">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Nis</th>
                            <th>Nisn</th>
                            <th>Nama</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {siswa.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.nis}</td>
                              <td>{item.nisn}</td>
                              <td>{item.nama}</td>
                              <td>
                                <a className="btn btn-success btn-sm">
                                  {/* <span className="glyphicon glyphicon-edit"></span> Edit */}
                                  <i className="icon fa fa-edit"></i>
                                </a>
                                <button style={{ marginRight: '2px', marginLeft: '2px' }} className="btn btn-danger btn-sm" onClick={() => deleteSiswa(item.id)}>
                                  {/* <span className="glyphicon glyphicon-remove"></span> Delete */}
                                  <i className="icon fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeTab === 'input' && <TabInputSiswa />}
              </div>
            </div>
            {/* )} */}
            {/* {action !== "view" && <TabEditSiswa />} */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudentView
