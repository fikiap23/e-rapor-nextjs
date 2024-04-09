'use client'
import { useState } from 'react'
import { Table, Button, Input, Modal } from 'antd'
import AddGroupModal from './modal/addGroupModal'
import useAuth from '@/hooks/useAuth'
import UpdateGroupModal from './modal/updateGroupModal'
import rombelService from '@/services/rombel.service'
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
  const [searchText, setSearchText] = useState('')

  const filteredKategories = listKategoriRombel.filter((semester) =>
    Object.values(semester).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  )

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
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: 'Anda akan menghapus data kelompok usia ini!',
      okText: 'Ya, hapus!',
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        try {
          await rombelService
            .deleteKategori(token, id)
            .then(() => {
              refetchKategoriRombel()
              Modal.success({
                title: 'Terhapus!',
                content: 'Data kelompok telah berhasil dihapus.',
              })
            })
            .catch((error) => {
              Modal.error({
                title: 'Terjadi Kesalahan',
                content: error,
              })
            })
        } catch (error) {
          Modal.error({
            title: 'Oops...',
            content: 'Terjadi Kesalahan',
          })
        }
      },
      onCancel: () => {},
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
            onClick={() => openUpdateModal(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
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
                  <div style={{ margin: '0 20px 20px 20px' }}>
                    <Input
                      placeholder="Cari kelompok usia..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      style={{ width: 200, marginRight: 10 }}
                    />
                  </div>
                  <Table
                    columns={columns}
                    dataSource={filteredKategories}
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
