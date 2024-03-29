export default function AddStudentToClassView({ id }) {
  const all_siswa = [
    { nisn: '123', nama: 'John Doe', id: '1' },
    { nisn: '456', nama: 'Jane Doe', id: '2' },
    { nisn: '789', nama: 'Alice', id: '3' },
  ]
  const rombel = {
    id: 1,
    tingkat: 'Usia 2-3',
    rombel: 'Rombel A1',
    kuota: 10,
    terisi: 5,
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
                <h4>{`Daftarkan Siswa di Kelompok ${rombel.tingkat} `}</h4>
                <h5>{`${rombel.rombel}`}</h5>

                <div className="tab-pane " id="input-siswa">
                  <div className="box-body table-responsive no-padding">
                    <table id="all_siswa" className="table table-hover">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Nisn</th>
                          <th>Nama</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {all_siswa.map((siswa, index) => (
                          <tr key={siswa.id}>
                            <td>{index + 1}</td>
                            <td>{siswa.nisn}</td>
                            <td>{siswa.nama}</td>
                            <td>
                              <button className="btn btn-success btn-sm">
                                <span className="glyphicon glyphicon-plus"></span>
                                Add Siswa
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
