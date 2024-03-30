export default function SetClass({ rombels }) {
  const rombel = [
    {
      id: 1,
      tingkat: 'Usia 2-3',
      nama: 'Rombel A1',
      kuota: 10,
      terisi: 5,
      siswa: [
        { id: 1, nis: '123', nama: 'John Doe' },
        { id: 2, nis: '456', nama: 'Jane Doe' },
        { id: 3, nis: '789', nama: 'Alice' },
      ],
    },
    {
      id: 1,
      tingkat: 'Usia 2-3',
      nama: 'Rombel A1',
      kuota: 10,
      terisi: 5,
      siswa: [
        { id: 1, nis: '123', nama: 'John Doe' },
        { id: 2, nis: '456', nama: 'Jane Doe' },
        { id: 3, nis: '789', nama: 'Alice' },
      ],
    },
    {
      id: 1,
      tingkat: 'Usia 2-3',
      nama: 'Rombel A1',
      kuota: 10,
      terisi: 5,
      siswa: [
        { id: 1, nis: '123', nama: 'John Doe' },
        { id: 2, nis: '456', nama: 'Jane Doe' },
        { id: 3, nis: '789', nama: 'Alice' },
      ],
    },
    {
      id: 1,
      tingkat: 'Usia 2-3',
      nama: 'Rombel A1',
      kuota: 10,
      terisi: 5,
      siswa: [
        { id: 1, nis: '123', nama: 'John Doe' },
        { id: 2, nis: '456', nama: 'Jane Doe' },
        { id: 3, nis: '789', nama: 'Alice' },
      ],
    },
    {
      id: 1,
      tingkat: 'Usia 2-3',
      nama: 'Rombel A1',
      kuota: 10,
      terisi: 5,
      siswa: [
        { id: 1, nis: '123', nama: 'John Doe' },
        { id: 2, nis: '456', nama: 'Jane Doe' },
        { id: 3, nis: '789', nama: 'Alice' },
      ],
    },
    // tambahkan data rombel lainnya jika diperlukan
  ]
  return (
    <section className="content">
      <div className="row">
        {rombels.map((rombel) => (
          <div key={rombel.id} className="col-sm-4">
            <div
              className="box box-solid box-primary"
              style={{
                height: '320px',
                overflowY: 'scroll',
                overflowX: 'scroll',
              }}
            >
              <div className="box-header with-border">
                <h3
                  className="box-title"
                  style={{ float: 'left', margin: '0', marginTop: '8px' }}
                >
                  {rombel.name}
                </h3>
                <button className="btn btn-default" style={{ float: 'right' }}>
                  Lihat Siswa
                </button>
              </div>

              <div className="box-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th className="text-center">No</th>
                      <th className="text-center">NIS</th>
                      <th className="text-center">Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rombel.murid.map((siswa, index) => (
                      <tr key={siswa.id} className="text-center">
                        <td>{index + 1}</td>
                        <td>{siswa.nis}</td>
                        <td>{siswa.nama}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
