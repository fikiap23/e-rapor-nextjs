import React, { useState } from 'react'
import { Button, Table, Modal, message, Space } from 'antd'
import AddTujuanModal from './addTujuanModal'
import cpTpService from '@/services/cp-tp.service'
import UpdateTujuanModal from './updateTujuanModal'

const TujuanPage = ({ cp, token, isLoading, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedTp, setSelectedTp] = useState(null)

  const openUpdateModal = (tp) => {
    setSelectedTp(tp)
    setIsUpdateModalOpen(true)
  }

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: 'Anda akan menghapus Tujuan pembelajaran ini!',
      okText: 'Ya, hapus!',
      okType: 'danger',
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        try {
          await cpTpService.deleteTp(token, id)
          refetch()
          message.success('Tujuan pembelajaran telah dihapus.')
        } catch (error) {
          message.error('Gagal menghapus tujuan pembelajaran.')
        }
      },
      onCancel: () => {},
    })
  }

  const columns = [
    {
      title: 'Minggu',
      dataIndex: 'minggu',
      key: 'minggu',
    },
    {
      title: 'NILAI AGAMA DAN BUDI PEKERTI',
      dataIndex: 'tujuanPembelajaranAgamaBudipekerti',
      key: 'tujuanPembelajaranAgamaBudipekerti',
    },
    {
      title: 'JATI DIRI',
      dataIndex: 'tujuanPembelajaranJatiDiri',
      key: 'tujuanPembelajaranJatiDiri',
    },
    {
      title: 'DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN SENI',
      dataIndex: 'tujuanPembelajaranLiterasiSains',
      key: 'tujuanPembelajaranLiterasiSains',
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => openUpdateModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Hapus
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="active tab-pane" id="activity">
      <div className="box-body table-responsive no-padding">
        <div style={{ margin: '0 20px 20px 20px' }}>
          <Button type="primary" onClick={openModal}>
            Tambah
          </Button>
        </div>
        <Table
          dataSource={cp?.tujuanPembelajaran}
          columns={columns}
          pagination={false}
          rowKey="id"
          scroll={{ x: 1200 }}
          loading={isLoading}
        />
      </div>
      <AddTujuanModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        refetch={refetch}
        token={token}
      />

      {isUpdateModalOpen && selectedTp && (
        <UpdateTujuanModal
          token={token}
          refetch={refetch}
          isOpen={isUpdateModalOpen}
          closeModal={closeUpdateModal}
          tujuan={selectedTp}
        />
      )}
    </div>
  )
}

export default TujuanPage
