import React, { useState } from 'react'
import { Button, Modal, Space, Table } from 'antd'
import AddSubjectModal from './addSubjectModal'
import useAuth from '@/hooks/useAuth'
import { useModulAjars } from '@/hooks/useModulAjar'
import { useJadwalAjars } from '@/hooks/useJadwalAjar'
import { formatDateWithIndonesianMonthAndDay } from '@/lib/helperDate'
import UpdateJadwalModal from './updateJadwalModal'
import jadwalAjarService from '@/services/jadwal-ajar.service'
import JadwalAjarModal from './jadwalAjarTable'

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
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)

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

  const openModalDetail = (jadwal) => {
    setSelectedJadwal(jadwal)
    setIsOpenDetailModal(true)
  }

  const closeModalDetail = () => {
    setIsOpenDetailModal(false)
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
      title: 'Minggu ke-',
      dataIndex: 'minggu',
      key: 'minggu',
    },
    {
      title: 'Tanggal Mulai',
      dataIndex: 'tanggalMulai',
      key: 'tanggalMulai',
      render: (text, record) =>
        formatDateWithIndonesianMonthAndDay(new Date(record.tanggalMulai)),
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
      title: 'Aksi',
      key: 'action',
      render: (text, record, index) => (
        <Space size={'middle'}>
          {/* <Button
            type="primary"
            onClick={() => openModalDetail(record)}
            style={{ marginRight: '2px', marginLeft: '2px' }}
            icon={<i className="icon fa fa-eye"></i>}
          /> */}
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

      {isOpenEditModal && (
        <UpdateJadwalModal
          isOpen={isOpenEditModal}
          closeModal={closeModalEdit}
          modulAjars={modulAjars?.modulAjars}
          token={token}
          refetch={refetchJadwal}
          initialValues={selectedJadwal}
        ></UpdateJadwalModal>
      )}
      {isOpenDetailModal && (
        <JadwalAjarModal
          isOpen={isOpenDetailModal}
          closeModal={closeModalDetail}
          JadwalAjar={selectedJadwal}
        />
      )}
    </div>
  )
}

export default ActivitiesView
