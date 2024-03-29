'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Link from 'next/link'
import ActivityInput from './input/activityInput'

const ActivitiesView = () => {
  const [activeTab, setActiveTab] = useState('view')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // console.log(tab);
  }

  const activityDummy = [
    { id: 1, week: 'Minggu 1', day: 'Senin', date: '10 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
    { id: 2, week: 'Minggu 1', day: 'Selasa', date: '11 Juli 2024' },
  ]

  const deleteSiswa = (id) => {
    handleDelete()
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus kegiatan inti!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Data Dihapus!', 'Kegiatan telah dihapus.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan pada data.', 'error')
      }
    })
  }

  return (
    <div className="row">
      <div className="col-md-12">
        {/* {action === "view" && ( */}
        <div className="nav-tabs-custom">
          <ul className="nav nav-tabs">
            <li className={activeTab === 'view' ? 'active' : ''}>
              <Link href="" onClick={() => handleTabChange('view')}>
                Lihat Kegiatan Inti
              </Link>
            </li>
            <li className={activeTab === 'input' ? 'active' : ''}>
              <Link href="" onClick={() => handleTabChange('input')}>
                Input Kegiatan Inti
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            {activeTab === 'view' && (
              <div className="active tab-pane" id="activity">
                <div className="box-body table-responsive no-padding">
                  <table id="activity" className="table table-hover">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Minggu</th>
                        <th>Hari</th>
                        <th>Tanggal</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityDummy.map((item, index) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.week}</td>
                          <td>{item.day}</td>
                          <td>{item.date}</td>
                          <td>
                            <a
                              style={{ marginRight: '2px', marginLeft: '2px' }}
                              className="btn btn-primary btn-sm"
                            >
                              {/* <span className="glyphicon glyphicon-edit"></span> Edit */}
                              <i className="icon fa fa-edit"></i>
                            </a>
                            <button
                              style={{ marginRight: '2px', marginLeft: '2px' }}
                              className="btn btn-info btn-sm"
                              // onClick={() => deleteSiswa(item.id)}
                            >
                              {/* <span className="glyphicon glyphicon-remove"></span> Delete */}
                              <i className="icon fa fa-eye"></i>
                            </button>
                            <button
                              style={{ marginRight: '2px', marginLeft: '2px' }}
                              className="btn btn-danger btn-sm"
                              // onClick={() => deleteSiswa(item.id)}
                            >
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
            {activeTab === 'input' && <ActivityInput />}
          </div>
        </div>
        {/* )} */}
        {/* {action !== "view" && <TabEditSiswa />} */}
      </div>
    </div>
  )
}

export default ActivitiesView
