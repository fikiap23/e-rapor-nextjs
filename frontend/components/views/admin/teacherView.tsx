"use client"
import Swal from 'sweetalert2';
import { useState } from 'react';

const TeacherView = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    console.log('showForm', showForm);

    setShowForm(!showForm);
  };

  const handleNonactiveUserClick = () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan mengubah status menjadi Nonactive!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, nonaktifkan!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Nonaktifkan!',
          'Status pengguna telah diubah menjadi Nonactive.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Dibatalkan',
          'Tidak ada perubahan status pengguna.',
          'error'
        );
      }
    });
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="callout callout-info">
          <h4><i className="icon fa fa-info-circle"></i> Informasi Penting !!!</h4>
          <p>1. Untuk Login Guru (PNS) gunakan <b>username : NIP dan password : guru123 </b></p>
          <p>2. Untuk Login Guru (Honor) gunakan <b>username : NIK dan password : guru123 </b></p>
          <p>3. <b>PASTIKAN GURU SUDAH AKTIF!! </b></p>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title"><i className="fa fa-user"></i> <span style={{ marginLeft: '10px' }}> Data Guru </span></h3>
              </div>
              <div className="box-body">
                <div style={{ margin: '0 20px 20px 20px' }}>
                  <button type="button" className="btn btn-success" onClick={toggleForm}>
                    {/* <i className={`icon fa ${showForm ? 'fa-minus' : 'fa-plus'}`}></i> {showForm ? 'Tutup' : 'Tambah Baru'} */}
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
                          <button className="btn btn-success btn-sm edit">
                            <span className="glyphicon glyphicon-pencil"></span> Edit
                          </button>
                          <button className="btn btn-danger btn-sm">
                            <span className="glyphicon glyphicon-remove"></span> Delete
                          </button>
                          <button className="btn btn-primary btn-sm">
                            <span className="glyphicon glyphicon-user"></span> Nonactive User
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
                          <button style={{ marginRight: '2px', marginLeft: '2px' }} className="btn btn-success btn-sm edit">
                            <span className="glyphicon glyphicon-pencil"></span> Edit
                          </button>
                          <button style={{ marginRight: '2px', marginLeft: '2px' }} className="btn btn-danger btn-sm">
                            <span className="glyphicon glyphicon-remove"></span> Delete
                          </button>
                          <button className="btn btn-primary btn-sm" onClick={handleNonactiveUserClick}>
                            <span className="glyphicon glyphicon-user"></span> Nonactive User
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </table>



              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {showForm && (
          <div className="modal fade" id="modal-default">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Guru</h4>
                </div>
                <div className="modal-body">
                  <form role="form" action="/admin/guru" method="POST">
                    <div className="box-body">
                      <div className="form-group">
                        <label htmlFor="nip">NIP atau NIK</label>
                        <input type="number" className="form-control" id="nip" name="nip" placeholder="Masukan Nip atau Nik" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nama">Nama</label>
                        <input type="text" className="form-control" id="nama" name="nama" placeholder="Masukan Nama" required />
                      </div>
                      <div className="form-group">
                        <label>Jenis Kelamin</label>
                        <select required name="jk" className="form-control">
                          <option value="">--- Pilih Jenis Kelamin ---</option>
                          <option value="pria">Pria</option>
                          <option value="wanita">Wanita</option>
                        </select>
                      </div>
                    </div>
                    <div className="box-footer">
                      <button type="submit" className="btn btn-primary">Simpan</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        )}
      </section>

    </div>

  );
};

export default TeacherView;
