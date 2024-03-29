'use client'
import { useState, useEffect } from 'react'
import AddSemesterModal from './addSemesterModal'
import useAuth from '@/hooks/useAuth'
import { useGetAllSemesterData } from '@/services/semesterService/useSemester'

const SemesterView = () => {
  const { token } = useAuth()
  const [dataSemester, setDataSemester] = useState([])
  const {
    data: listSemester,
    error: errorSemester,
    isFetching: isFetchingSemester,
  } = useGetAllSemesterData(token)

  useEffect(() => {
    setDataSemester(listSemester)
    console.log(listSemester)
  }, [listSemester])

  const [isOpenAddModal, setIsOpenAddModal] = useState(false)

  const openModal = () => {
    setIsOpenAddModal(true)
  }

  const closeModal = () => {
    setIsOpenAddModal(false)
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
                      onClick={openModal}
                    >
                      <i className="icon fa fa-plus"></i> Tambah
                    </button>
                  </div>
                  <table
                    className="table table-bordered table-striped"
                    id="tahun"
                  >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tahun</th>
                        <th>Kepala Sekolah</th>
                        <th>Tgl Raport</th>
                        <th>Semester</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isFetchingSemester &&
                        dataSemester &&
                        dataSemester.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{`${item.tahunAjaranAwal}-${item.tahunAjaranAkhir}`}</td>
                            <td>{item.namaKepsek}</td>
                            <td>{item.tglBagiRapor}</td>
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
                              <button className="btn btn-primary btn-sm">
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
      <AddSemesterModal
        isOpen={isOpenAddModal}
        closeModal={closeModal}
      ></AddSemesterModal>
    </>
  )
}
export default SemesterView
