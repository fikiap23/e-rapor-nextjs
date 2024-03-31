'use client'
import useAuth from '@/hooks/useAuth'
import AddSubjectModal from './addSubjectModal'
import { useState } from 'react'
import { useModulAjars } from '@/services/modulAjarService/useModulAjar'
import Loading from '@/components/shared/Loading'
import { useJadwalAjars } from '@/services/jadwalAjarService/useJadwalAjar'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
import { formatDate } from '@/lib/helperDate'

const ActivitiesView = () => {
  const { token } = useAuth()
  const {
    data: modulAjars,
    error: errorModulAjars,
    isFetching: isFetchingModulAjars,
    refetch: refetchModulAjars,
  } = useModulAjars(token)

  const {
    data: jadwalAjars,
    isFetching: isFetchingJadwalAjars,
    refetch: refetchJadwalAjars,
  } = useJadwalAjars(token)

  console.log(jadwalAjars)
  const activityDummy = [
    { id: 1, week: 'Minggu 1', day: 'Senin', date: '10 Juli 2024' },
  ]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="active tab-pane" id="activity">
      <div className="box-body table-responsive no-padding">
        <div style={{ margin: '0 20px 20px 20px' }}>
          <button type="button" className="btn bg-green" onClick={openModal}>
            <i className="icon fa fa-plus"></i> Tambah
          </button>
          {/* <span style={{color: 'red', fontStyle: 'italic', marginLeft: '10px'}}>*modul ajar belum lengkap sampai 14 minggu</span> */}
        </div>
        {isFetchingModulAjars || (isFetchingJadwalAjars && <Loading />)}
        {(!isFetchingModulAjars || !isFetchingJadwalAjars) && (
          <>
            {jadwalAjars.length === 0 && (
              <EmptyDataIndicator message={'Belum ada data Jadwal Ajar'} />
            )}
            {jadwalAjars.length > 0 && (
              <table id="activity" className="table table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Minggu</th>
                    <th>Hari</th>
                    <th>Tanggal</th>
                    <th>Kegiatan Inti</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwalAjars.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{`Minggu ${item.modulAjar.minggu}`}</td>
                      <td>{item.hari}</td>
                      <td>{formatDate(new Date(item.tanggal))}</td>
                      <td>{item.kegiatanInti}</td>
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
            )}
          </>
        )}
      </div>
      {/* ADD MODUL AJAR */}
      {!isFetchingModulAjars && (
        <AddSubjectModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          modulAjar={modulAjars}
          token={token}
          refetch={refetchJadwalAjars}
        ></AddSubjectModal>
      )}
    </div>
  )
}

export default ActivitiesView
