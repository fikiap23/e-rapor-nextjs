'use client'
import { useState } from 'react'
import AddSemesterModal from './addSemesterModal'
import EditSemesterModal from './editSemesterModal'
import useAuth from '@/hooks/useAuth'
import { useGetAllSemesterData } from '@/services/semesterService/useSemester'
import Loading from '@/components/shared/Loading'
import { formatDate } from '@/lib/helperDate'
import semesterService from '@/services/semesterService/semester.service'
import Swal from 'sweetalert2'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'

const SemesterView = () => {
  const { token } = useAuth()
  const [selectedSemester, setSelectedSemester] = useState({})
  const {
    data: listSemester,
    error: errorSemester,
    isFetching: isFetchingSemester,
    refetch: refetchSemester,
  } = useGetAllSemesterData(token)

  const [isOpenAddModal, setIsOpenAddModal] = useState(false)

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const openModalAdd = () => {
    setIsOpenAddModal(true)
  }

  const openModalEdit = (semester) => {
    setSelectedSemester(semester)
    setIsOpenEditModal(true)
  }

  const closeModalAdd = () => {
    setIsOpenAddModal(false)
  }

  const closeModalEdit = () => {
    setIsOpenEditModal(false)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus semester!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await semesterService.delete(token, id)
        refetchSemester()
        Swal.fire('Data Dihapus!', 'Semester telah dihapus.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Dibatalkan',
          'Tidak ada perubahan pada data semester.',
          'error'
        )
      }
    })
  }

  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-calendar"></i> Data Tahun
                  </h3>
                </div>

                <div className="box-body">
                  <div style={{ margin: '0 20px 20px 20px' }}>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={openModalAdd}
                    >
                      <i className="icon fa fa-plus"></i> Tambah
                    </button>
                  </div>
                  {isFetchingSemester && <Loading />}
                  {!isFetchingSemester && listSemester.length === 0 && (
                    <EmptyDataIndicator message={'Belum ada data'} />
                  )}
                  {!isFetchingSemester &&
                    listSemester &&
                    listSemester.length > 0 && (
                      <table
                        className="table table-bordered table-striped"
                        id="tahun"
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Tahun</th>
                            <th>Kepala Sekolah</th>
                            <th>NIP</th>
                            <th>Tgl Raport</th>
                            <th>Semester</th>
                            <th>Status</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!isFetchingSemester &&
                            listSemester &&
                            listSemester.map((item, index) => (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{`${item.tahunAjaranAwal}-${item.tahunAjaranAkhir}`}</td>
                                <td>{item.namaKepsek}</td>
                                <td>{item.nipKepsek}</td>
                                <td>
                                  {formatDate(new Date(item.tglBagiRapor))}
                                </td>
                                <td>{item.jenisSemester}</td>
                                <td>
                                  <span
                                    className={`label bg-${
                                      item.isAktif ? 'green' : 'red'
                                    }`}
                                  >
                                    {item.isAktif ? 'Aktif' : 'Nonaktif'}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={openModalEdit.bind(this, item)}
                                  >
                                    <i className="icon fa fa-edit"></i>
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={handleDelete.bind(this, item.id)}
                                  >
                                    <i className="icon fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <AddSemesterModal
        token={token}
        isOpen={isOpenAddModal}
        closeModal={closeModalAdd}
        refetch={refetchSemester}
      />
      <EditSemesterModal
        isOpen={isOpenEditModal}
        closeModal={closeModalEdit}
        semesterData={selectedSemester}
        refetch={refetchSemester}
        token={token}
      />
    </>
  )
}
export default SemesterView
