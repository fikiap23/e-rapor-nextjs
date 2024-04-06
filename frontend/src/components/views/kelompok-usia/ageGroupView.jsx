'use client'
import { useEffect, useState } from 'react'
import AddGroupModal from './modal/addGroupModal'
import useAuth from '@/hooks/useAuth'
import { useGetAllKategoriRombel } from '@/services/rombelService/useKategoriRombel'
import UpdateGroupModal from './modal/updateGroupModal'
import Swal from 'sweetalert2'
import rombelService from '@/services/rombel.service'
import Loading from '@/components/shared/Loading'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'

const AgeGroupView = () => {
  const { token } = useAuth()
  const {
    data: listKategoriRombel,
    error: errorKategoriRombel,
    isFetching: isFetchingKategoriRombel,
    refetch: refetchKategoriRombel,
  } = useGetAllKategoriRombel(token)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [selectedKategori, setSelectedKategori] = useState(null)
  const [Kategories, setKategories] = useState([])

  useEffect(() => {
    setKategories(listKategoriRombel)
  }, [listKategoriRombel])

  const openModal = () => {
    setIsOpenAddModal(true)
  }

  const closeModal = () => {
    setIsOpenAddModal(false)
  }

  const openUpdateModal = (kategori) => {
    setSelectedKategori(kategori)
    setIsOpenUpdateModal(true)
  }

  const closeModalUpdate = () => {
    setIsOpenUpdateModal(false)
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus data kelompok usia ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteResult = await rombelService.deleteKategori(token, id)
          if (deleteResult.message === 'OK') {
            refetchKategoriRombel()
            Swal.fire(
              'Terhapus!',
              'Data kelompok telah berhasil dihapus.',
              'success'
            )
          }
        } catch (error) {
          Swal.fire('Terjadi Kesalahan', error, 'error')
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Data kelompok tidak terhapus.', 'error')
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
                    <i className="fa fa-calendar"></i> Data Kelompok Usia
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
                  {isFetchingKategoriRombel && <Loading />}
                  {!isFetchingKategoriRombel &&
                    listKategoriRombel.length === 0 && (
                      <EmptyDataIndicator
                        message={'Belum ada data kelompok usia'}
                      />
                    )}
                  {!isFetchingKategoriRombel &&
                    listKategoriRombel &&
                    listKategoriRombel.length > 0 && (
                      <table
                        className="table table-bordered table-striped"
                        id="tahun"
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Kelompok Usia</th>
                            <th>Kode</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!isFetchingKategoriRombel &&
                            Kategories &&
                            Kategories.map((item, index) => (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.kelompokUsia}</td>
                                <td>{item.kode}</td>
                                <td>
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => openUpdateModal(item)}
                                  >
                                    <i className="icon fa fa-edit"></i>
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    style={{ marginLeft: '5px' }}
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
              </div>
            </div>
          </div>
        </section>
      </div>
      <AddGroupModal
        isOpen={isOpenAddModal}
        closeModal={closeModal}
        refetch={refetchKategoriRombel}
      ></AddGroupModal>
      <UpdateGroupModal
        isOpen={isOpenUpdateModal}
        closeModal={closeModalUpdate}
        refetch={refetchKategoriRombel}
        selectedKategori={selectedKategori}
        token={token}
      ></UpdateGroupModal>
    </>
  )
}
export default AgeGroupView
