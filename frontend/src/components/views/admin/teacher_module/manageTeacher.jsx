import { useState } from 'react'
import Swal from 'sweetalert2'
import AddGuruModal from './modal/addGuruModal'
import UpdateGuruModal from './modal/updateGuruModal'
import teacherService from '@/services/teacherService/teacher.service'
import useAuth from '@/hooks/useAuth'

const ManageTeacher = ({ listTeacher }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [gurus, setGurus] = useState(listTeacher)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const { token } = useAuth()

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

  const handleNonactiveUserClick = async (idUser, status) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan mengubah status menjadi Nonactive!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, nonaktifkan!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          status,
        }
        const result = await teacherService.updateStatusAkun(
          token,
          idUser,
          payload
        )
        console.log(result)
        if (result.message === 'OK') {
          setGurus(
            gurus.map((teacher) => {
              if (teacher.idUser === idUser) {
                return {
                  ...teacher,
                  status,
                }
              }
              return teacher
            })
          )
          Swal.fire(
            'Update Status!',
            ` Status pengguna telah diubah menjadi ${status}`,
            'success'
          )
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan status pengguna.', 'error')
      }
    })
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus data guru ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResult = await teacherService.delete(token, id)
        console.log(deleteResult)
        if (deleteResult.message === 'OK') {
          setGurus((prevGurus) => prevGurus.filter((guru) => guru.id !== id))
          Swal.fire('Terhapus!', 'Data guru telah berhasil dihapus.', 'success')
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Data guru tidak terhapus.', 'error')
      }
    })
  }

  return (
    <>
      <div className="box-body">
        <div style={{ margin: '0 20px 20px 20px' }}>
          <button type="button" className="btn btn-success" onClick={openModal}>
            <i className="icon fa fa-plus"></i> Tambah
          </button>
        </div>

        <table id="guru" className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>NIP</th>
              <th>Nama</th>
              <th>Status User</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {gurus.map((teacher, index) => (
              <tr key={teacher.id}>
                <td>{index + 1}</td>
                <td>{teacher.nip}</td>
                <td>{teacher.nama}</td>
                <td>
                  <small
                    className={`label pull-center ${
                      teacher.status === 'AKTIF' ? 'bg-green' : 'bg-yellow'
                    }`}
                  >
                    {teacher.status}
                  </small>
                </td>
                <td>
                  <button
                    style={{ marginRight: '2px', marginLeft: '2px' }}
                    className="btn btn-primary btn-sm edit"
                    onClick={() => openUpdateModal(teacher)}
                  >
                    <i className="icon fa fa-edit"></i>
                  </button>
                  <button
                    style={{ marginRight: '2px', marginLeft: '2px' }}
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(teacher.id)}
                  >
                    <i className="icon fa fa-trash"></i>
                  </button>
                  <button
                    style={{ marginRight: '2px', marginLeft: '2px' }}
                    className={`btn btn-${
                      teacher.status === 'AKTIF' ? 'warning' : 'success'
                    } btn-sm`}
                    onClick={
                      teacher.status === 'AKTIF'
                        ? () =>
                            handleNonactiveUserClick(
                              teacher.idUser,
                              'TIDAK_AKTIF'
                            )
                        : () =>
                            handleNonactiveUserClick(teacher.idUser, 'AKTIF')
                    }
                  >
                    <span className="glyphicon glyphicon-user"></span>{' '}
                    {teacher.status === 'AKTIF' ? 'Nonactive' : 'Active'} User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* add guru */}
      <AddGuruModal
        isOpen={isAddModalOpen}
        closeModal={closeModal}
        setGurus={setGurus}
      ></AddGuruModal>
      {/* update guru */}
      <UpdateGuruModal
        setGurus={setGurus}
        closeModal={closeUpdateModal}
        isOpen={isUpdateModalOpen}
        teacherData={selectedTeacher}
      ></UpdateGuruModal>
    </>
  )
}

export default ManageTeacher
