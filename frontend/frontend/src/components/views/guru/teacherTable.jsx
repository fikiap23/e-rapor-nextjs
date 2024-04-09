import React, { useState } from 'react'
import { Button, Table, Modal, message, Input, Space } from 'antd'
import useAuth from '@/hooks/useAuth'
import rombelService from '@/services/rombel.service'
import { useGetAllRombelWithGuru } from '@/hooks/useRombelGuru'
import { useRombelsNotRelationWithGuru } from '@/hooks/useRombelGuruNotRelation'
import AddGuruToRombelModal from './addGuruToRombelModal'
import UpdateGuruToRombelModal from './modal/updateGuruToRombelModal'

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [searchText, setSearchText] = useState('')
  const filteredRombels = listRombel.filter((rombel) => {
    const rombelValues = Object.values(rombel)
    const guruValues = rombel?.guru ? Object.values(rombel.guru) : []

    return (
      rombelValues.some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchText.toLowerCase())
      ) ||
      guruValues.some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchText.toLowerCase())
      )
    )
  })

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
  }

  const openUpdateModal = (data) => {
    setSelectedData(data)
    setIsUpdateModalOpen(true)
  }

  const closeUpdateModal = () => {
    setSelectedData(null)
    setIsUpdateModalOpen(false)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: 'Anda akan menghapus guru di rombel ini!',
      okText: 'Ya, hapus!',
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        await rombelService.deleteRombelSemesterGuru(token, id)
        refetchGuruRombel()
        refetchRombel()
        message.success('Data Dihapus! Rombel telah dikosongkan.')
      },
    })
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Rombel',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'NIP Guru',
      dataIndex: ['guru', 'nip'],
      key: 'nip',
      sorter: (a, b) => {
        const nipA = a.guru?.nip || ''
        const nipB = b.guru?.nip || ''
        return nipA.localeCompare(nipB)
      },
      render: (text) => <span>{text || 'N/A'}</span>,
    },
    {
      title: 'Nama Guru',
      dataIndex: ['guru', 'nama'],
      key: 'nama',
      sorter: (a, b) => {
        const nameA = a.guru?.nama || ''
        const nameB = b.guru?.nama || ''
        return nameA.localeCompare(nameB)
      },
      render: (text) => <span>{text || 'N/A'}</span>,
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
      sorter: (a, b) => {
        const semesterA = a.semester || ''
        const semesterB = b.semester || ''
        return semesterA.localeCompare(semesterB)
      },
      render: (text) => <span>{text || 'N/A'}</span>,
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
    <>
      <div className="box-body">
        <div style={{ margin: '0 20px 20px 20px' }}>
          <Button type="primary" onClick={openAddModal}>
            Tambah
          </Button>
        </div>
        <div style={{ margin: '0 20px 20px 20px' }}>
          <Input
            placeholder="Cari guru..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200, marginRight: 10 }}
          />
        </div>
        <Table
          scroll={{ x: 1000 }}
          dataSource={filteredRombels}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          loading={isFetchingRombel || isFetchingGuruRombel}
        />
      </div>
      {/* add guru */}
      {isAddModalOpen && !isFetchingGuruRombel && (
        <AddGuruToRombelModal
          isOpen={isAddModalOpen}
          closeModal={closeAddModal}
          refetch={refetchRombel}
          refetchGuruRombel={refetchGuruRombel}
          token={token}
          listGuruRombel={listGuruRombel}
        />
      )}
      {/* update guru */}
      {isUpdateModalOpen && !isFetchingGuruRombel && (
        <UpdateGuruToRombelModal
          isOpen={isUpdateModalOpen}
          closeModal={closeUpdateModal}
          refetch={refetchRombel}
          refetchGuruRombel={refetchGuruRombel}
          token={token}
          listGuruRombel={listGuruRombel}
          selectedData={selectedData}
        />
      )}
    </>
  )
}

export default TeacherTable
