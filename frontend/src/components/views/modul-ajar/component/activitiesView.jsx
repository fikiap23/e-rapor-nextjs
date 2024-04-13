import React, { useState } from 'react'
import { Button, Modal, Space, Table } from 'antd'
import AddSubjectModal from './addSubjectModal'
import useAuth from '@/hooks/useAuth'
import { useModulAjars } from '@/hooks/useModulAjar'
import { useJadwalAjars } from '@/hooks/useJadwalAjar'
import { formatDate } from '@/lib/helperDate'
import UpdateJadwalModal from './updateJadwalModal'
import jadwalAjarService from '@/services/jadwal-ajar.service'

const ActivitiesView = ({ idRombelSemesterGuru }) => {
  const { token } = useAuth()
  const { data: modulAjars, isFetching: isFetchingModulAjars } = useModulAjars(
    token,
    idRombelSemesterGuru
  )

  const {
    data: jadwalAjars,
    isFetching: isFetchingJadwal,
    refetch: refetchJadwal,
  } = useJadwalAjars(token, idRombelSemesterGuru)
  const [selectedJadwal, setSelectedJadwal] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModalEdit = (jadwal) => {
    setSelectedJadwal(jadwal)
    setIsOpenEditModal(true)
  }

  const closeModalEdit = () => {
    setIsOpenEditModal(false)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: 'Anda akan menghapus data jadwal ajar!',
      okText: 'Ya, hapus!',
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        await jadwalAjarService
          .delete(token, id)
          .then(() => {
            Modal.success({
              title: 'Berhasil',
              content: 'Data jadwal ajar telah dihapus.',
            })
            refetchJadwal()
          })
          .catch((err) => {
            Modal.error({
              title: 'Gagal',
              content: err,
            })
          })
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
      title: 'Hari',
      dataIndex: 'hari',
      key: 'hari',
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
      render: (text, record) => formatDate(new Date(record.tanggal)),
    },
    {
      title: 'Topik',
      dataIndex: 'topik',
      key: 'topik',
    },
    {
      title: 'Sub Topik',
      dataIndex: 'subtopik',
      key: 'subtopik',
    },
    {
      title: 'Kegiatan Inti',
      dataIndex: 'kegiatanInti',
      key: 'kegiatanInti',
      render: (text, record, index) => (
        <div>
          {text.map((kegiatan, idx) => (
            <p key={idx}>
              {idx + 1}. {kegiatan}
            </p>
          ))}
        </div>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record, index) => (
        <Space size={'middle'}>
          <Button
            type="primary"
            icon={<i className="icon fa fa-edit"></i>}
            onClick={() => openModalEdit(record)}
            style={{ marginRight: '2px', marginLeft: '2px' }}
          />

          <Button
            danger
            icon={<i className="icon fa fa-trash"></i>}
            onClick={() => handleDelete(record.id)}
            style={{ marginRight: '2px', marginLeft: '2px' }}
          />
        </Space>
      ),
    },
  ]

  return (
    <div className="active tab-pane" id="activity">
      <div className="box-body table-responsive no-padding">
        <div style={{ margin: '0 20px 20px 20px' }}>
          <Button type="primary" onClick={openModal}>
            <i className="icon fa fa-plus"></i> Tambah
          </Button>
        </div>
        <Table
          dataSource={jadwalAjars}
          columns={columns}
          loading={isFetchingJadwal}
        />
      </div>
      {/* ADD MODUL AJAR */}

      <AddSubjectModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modulAjars={modulAjars?.modulAjars}
        token={token}
        refetch={refetchJadwal}
      ></AddSubjectModal>

      <UpdateJadwalModal
        isOpen={isOpenEditModal}
        closeModal={closeModalEdit}
        modulAjars={modulAjars?.modulAjars}
        token={token}
        refetch={refetchJadwal}
        defaultValues={selectedJadwal}
      ></UpdateJadwalModal>
    </div>
  )
}

export default ActivitiesView
