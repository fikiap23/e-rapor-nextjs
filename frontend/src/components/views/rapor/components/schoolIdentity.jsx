import { apiUrl } from '@/services/apiUrls'

function SchoolIdentity({ semester, sekolah }) {
  return (
    <div style={{paddingTop: '100px'}}>
      <div className="header">
        <img
          src={`${apiUrl}/${sekolah.logo}`}
          width={150}
          height={150}
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
          <b>{semester}</b>
        </h3>
        <hr style={{ borderTop: '5px solid black', margin: '20px 0' }} />
      </div>

      <div className="container-school">
        <table>
          <tr>
            <td>Nama Sekolah</td>
            <td width={20}>:</td>
            <td className="tbl">{sekolah.nama.toUpperCase()}</td>
          </tr>

          <tr>
            <td>NPSN</td>
            <td width={20}>:</td>
            <td className="tbl">{sekolah.npsn}</td>
          </tr>

          <tr>
            <td>Alamat Sekolah</td>
            <td width={20}>:</td>
            <td className="tbl">{sekolah.alamat}</td>
          </tr>

          <tr>
            <td>Kode Pos</td>
            <td width={20}>:</td>
            <td className="tbl">{sekolah.kodePos}</td>
          </tr>

          <tr>
            <td>Nomor Telepon</td>
            <td width={20}>:</td>
            <td className="tbl">{sekolah.noTelepon}</td>
          </tr>

          <tr>
            <td>Kelurahan</td>
            <td width={20}>:</td>
            <td className="tbl">{sekolah.kelurahan}</td>
          </tr>

          <tr>
            <td>Kecamatan</td>
            <td width={20}>:</td>
            <td className="tbl">{sekolah.kecamatan}</td>
          </tr>

          <tr>
            <td>Kota/Kabupaten</td>
            <td width={20}>:</td>
            <td className="tbl">{sekolah.kota}</td>
          </tr>

          <tr>
            <td>Provinsi</td>
            <td width={20}>:</td>
            <td className="tbl">{sekolah.provinsi}</td>
          </tr>
        </table>
      </div>

      <div className="footer" style={{ pageBreakAfter: 'always' }}>
        <h3>
          <b>{sekolah.namaDisdik.toUpperCase()}</b>
        </h3>
        <h3>
          <b>KOTA JAKARTA TIMUR</b>
        </h3>
      </div>
    </div>
  )
}

export default SchoolIdentity
