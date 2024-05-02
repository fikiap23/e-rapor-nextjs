import React, { useState } from 'react'
import { Button, Table, Modal, message, Input, Space, Flex } from 'antd'
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
  const [startIndex, setStartIndex] = useState(0)
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

  const handlePaginationChange = (page, pageSize) => {
    setStartIndex(pageSize * (page - 1))
  }
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => <span>{startIndex + index + 1}</span>,
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
        <Flex justify="space-between" align="center">
          <div style={{ margin: '0 20px 20px 0px' }}>
            <Input.Search
              placeholder="Cari Guru..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div style={{ margin: '0 20px 20px 0px' }}>
            <Button
              type="primary"
              // className="btn btn-success"
              onClick={openAddModal}
              icon={<i className="fa fa-plus"></i>}
            >
              Tambah
            </Button>
          </div>
        </Flex>
        <Table
          dataSource={filteredRombels}
          columns={columns}
          loading={isFetchingRombel || isFetchingGuruRombel}
          pagination={{
            onChange: handlePaginationChange,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} dari ${total} data`,
          }}
          scroll={{ x: 1000 }}
        />
      </div>
      {/* add guru */}
      {isAddModalOpen && (
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
      {isUpdateModalOpen && (
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
