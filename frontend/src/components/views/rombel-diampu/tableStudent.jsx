'use client'
import { useState } from 'react'
import AddNilaiModal from './inputNilaiModal'
const StudentTable = () => {
  const kelompokSiswa = [
    {
      id: 1,
      siswa: {
        nis: '1234567890',
        nama: 'John Doe',
      },
      statusNilai: 'Belum Diinput',
    },
    {
      id: 2,
      siswa: {
        nis: '0987654321',
        nama: 'Jane Doe',
      },
      statusNilai: 'Sudah Diinput',
    },
    {
      id: 3,
      siswa: {
        nis: '5432167890',
        nama: 'Alice Smith',
      },
      statusNilai: 'Belum Diinput',
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
      <table className="table table-bordered table-striped" id="kelompok_siswa">
        <thead>
          <tr>
            <th className="text-center">No</th>
            <th className="text-center">NIS</th>
            <th className="text-center">Nama Siswa</th>
            <th className="text-center">Status Nilai</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kelompokSiswa.map((item, index) => (
            <tr key={index} className="text-center">
              <td>{index + 1}</td>
              <td>{item.siswa.nis}</td>
              <td>{item.siswa.nama}</td>
              <td>{item.statusNilai}</td>
              <td>
                <button onClick={openModal} className="btn btn-success btn-sm">
                  <span className="glyphicon glyphicon-plus"></span> Input Nilai
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddNilaiModal
        isOpen={isOpenAddModal}
        closeModal={closeModal}
      ></AddNilaiModal>
    </>
  )
}

export default StudentTable
