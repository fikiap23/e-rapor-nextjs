'use client'
import { useState } from 'react'
import AddClassModal from './addClassModal'

export default function ClassView() {
  const Rombel = [
    { id: 1, tingkat: 'Usia 2-3', rombel: 'Rombel A1' },
    { id: 2, tingkat: 'Usia 3-4', rombel: 'Rombel B1' },
    { id: 3, tingkat: 'Usia 4-5', rombel: 'Rombel C1' },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div
            className="flash-data"
            data-flashdata=""
            data-flashstatus=""
          ></div>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-home"></i> Data Rombel
                  </h3>
                </div>
                <div className="box-body">
                  <div style={{ margin: '0 20px 20px 20px' }}>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-toggle="modal"
                      data-target="#add-modal"
                      onClick={openModal}
                    >
                      <span className="glyphicon glyphicon-plus"></span>
                      Tambah
                    </button>
                  </div>
                  <table
                    id="Rombel"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Kelompok Usia</th>
                        <th>Rombel</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Rombel.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.tingkat}</td>
                          <td>{item.rombel}</td>
                          <td>
                            <a href="#" className="btn btn-success btn-sm">
                              <span className="glyphicon glyphicon-pencil"></span>
                              Edit
                            </a>
                            <button
                              className="btn btn-danger btn-sm"
                              // onClick={() => deleteRombel(item.id)}
                            >
                              <span className="glyphicon glyphicon-remove"></span>
                              Hapus
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
        {/* add class */}
        <AddClassModal
          isOpen={isModalOpen}
          closeModal={closeModal}
        ></AddClassModal>
      </div>
    </>
  )
}
