const TableLecture = () => {
  const dummyDiampuh = [
    {
      KelUsia: '2-3 Tahun',
      Rombel: 'A',
      KelasId: 1,
      MatpelId: 1,
      TahunAjaran: '2022-2023 Ganjil',
      Status: 'Aktif',
    },
    {
      KelUsia: '3-4 Tahun',
      Rombel: 'B',
      KelasId: 1,
      MatpelId: 2,
      TahunAjaran: '2022-2023 Genap',
      Status: 'Aktif',
    },
    {
      KelUsia: '4-5 Tahun',
      Rombel: 'B',
      KelasId: 1,
      MatpelId: 3,
      TahunAjaran: '2022-2023 Genap',
      Status: 'Tidak Aktif',
    },
  ]

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
        {dummyDiampuh.map((item, index) => (
          <tr key={index} className="text-center">
            <td>{index + 1}</td>
            <td>{item.KelUsia}</td>
            <td>{item.Rombel}</td>
            <td>{item.TahunAjaran}</td>
            <td>{item.Status}</td>
            <td>
              <a
                href={`/teacher/lecture/${item.KelasId}`}
                className="btn btn-success btn-sm"
              >
                <span className="fa fa-eye"></span> Input Nilai
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableLecture
