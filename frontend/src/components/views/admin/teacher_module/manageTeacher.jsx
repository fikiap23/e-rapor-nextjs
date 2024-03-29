import { useState } from 'react'
import Swal from 'sweetalert2'
import AddGuruModal from './addGuruModal'

const ManageTeacher = ({ listTeacher }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleNonactiveUserClick = () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan mengubah status menjadi Nonactive!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, nonaktifkan!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Nonaktifkan!',
          'Status pengguna telah diubah menjadi Nonactive.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan status pengguna.', 'error')
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
            {listTeacher.map((teacher, index) => (
              <tr key={teacher.id}>
                <td>{index + 1}</td>
                <td>{teacher.nip}</td>
                <td>{teacher.nama}</td>
                <td>
                  <small
                    className={`label pull-center ${
                      teacher.user.status === 'AKTIF' ? 'bg-green' : 'bg-yellow'
                    }`}
                  >
                    {teacher.user.status}
                  </small>
                </td>
                <td>
                  <button
                    style={{ marginRight: '2px', marginLeft: '2px' }}
                    className="btn btn-primary btn-sm edit"
                  >
                    <i className="icon fa fa-edit"></i>
                  </button>
                  <button
                    style={{ marginRight: '2px', marginLeft: '2px' }}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="icon fa fa-trash"></i>
                  </button>
                  <button
                    style={{ marginRight: '2px', marginLeft: '2px' }}
                    className={`btn btn-${
                      teacher.status === 'Aktif' ? 'warning' : 'success'
                    } btn-sm`}
                    onClick={
                      teacher.status === 'Aktif'
                        ? handleNonactiveUserClick
                        : null
                    }
                  >
                    <span className="glyphicon glyphicon-user"></span>{' '}
                    {teacher.status === 'Aktif' ? 'Nonactive' : 'Active'} User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* add guru */}
      <AddGuruModal isOpen={isModalOpen} closeModal={closeModal}></AddGuruModal>
    </>
  )
}

export default ManageTeacher
