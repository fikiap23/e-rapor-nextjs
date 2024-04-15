import './style_raport.css'

function Cover() {
  return (
    <div className="body_cover">
      <div className="header">
        <img
          src="https://picsum.photos/200"
          alt="circle-image"
          className="circle-image"
        />
        <h1>
          <b>LAPORAN</b>
        </h1>
        <h2>
          <b>HASIL PERKEMBANGAN ANAK DIDIK</b>
        </h2>
        <h3>
          <b>Semester 1 Tahun Pelajaran 2023/2024</b>
        </h3>
      </div>

      <div className="container">
        <table>
          <tr>
            <td>Nama</td>
            <td>:</td>
            <td width="70%" className="tbl">
              ANAK 1
            </td>
          </tr>
          <tr>
            <td>Nis</td>
            <td>:</td>
            <td width="70%" className="tbl">
              123
            </td>
          </tr>
          <tr>
            <td>Kelompok</td>
            <td>:</td>
            <td width="70%" className="tbl">
              A
            </td>
          </tr>
        </table>
      </div>

      <div className="footer">
        <h3>
          <b>DINAS PENDIDIKAN DKI JAKARTA</b>
        </h3>
        <h3>
          <b>TK ERLANGGA CIRACAS ASY SYAMS ISLAMIC SCHOOL</b>
        </h3>
        <h4>
          JI. H. Baping No.100 Kelurahan Ciracas Kecamatan Ciracas Kota Jakarta
          Timur
        </h4>
      </div>
    </div>
  )
}

export default Cover
