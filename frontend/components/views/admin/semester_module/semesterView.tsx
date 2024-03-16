'use client'
import { useState } from 'react'
import AddSemesterModal from './addSemesterModal'

const SemesterView = () => {
  const dummyData = [
    {
      id: 1,
      tahun: 2022,
      kepala_sekolah: 'John Doe',
      tgl_raport: '2022-01-01',
      semester: 'Ganjil',
      status: 'Active',
    },
    {
      id: 2,
      tahun: 2023,
      kepala_sekolah: 'Jane Doe',
      tgl_raport: '2023-01-01',
      semester: 'Genap',
      status: 'Inactive',
    },
    {
      id: 3,
      tahun: 2024,
      kepala_sekolah: 'Alice Smith',
      tgl_raport: '2024-01-01',
      semester: 'Ganjil',
      status: 'Active',
    },
  ]

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
                      {dummyData.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.tahun}</td>
                          <td>{item.kepala_sekolah}</td>
                          <td>{item.tgl_raport}</td>
                          <td>{item.semester}</td>
                          <td>
                            <span
                              className={`label bg-${
                                item.status === 'Active' ? 'green' : 'red'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-success btn-sm">
                              Edit
                            </button>
                            <button className="btn btn-info btn-sm">
                              Active
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
