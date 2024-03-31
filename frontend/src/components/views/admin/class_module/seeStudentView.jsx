import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
import Loading from '@/components/shared/Loading'
import useAuth from '@/hooks/useAuth'
import { useOneRombel } from '@/services/rombelService/useOneRombel'
import siswaService from '@/services/studentService/student.service'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function SeeStudentView({ id }) {
  const { token } = useAuth()
  const [siswas, setSiswas] = useState([])

  const {
    data: rombelData,
    isFetching: isFetchingRombel,
    error: errorRombel,
    refetch: refetchRombel,
  } = useOneRombel(token, id)

  useEffect(() => {
    if (rombelData) {
      setSiswas(rombelData?.murid)
    }
  }, [rombelData])

  const handleAdd = (idSiswa) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data siswa akan dikeluarkan dari rombel ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, keluarkan!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const payload = {
            idRombel: null,
          }
          siswaService
            .update(token, idSiswa, payload)
            .then((result) => {
              Swal.fire({
                icon: 'success',
                title: 'Siswa telah dikeluarkan',
                position: 'bottom-center',
              })
              refetchRombel()
            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
                position: 'bottom-center',
              })
            })
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            position: 'top-right',
          })
        }
      }
    })
  }

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-home"></i> Data Rombel
                </h3>
              </div>
              <div className="box-body">
                <button
                  className="btn btn-default"
                  onClick={() => window.history.back()}
                >
                  <i className="fa fa-arrow-left"></i> Back
                </button>
                {!isFetchingRombel && rombelData && (
                  <div className="callout callout-primary">
                    <h4>
                      {' '}
                      <i className="icon fa fa-info-circle"></i>{' '}
                      {`Rombel ${rombelData.name}`}
                    </h4>
                    <p> {`Daftar Siswa di Rombel ${rombelData.name}`}</p>
                  </div>
                )}

                <div className="tab-pane " id="input-siswa">
                  <div className="box-body table-responsive no-padding">
                    {isFetchingRombel && <Loading />}
                    {!isFetchingRombel && siswas && siswas.length === 0 && (
                      <EmptyDataIndicator message="Belum ada siswa di rombel ini" />
                    )}
                    {!isFetchingRombel && siswas && siswas.length > 0 && (
                      <table id="all_siswa" className="table table-hover">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>NIS</th>
                            <th>NiSN</th>
                            <th>Nama</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {siswas.map((siswa, index) => (
                            <tr key={siswa.id}>
                              <td>{index + 1}</td>
                              <td>{siswa.nis}</td>
                              <td>{siswa.nisn}</td>
                              <td>{siswa.nama}</td>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleAdd(siswa.id)}
                                >
                                  <span className="glyphicon glyphicon-trash "></span>
                                  {' Keluarkan Siswa'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
