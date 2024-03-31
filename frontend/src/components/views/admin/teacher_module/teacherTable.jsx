'use client'
import { useState } from 'react'
import React from 'react'
import AddGuruToRombelModal from './addGuruToRombelModal'
import useAuth from '@/hooks/useAuth'
import { useGetAllRombelWithGuru } from '@/services/rombelService/useRombelGuru'
import Loading from '@/components/shared/Loading'
import Swal from 'sweetalert2'
import rombelService from '@/services/rombelService/rombel.service'
import { useRombelsNotRelationWithGuru } from '@/services/rombelService/useRombelGuruNotRelation'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
const TeacherTable = () => {
  const { token } = useAuth()
  const {
    data: listRombel,
    error: errorRombel,
    isFetching: isFetchingRombel,
    refetch: refetchRombel,
  } = useGetAllRombelWithGuru(token)
  const {
    data: listGuruRombel,
    error: errorGuruRombel,
    isFetching: isFetchingGuruRombel,
    refetch: refetchGuruRombel,
  } = useRombelsNotRelationWithGuru(token)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus guru di rombel ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          idGuru: null,
        }
        await rombelService.updateRombel(token, id, payload)
        refetchGuruRombel()
        refetchRombel()
        Swal.fire('Data Dihapus!', 'Rombel telah dikosongkan.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan pada data .', 'error')
      }
    })
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
        {!isFetchingRombel && listRombel && listRombel.length === 0 && (
          <EmptyDataIndicator message={'Belum ada data rombel'} />
        )}
        {!isFetchingGuruRombel && listRombel && listRombel.length > 0 && (
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
              {listRombel.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.guru?.nip || 'N/A'}</td>
                  <td>{item.guru?.nama || 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
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
      {/* add guru */}
      <AddGuruToRombelModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        refetch={refetchRombel}
        refetchGuruRombel={refetchGuruRombel}
        token={token}
        listGuruRombel={listGuruRombel}
      ></AddGuruToRombelModal>
    </>
  )
}

export default TeacherTable
