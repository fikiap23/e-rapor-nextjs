'use client'
import Swal from 'sweetalert2'
import { useState } from 'react'
import AddGuruModal from './addGuruModal'

const TeacherView = () => {
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
    <div className="content-wrapper" id="guru">
      <section className="content">
        <div className="callout callout-info">
          <h4>
            <i className="icon fa fa-info-circle"></i> Informasi Penting !!!
          </h4>
          <p>
            1. Untuk Login Guru (PNS) gunakan{' '}
            <b>username : NIP dan password : guru123 </b>
          </p>
          <p>
            2. Untuk Login Guru (Honor) gunakan{' '}
            <b>username : NIK dan password : guru123 </b>
          </p>
          <p>
            3. <b>PASTIKAN GURU SUDAH AKTIF!! </b>
          </p>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-user"></i>{' '}
                  <span style={{ marginLeft: '10px' }}> Data Guru </span>
                </h3>
              </div>
              <div className="box-body">
                <div style={{ margin: '0 20px 20px 20px' }}>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={openModal}
                  >
                    <i className="icon fa fa-plus"></i> Tambah
                  </button>
                </div>
                {/* {showForm && (
                  <form>
                    <div className="form-group">
                      <label htmlFor="nip">NIP</label>
                      <input type="text" className="form-control" id="nip" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nama">Nama</label>
                      <input type="text" className="form-control" id="nama" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="status">Status User</label>
                      <select className="form-control" id="status">
                        <option value="Active">Aktif</option>
                        <option value="Nonactive">Nonaktif</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                )} */}

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
                        <small className="label pull-center bg-green">
                          Aktif
                        </small>
                      </td>
                      <td>
                        <button className="btn btn-success btn-sm edit">
                          <span className="glyphicon glyphicon-pencil"></span>{' '}
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm">
                          <span className="glyphicon glyphicon-remove"></span>{' '}
                          Delete
                        </button>
                        <button className="btn btn-primary btn-sm">
                          <span className="glyphicon glyphicon-user"></span>{' '}
                          Nonactive User
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>1234567890</td>
                      <td>1234567890</td>
                      <td>MUHAMMAD KEMAL</td>
                      <td>
                        <small className="label pull-center bg-yellow">
                          Nonaktif
                        </small>
                      </td>
                      <td>
                        <button
                          style={{ marginRight: '2px', marginLeft: '2px' }}
                          className="btn btn-success btn-sm edit"
                        >
                          <span className="glyphicon glyphicon-pencil"></span>{' '}
                          Edit
                        </button>
                        <button
                          style={{ marginRight: '2px', marginLeft: '2px' }}
                          className="btn btn-danger btn-sm"
                        >
                          <span className="glyphicon glyphicon-remove"></span>{' '}
                          Delete
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={handleNonactiveUserClick}
                        >
                          <span className="glyphicon glyphicon-user"></span>{' '}
                          Nonactive User
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* add guru */}
      <AddGuruModal isOpen={isModalOpen} closeModal={closeModal}></AddGuruModal>
    </div>
  )
}

export default TeacherView
