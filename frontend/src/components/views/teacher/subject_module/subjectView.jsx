'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useModulAjars } from '@/services/modulAjarService/useModulAjar'
import useAuth from '@/hooks/useAuth'
import InputModulAjar from './component/inputModulAjar'
import ActivitiesView from './component/activitiesView'
import modulAjarService from '@/services/modulAjarService/modul-ajar.service'

const SubjectView = () => {
  const [activeTab, setActiveTab] = useState('moduleTab')
  const { token } = useAuth()
  const {
    data: modulAjars,
    error: errorModulAjars,
    isFetching: isFetchingModulAjars,
    refetch: refetchModulAjars,
  } = useModulAjars(token)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus data modul !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await modulAjarService.delete(token, id)
        Swal.fire('Data Dihapus!', 'Data modul telah dihapus.', 'success')
        refetchModulAjars()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan pada data modul.', 'error')
      }
    })
  }

  useEffect(() => {
    refetchModulAjars()
  }, []) // Call refetch when component mounts

  return (
    <div className="content-wrapper" id="guru">
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className={activeTab === 'moduleTab' ? 'active' : ''}>
                  <Link href="" onClick={() => handleTabChange('moduleTab')}>
                    Modul Ajar
                  </Link>
                </li>
                <li
                  className={
                    activeTab === 'learningOutcomesTab' ? 'active' : ''
                  }
                >
                  <Link
                    href=""
                    onClick={() => handleTabChange('learningOutcomesTab')}
                  >
                    Input Modul Ajar
                  </Link>
                </li>
                <li className={activeTab === 'activitiesTab' ? 'active' : ''}>
                  <Link
                    href=""
                    onClick={() => handleTabChange('activitiesTab')}
                  >
                    Jadwal Ajar
                  </Link>
                </li>
              </ul>
              <div className="tab-content">
                {activeTab === 'moduleTab' && (
                  <div className="active tab-pane" id="activity">
                    <div className="box-body table-responsive no-padding">
                      <table id="siswa" className="table table-hover">
                        <thead>
                          <tr>
                            <th>Minggu</th>
                            <th>Mata Pelajaran</th>
                            <th>Topik</th>
                            <th>Sub Topik</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modulAjars?.map((modulAjar) => (
                            <tr key={modulAjar.id}>
                              <td>{modulAjar.minggu}</td>
                              <td>{modulAjar.mapel.name}</td>
                              <td>{modulAjar.topik}</td>
                              <td>{modulAjar.subtopik}</td>
                              <td>
                                <button
                                  style={{
                                    marginRight: '2px',
                                    marginLeft: '2px',
                                  }}
                                  type="button"
                                  className="btn btn-primary"
                                  // onClick={handleDelete}
                                >
                                  <i className="icon fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(modulAjar.id)}
                                >
                                  <i className="icon fa fa-trash"></i>
                                </button>
                                <button
                                  style={{
                                    marginRight: '2px',
                                    marginLeft: '2px',
                                  }}
                                  type="button"
                                  className="btn btn-success"
                                >
                                  <i className="icon fa fa-print"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeTab === 'learningOutcomesTab' && (
                  <InputModulAjar refetch={refetchModulAjars} />
                )}
                {activeTab === 'activitiesTab' && <ActivitiesView />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SubjectView
