const StudentTable = () => {
  const kelompokSiswa = [
    {
      id: 1,
      siswa: {
        nis: '1234567890',
        nama: 'John Doe',
      },
      statusNilai: 'Belum Diinput',
    },
    {
      id: 2,
      siswa: {
        nis: '0987654321',
        nama: 'Jane Doe',
      },
      statusNilai: 'Sudah Diinput',
    },
    {
      id: 3,
      siswa: {
        nis: '5432167890',
        nama: 'Alice Smith',
      },
      statusNilai: 'Belum Diinput',
    },
  ]

  return (
    <table className="table table-bordered table-striped" id="kelompok_siswa">
      <thead>
        <tr>
          <th className="text-center">No</th>
          <th className="text-center">NIS</th>
          <th className="text-center">Nama Siswa</th>
          <th className="text-center">Status Nilai</th>
          <th className="text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {kelompokSiswa.map((item, index) => (
          <tr key={index} className="text-center">
            <td>{index + 1}</td>
            <td>{item.siswa.nis}</td>
            <td>{item.siswa.nama}</td>
            <td>{item.statusNilai}</td>
            <td>
              <a
                href={`/guru/matpel/input-nilai/${item.id}/matpel/cek_matpel.id`}
                className="btn btn-success btn-sm"
              >
                <span className="glyphicon glyphicon-plus"></span> Input Nilai
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StudentTable
