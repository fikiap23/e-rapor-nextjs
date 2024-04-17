import { useState } from 'react'
import { Button, Table, Tag, Modal, Input, Flex } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import AddGuruModal from './modal/addGuruModal'
import UpdateGuruModal from './modal/updateGuruModal'
import useAuth from '@/hooks/useAuth'
import { useGetAllTeacherData } from '@/hooks/useTeacher'
import teacherService from '@/services/guru.service'

const { confirm } = Modal

const ManageTeacher = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const { token } = useAuth()
  const {
    data: listTeacher,
    error: errorTeacher,
    isFetching: isFetchingTeacher,
    refetch: refetchTeacher,
  } = useGetAllTeacherData(token)

  const [searchText, setSearchText] = useState('')
  const filteredTeachers = listTeacher.filter((teacher) =>
    Object.values(teacher).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  )

  const openModal = () => {
    setIsAddModalOpen(true)
  }

  const closeModal = () => {
    setIsAddModalOpen(false)
  }

  const openUpdateModal = (teacher) => {
    setSelectedTeacher(teacher)
    setIsUpdateModalOpen(true)
  }

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false)
  }

  const showConfirm = (title, content, onOk) => {
    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      onOk,
      onCancel() {},
    })
  }

  const handleNonactiveUserClick = async (idUser, status) => {
    showConfirm(
      'Apakah Anda yakin?',
      `Anda akan MENG${status}kAN pengguna ini!`,
      async () => {
        const payload = {
          status,
        }
        await teacherService.updateStatusAkun(token, idUser, payload)
        refetchTeacher()
        Modal.success({
          content: `Status pengguna telah diubah menjadi ${status}`,
        })
      }
    )
  }

  const handleDelete = async (id) => {
    showConfirm(
      'Apakah Anda yakin?',
      'Anda akan menghapus data guru ini!',
      async () => {
        await teacherService
          .delete(token, id)
          .then((res) => {
            refetchTeacher()
            Modal.success({
              title: 'Success',
              content: 'Data guru telah berhasil dihapus.',
            })
          })
          .catch((error) => {
            Modal.error({
              content: error,
              title: 'Oops...',
            })
          })
      }
    )
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'NIP',
      dataIndex: 'nip',
      key: 'nip',
      sorter: (a, b) => a.nip.localeCompare(b.nip),
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
      sorter: (a, b) => a.nama.localeCompare(b.nama),
    },
    {
      title: 'Status User',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'AKTIF',
          value: 'AKTIF',
        },
        {
          text: 'TIDAK AKTIF',
          value: 'TIDAK_AKTIF',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => (
        <Tag color={record.status === 'AKTIF' ? 'green' : 'yellow'}>
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => openUpdateModal(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Hapus
          </Button>
          <Button
            type={record.status === 'AKTIF' ? 'default' : 'primary'}
            onClick={() =>
              handleNonactiveUserClick(
                record.idUser,
                record.status === 'AKTIF' ? 'TIDAK_AKTIF' : 'AKTIF'
              )
            }
            style={{ marginLeft: 8 }}
          >
            {record.status === 'AKTIF' ? 'Nonactive' : 'Active'} User
          </Button>
        </span>
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
              onClick={openModal}
              icon={<i className="fa fa-plus"></i>}
            >
              Tambah
            </Button>
          </div>
        </Flex>
        <Table
          columns={columns}
          dataSource={filteredTeachers}
          loading={isFetchingTeacher}
          scroll={{ x: 1000 }}
        />
      </div>
      {/* add guru */}
      <AddGuruModal
        isOpen={isAddModalOpen}
        closeModal={closeModal}
        refetch={refetchTeacher}
        token={token}
      ></AddGuruModal>
      {/* update guru */}
      <UpdateGuruModal
        refetch={refetchTeacher}
        closeModal={closeUpdateModal}
        isOpen={isUpdateModalOpen}
        teacherData={selectedTeacher}
      ></UpdateGuruModal>
    </>
  )
}

export default ManageTeacher
