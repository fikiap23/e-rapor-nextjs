'use client'
import Swal from 'sweetalert2'
import { useState } from 'react'
import AddSubjectModal from './component/addSubjectModal'

const SubjectView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus siswa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Data Dihapus!', 'Siswa telah dihapus.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan pada data siswa.', 'error')
      }
    })
  }

  function potongString(str) {
    if (str.length > 20) {
      return str.substring(0, 20) + '...'
    } else {
      return str
    }
  }

  return (
    <div className="content-wrapper" id="guru">
      <section className="content">
        <div className="callout callout-info">
          <h4>
            <i className="icon fa fa-info-circle"></i> Informasi Penting !!!
          </h4>
          <p>
            1. Silahkan memilih menu <b>Tambah</b> jika ingin menambahkan Mata
            Pelajaran
          </p>
          <p>
            2. Mata pelajaran ini nantinya akan digunakan untuk dalam membuat
            modul
          </p>
          <p>
            3. Modul ajar akan ditambahkan oleh guru sesuai dengan mata
            pelajaran
          </p>
          <p>
            4. Contoh Mata Pelajaran : <b>AGAMA DAN BUDI PEKERTI</b>
          </p>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="box box-solid box-primary">
              <div className="box-body table-responsive no-padding">
                <div style={{ margin: '10px 10px' }}>
                  <button
                    type="button"
                    className="btn bg-green"
                    onClick={openModal}
                  >
                    <i className="icon fa fa-plus"></i> Tambah
                  </button>
                  {/* <span style={{color: 'red', fontStyle: 'italic', marginLeft: '10px'}}>*modul ajar belum lengkap sampai 14 minggu</span> */}
                </div>
                <table id="siswa" className="table table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Mata Pelajaran</th>
                      <th>Capaian Pembelajaran</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>AGAMA DAN BUDI PEKERTI</td>
                      <td>{`${potongString(
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, numquam? Veniam explicabo sapiente non ullam quibusdam, blanditiis unde eveniet enim debitis tempora? Veritatis, cum quis nulla debitis dolorem ex molestias?'
                      )}`}</td>

                      <td>
                        <button
                          style={{
                            marginRight: '2px',
                            marginLeft: '2px',
                          }}
                          type="button"
                          className="btn btn-success"
                        >
                          <i className="icon fa fa-eye"></i>
                        </button>
                        <button
                          style={{
                            marginRight: '2px',
                            marginLeft: '2px',
                          }}
                          type="button"
                          className="btn btn-primary"
                          // onClick={handleDelete}
                        >
                          <i className="icon fa fa-edit"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleDelete}
                        >
                          <i className="icon fa fa-trash"></i>
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
      {/* ADD MODUL AJAR */}
      <AddSubjectModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      ></AddSubjectModal>
    </div>
  )
}

export default SubjectView
