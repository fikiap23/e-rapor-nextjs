import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'

export default function SetClass({ rombels }) {
  return (
    <section className="content">
      <div className="row">
        {rombels.length === 0 && (
          <EmptyDataIndicator message={'Data Rombel Kosong'} />
        )}
        {rombels.length > 0 &&
          rombels.map((rombel) => (
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
                  <button
                    className="btn btn-default"
                    style={{ float: 'right' }}
                  >
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
