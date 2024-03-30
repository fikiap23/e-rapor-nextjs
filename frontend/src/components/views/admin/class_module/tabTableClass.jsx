'use client'
import Link from 'next/link'
import UpdateClassModal from './modal/updateClassModal'
import { useState } from 'react'

export default function TabTableClass({ rombels, openModal, setRombels }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRombel, setSelectedRombel] = useState(null)
  return (
    <div className="box-body">
      <div style={{ margin: '0 20px 20px 20px' }}>
        <button type="button" className="btn btn-success" onClick={openModal}>
          <span className="glyphicon glyphicon-plus"></span>
          Tambah
        </button>
      </div>
      <table id="Rombel" className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Kelompok Usia</th>
            <th>Rombel</th>
            <th>Kuota</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rombels.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.kelompokUsia}</td>
              <td>{item.name}</td>
              <td>{`${item.coutMurid}/${item.kuota}`}</td>
              <td style={{ display: 'flex', gap: '5px' }}>
                <button
                  style={{ marginRight: '2px', marginLeft: '2px' }}
                  className="btn btn-primary btn-sm edit"
                  onClick={() => {
                    setSelectedRombel(item)
                    setIsModalOpen(true)
                  }}
                >
                  <i className="icon fa fa-edit"></i>
                </button>
                <Link
                  className="btn btn-success btn-sm"
                  href={`/admin/class/add_student/${item.id}`}
                >
                  {item.isFull ? 'Lihat Siswa' : 'Tambah Siswa'}
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  // onClick={() => deleteRombel(item.id)}
                >
                  <i className="icon fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateClassModal
        setRombels={setRombels}
        selectedRombel={selectedRombel}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      ></UpdateClassModal>
    </div>
  )
}
