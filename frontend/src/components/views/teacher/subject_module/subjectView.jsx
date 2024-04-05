'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useModulAjars } from '@/services/modulAjarService/useModulAjar'
import useAuth from '@/hooks/useAuth'
import InputModulAjar from './component/inputModulAjar'
import ActivitiesView from './component/activitiesView'
import modulAjarService from '@/services/modulAjarService/modul-ajar.service'
import Loading from '@/components/shared/Loading'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
import { useCpTp } from '@/services/cp-tpService/useCpTp'

const SubjectView = () => {
  const [activeTab, setActiveTab] = useState('moduleTab')
  const [mingguTpUnCreated, setMingguTpUncreated] = useState([])
  const { token } = useAuth()
  const {
    data: modulAjars,
    error: errorModulAjars,
    isFetching: isFetchingModulAjars,
    refetch: refetchModulAjars,
  } = useModulAjars(token)

  const {
    data: cpTps,
    error: errorCpTps,
    isFetching: isFetchingCpTps,
    refetch: refetchCpTps,
  } = useCpTp(token)

  useEffect(() => {
    if (!isFetchingCpTps && !isFetchingModulAjars) {
      const mingguModulAjar = modulAjars?.map((modulAjar) => {
        return modulAjar?.minggu
      })
      const tp = cpTps?.tujuanPembelajaran.filter(
        (tujuanPembelajaran) =>
          !mingguModulAjar.includes(tujuanPembelajaran?.minggu)
      )
      setMingguTpUncreated(tp)
    }
  }, [isFetchingCpTps, isFetchingModulAjars, cpTps, modulAjars])

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
                      <div style={{ margin: '0 20px 20px 20px' }}>
                        <button
                          type="button"
                          className="btn bg-green"
                          onClick={() => handleTabChange('learningOutcomesTab')}
                        >
                          <i className="icon fa fa-plus"></i> Tambah
                        </button>
                      </div>
                      {isFetchingModulAjars && <Loading />}
                      {!isFetchingModulAjars && modulAjars.length === 0 && (
                        <EmptyDataIndicator message={'Belum Ada Modul Ajar'} />
                      )}
                      {!isFetchingModulAjars && modulAjars.length > 0 && (
                        <table id="siswa" className="table table-hover">
                          <thead>
                            <tr>
                              <th>Minggu</th>
                              <th>Topik</th>
                              <th>Sub Topik</th>
                              <th>Tujuan Kegiatan</th>
                              <th>Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {modulAjars?.map((modulAjar) => (
                              <tr key={modulAjar.id}>
                                <td>{modulAjar.minggu}</td>
                                <td>{modulAjar.topik}</td>
                                <td>{modulAjar.subtopik}</td>
                                <td>
                                  {modulAjar?.tujuanKegiatan?.map(
                                    (tujuan, index) => (
                                      <p key={tujuan}>
                                        {index + 1}. {tujuan}
                                      </p>
                                    )
                                  )}
                                </td>
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
                      )}
                    </div>
                  </div>
                )}
                {activeTab === 'learningOutcomesTab' &&
                  !isFetchingModulAjars &&
                  !isFetchingCpTps && (
                    <InputModulAjar
                      refetch={refetchModulAjars}
                      tujuanPembelajarans={mingguTpUnCreated}
                      token={token}
                    />
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
