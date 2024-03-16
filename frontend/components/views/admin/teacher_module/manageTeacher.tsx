'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import AddGuruModal from './addGuruModal'
const ManageTeacher = () => {
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
              <th>Nip dan Nik</th>
              <th>Username</th>
              <th>Nama</th>
              <th>Status User</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1234567890</td>
              <td>1234567890</td>
              <td>MUHAMMAD KEMAL PASHA</td>
              <td>
                <small className="label pull-center bg-green">Aktif</small>
              </td>
              <td>
                <button
                  style={{ marginRight: '2px', marginLeft: '2px' }}
                  className="btn btn-success btn-sm edit"
                >
                  {/* <span className="glyphicon glyphicon-pencil"></span>{' '}
                          Edit */}
                  <i className="icon fa fa-edit"></i>
                </button>
                <button
                  style={{ marginRight: '2px', marginLeft: '2px' }}
                  className="btn btn-danger btn-sm"
                >
                  {/* <span className="glyphicon glyphicon-remove"></span>{' '}
                          Delete */}
                  <i className="icon fa fa-trash"></i>
                </button>
                <button
                  style={{ marginRight: '2px', marginLeft: '2px' }}
                  className="btn btn-primary btn-sm"
                >
                  <span className="glyphicon glyphicon-user"></span> Nonactive
                  User
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>1234567890</td>
              <td>1234567890</td>
              <td>MUHAMMAD KEMAL</td>
              <td>
                <small className="label pull-center bg-yellow">Nonaktif</small>
              </td>
              <td>
                <button
                  style={{ marginRight: '2px', marginLeft: '2px' }}
                  className="btn btn-success btn-sm edit"
                >
                  {/* <span className="glyphicon glyphicon-pencil"></span>{' '}
                          Edit */}
                  <i className="icon fa fa-edit"></i>
                </button>
                <button
                  style={{ marginRight: '2px', marginLeft: '2px' }}
                  className="btn btn-danger btn-sm"
                >
                  {/* <span className="glyphicon glyphicon-remove"></span>{' '} */}
                  <i className="icon fa fa-trash"></i>
                </button>
                <button
                  style={{ marginRight: '2px', marginLeft: '2px' }}
                  className="btn btn-primary btn-sm"
                  onClick={handleNonactiveUserClick}
                >
                  <span className="glyphicon glyphicon-user"></span> Nonactive
                  User
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* add guru */}
      <AddGuruModal isOpen={isModalOpen} closeModal={closeModal}></AddGuruModal>
    </>
  )
}

export default ManageTeacher
