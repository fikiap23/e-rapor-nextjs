import { apiUrl } from '@/services/apiUrls'
import './style_raport.css'

function Cover({ semester, murid, rombel, sekolah }) {
  return (
    <div className="body_cover">
      <div className="header">
        <img
          src={`${apiUrl}/${sekolah.logo}`}
          width={150}
          height={150}
          alt="circle-image"
          // className="circle-image"
        />
        <h1>
          <b>LAPORAN</b>
        </h1>
        <h2>
          <b>HASIL PERKEMBANGAN ANAK DIDIK</b>
        </h2>
        <h3>
          <b>{semester}</b>
        </h3>
      </div>

      <div className="container">
        <table>
          <tr>
            <td>Nama</td>
            <td>:</td>
            <td width="70%" className="tbl">
              {murid.nama}
            </td>
          </tr>
          <tr>
            <td>Nis</td>
            <td>:</td>
            <td width="70%" className="tbl">
              {murid.nis}
            </td>
          </tr>
          <tr>
            <td>Kelompok</td>
            <td>:</td>
            <td width="70%" className="tbl">
              {rombel.nama}
            </td>
          </tr>
        </table>
      </div>

      <div className="footer">
        <h3>
          <b>{`${sekolah.namaDisdik.toUpperCase()} ${sekolah.provinsi.toUpperCase()}`}</b>
        </h3>
        <h3>
          <b>{sekolah.nama.toUpperCase()}</b>
        </h3>
        <h4 style={{marginTop: '20px'}}>{sekolah.alamat}</h4>
      </div>
    </div>
  )
}

export default Cover
