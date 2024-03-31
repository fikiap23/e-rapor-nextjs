const TableLecture = ({ rombels }) => {
  return (
    <table id="diampuh" className="table table-bordered table-striped">
      <thead>
        <tr>
          <th className="text-center">No</th>
          <th className="text-center">Kelompok Usia</th>
          <th className="text-center">Rombel</th>
          <th className="text-center">Tahun Ajaran</th>
          <th className="text-center">Status</th>
          <th className="text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {rombels.map((item, index) => (
          <tr key={index} className="text-center">
            <td>{index + 1}</td>
            <td>{item.kelompokUsia}</td>
            <td>{item.name}</td>
            <td>{item.semester}</td>
            <td>
              <span
                className={`label bg-${item.statusSemester ? 'green' : 'red'}`}
              >
                {item.statusSemester ? 'Aktif' : 'Tidak Aktif'}
              </span>
            </td>
            <td>
              <a
                href={`/teacher/lecture/${item.idRombel}`}
                className="btn btn-primary btn-sm"
              >
                <span className="fa fa-edit"></span> Input Nilai
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableLecture
