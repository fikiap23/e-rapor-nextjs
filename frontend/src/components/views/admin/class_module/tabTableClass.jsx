import Link from 'next/link'

export default function TabTableClass({ rombel, openModal }) {
  return (
    <div className="box-body">
      <div style={{ margin: '0 20px 20px 20px' }}>
        <button
          type="button"
          className="btn btn-success"
          // data-toggle="modal"
          // data-target="#add-modal"
          onClick={openModal}
        >
          <span className="glyphicon glyphicon-plus"></span>
          Tambah
        </button>
      </div>
      <table id="Rombel" className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Kelompok Usia</th>
            <th>Rombel</th>
            <th>Kuota</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rombel.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.tingkat}</td>
              <td>{item.rombel}</td>
              <td>{`${item.terisi}/${item.kuota}`}</td>
              <td style={{ display: 'flex', gap: '5px' }}>
                <button
                  style={{ marginRight: '2px', marginLeft: '2px' }}
                  className="btn btn-primary btn-sm edit"
                >
                  <i className="icon fa fa-edit"></i>
                </button>
                <Link
                  className="btn btn-success btn-sm"
                  href={`/admin/class/add_student/${item.id}`}
                >
                  <span className="glyphicon glyphicon-plus"></span>
                  Daftarkan Siswa
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  // onClick={() => deleteRombel(item.id)}
                >
                  <i className="icon fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
