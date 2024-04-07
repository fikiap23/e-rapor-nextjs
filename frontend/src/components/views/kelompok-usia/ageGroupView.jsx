'use client'
import { useEffect, useState } from 'react'
import { Table, Button } from 'antd'
import AddGroupModal from './modal/addGroupModal'
import useAuth from '@/hooks/useAuth'
import UpdateGroupModal from './modal/updateGroupModal'
import Swal from 'sweetalert2'
import rombelService from '@/services/rombel.service'
import Loading from '@/components/shared/Loading'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
import { useGetAllKategoriRombel } from '@/hooks/useKategoriRombel'

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

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Kelompok Usia',
      dataIndex: 'kelompokUsia',
      key: 'kelompokUsia',
      sorter: (a, b) => a.kelompokUsia.localeCompare(b.kelompokUsia),
    },
    {
      title: 'Kode',
      dataIndex: 'kode',
      key: 'kode',
      sorter: (a, b) => a.kode.localeCompare(b.kode),
    },
    {
      title: 'Aksi',

      key: 'action',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => openUpdateModal(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ]

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
                  <Table
                    columns={columns}
                    dataSource={Kategories}
                    rowKey="id"
                    loading={isFetchingKategoriRombel}
                    scroll={{ x: 800 }}
                    pagination={{ pageSize: 10 }}
                  />
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
