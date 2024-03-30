'use client'
import { useState } from 'react'
import AddSemesterModal from './addSemesterModal'
import EditSemesterModal from './editSemesterModal'
import useAuth from '@/hooks/useAuth'
import { useGetAllSemesterData } from '@/services/semesterService/useSemester'
import Loading from '@/components/shared/Loading'
import { formatDate } from '@/lib/helperDate'

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

  const deleteData = (id) => {}

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
                            <td>{formatDate(new Date(item.tglBagiRapor))}</td>
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
                                onClick={() => openModalEdit(item)}
                              >
                                <i className="icon fa fa-edit"></i>
                              </button>
                              <button className="btn btn-danger btn-sm">
                                <i className="icon fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <AddSemesterModal isOpen={isOpenAddModal} closeModal={closeModalAdd} />
      <EditSemesterModal
        isOpen={isOpenEditModal}
        closeModal={closeModalEdit}
        semesterData={selectedSemester}
      />
    </>
  )
}
export default SemesterView
