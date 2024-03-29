'use client'
import { useState } from 'react'
import React from 'react'
import AddGuruToRombelModal from './addGuruToRombelModal'
const TeacherTable = () => {
  // Data dummy untuk digunakan dalam tabel
  const wali_kelas = [
    { id: 1, kelas: 'Rombel A', guru: 'Guru A' },
    { id: 2, kelas: 'Rombel B', guru: 'Guru B' },
    { id: 3, kelas: 'Rombel C', guru: 'Guru C' },
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
      <div className="box-body">
        <div style={{ margin: '0 20px 20px 20px' }}>
          <button type="button" className="btn btn-success" onClick={openModal}>
            <i className="icon fa fa-plus"></i> Tambah
          </button>
        </div>
        <table id="ekstra" className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Rombel</th>
              <th>Nama Guru</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {wali_kelas.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.kelas}</td>
                <td>{item.guru}</td>
                <td>
                  <button className="btn btn-danger btn-sm">
                    <i className="icon fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* add guru */}
      <AddGuruToRombelModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      ></AddGuruToRombelModal>
    </>
  )
}

export default TeacherTable
