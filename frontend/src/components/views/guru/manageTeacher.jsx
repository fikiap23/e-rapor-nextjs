import { useState } from 'react'
import { Button, Table, Tag, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import AddGuruModal from './modal/addGuruModal'
import UpdateGuruModal from './modal/updateGuruModal'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/shared/Loading'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
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
        const deleteResult = await teacherService.delete(token, id)
        console.log(deleteResult)
        if (deleteResult.message === 'OK') {
          refetchTeacher()
          Modal.success({ content: 'Data guru telah berhasil dihapus.' })
        }
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
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Status User',
      dataIndex: 'status',
      key: 'status',
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
        <div style={{ margin: '0 20px 20px 20px' }}>
          <Button type="primary" onClick={openModal}>
            Tambah
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={listTeacher}
          loading={isFetchingTeacher}
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
