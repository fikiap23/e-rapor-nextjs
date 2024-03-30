'use client'
import { useState } from 'react'
import React from 'react'
import AddGuruToRombelModal from './addGuruToRombelModal'
import useAuth from '@/hooks/useAuth'
import { useGetAllRombelWithGuru } from '@/services/rombelService/useRombelGuru'
import Loading from '@/components/shared/Loading'
const TeacherTable = () => {
  const { token } = useAuth()
  const {
    data: listRombel,
    error: errorRombel,
    isFetching: isFetchingRombel,
    refetch: refetchRombel,
  } = useGetAllRombelWithGuru(token)
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
        {isFetchingRombel && <Loading />}
        <table id="ekstra" className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Rombel</th>
              <th>NIP Guru</th>
              <th>Nama Guru</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {!isFetchingRombel &&
              listRombel.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.guru?.nip || 'N/A'}</td>
                  <td>{item.guru?.nama || 'N/A'}</td>
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
        refetch={refetchRombel}
      ></AddGuruToRombelModal>
    </>
  )
}

export default TeacherTable
