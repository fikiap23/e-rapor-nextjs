import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
import Loading from '@/components/shared/Loading'
import useAuth from '@/hooks/useAuth'
import { useOneRombel } from '@/services/rombelService/useOneRombel'
import siswaService from '@/services/siswa.service'
import { useStudentsNullRombel } from '@/services/studentService/useStudenNullROmbel'
import Swal from 'sweetalert2'

export default function AddStudentToClassView({ id }) {
  const { token } = useAuth()
  const {
    data: allSiswa,
    isFetching: isFetchingSiswa,
    error: errorSiswa,
    refetch: refetchSiswa,
  } = useStudentsNullRombel(token)

  const {
    data: rombelData,
    isFetching: isFetchingRombel,
    error: errorRombel,
    refetch: refetchRombel,
  } = useOneRombel(token, id)

  const handleAdd = (idSiswa) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data siswa akan ditambahkan ke rombel ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, tambahkan!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const payload = {
            idRombel: id,
          }
          siswaService
            .update(token, idSiswa, payload)
            .then((result) => {
              Swal.fire({
                icon: 'success',
                title: 'Data siswa telah ditambahkan',
                position: 'bottom-center',
              })
              refetchSiswa()
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
                    <p> {`Daftarkan Siswa di Rombel ${rombelData.name}`}</p>
                  </div>
                )}

                <div className="tab-pane " id="input-siswa">
                  <div className="box-body table-responsive no-padding">
                    {isFetchingSiswa && <Loading />}
                    {!isFetchingRombel && allSiswa && allSiswa.length === 0 && (
                      <EmptyDataIndicator message="Semua siswa sudah terdaftar di rombel" />
                    )}
                    {!isFetchingSiswa && allSiswa && allSiswa.length > 0 && (
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
                          {allSiswa.map((siswa, index) => (
                            <tr key={siswa.id}>
                              <td>{index + 1}</td>
                              <td>{siswa.nis}</td>
                              <td>{siswa.nisn}</td>
                              <td>{siswa.nama}</td>
                              <td>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleAdd(siswa.id)}
                                >
                                  <span className="glyphicon glyphicon-plus"></span>
                                  Add Siswa
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
