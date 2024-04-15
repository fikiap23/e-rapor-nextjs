import { formatDateWithIndonesianMonth } from '@/lib/helperDate'
import { apiUrl } from '@/services/apiUrls'

function StudentIdentity({ murid, kapsek }) {
  return (
    <div>
      <div className="header" style={{ marginTop: '10%' }}>
        <h3 className="tbl">IDENTITAS PESERTA DIDIK</h3>
      </div>

      <div className="container-student">
        <table>
          <tr>
            <td>1. Nama Peserta Didik</td>
            <td width={20}>:</td>
            <td className="tbl">{murid.nama.toUpperCase()}</td>
          </tr>

          <tr>
            <td>2. NIS</td>
            <td width={20}>:</td>
            <td className="tbl">{murid.nis}</td>
          </tr>

          <tr>
            <td>3. Tempat, Tanggal Lahir</td>
            <td width={20}>:</td>
            <td className="tbl">{`${
              murid.tempatLahir
            }, ${formatDateWithIndonesianMonth(
              new Date(murid.tanggalLahir)
            )}`}</td>
          </tr>

          <tr>
            <td>4. Jenis Kelamin</td>
            <td width={20}>:</td>
            <td className="tbl">
              {murid.jenisKelamin === 'LAKI_LAKI' ? 'L' : 'P'}
            </td>
          </tr>

          <tr>
            <td>5. Agama</td>
            <td width={20}>:</td>
            <td className="tbl">{murid.agama}</td>
          </tr>

          <tr>
            <td>6. Anak Ke-</td>
            <td width={20}>:</td>
            <td className="tbl">3 (Masih dummy)</td>
          </tr>

          <tr>
            <td>7. Orangtua</td>
          </tr>

          <tr>
            <td style={{ paddingLeft: '30px' }}>a. Ayah</td>
            <td width={20}>:</td>
            <td className="tbl">{murid.namaAyah}</td>
          </tr>

          <tr>
            <td style={{ paddingLeft: '30px' }}>b. Ibu</td>
            <td width={20}>:</td>
            <td className="tbl">{murid.namaIbu}</td>
          </tr>

          <tr>
            <td>8. Pekerjaan Orangtua</td>
          </tr>

          <tr>
            <td style={{ paddingLeft: '30px' }}>a. Ayah</td>
            <td width={20}>:</td>
            <td className="tbl">{murid.pekerjaanAyah}</td>
          </tr>

          <tr>
            <td style={{ paddingLeft: '30px' }}>b. Ibu</td>
            <td width={20}>:</td>
            <td className="tbl">{murid.pekerjaanIbu}</td>
          </tr>

          <tr>
            <td>9. Alamat (Masih dummy)</td>
          </tr>

          <tr>
            <td style={{ paddingLeft: '30px' }}>Jalan</td>
            <td width={20}>:</td>
            <td className="tbl">Cianjur Kulon</td>
          </tr>

          <tr>
            <td style={{ paddingLeft: '30px' }}>Kelurahan/Desa</td>
            <td width={20}>:</td>
            <td className="tbl">Gunung Tandala</td>
          </tr>

          <tr>
            <td style={{ paddingLeft: '30px' }}>Kecamatan/Kota</td>
            <td width={20}>:</td>
            <td className="tbl">Kawalu</td>
          </tr>

          <tr>
            <td style={{ paddingLeft: '30px' }}>Kabupaten/Kota</td>
            <td width={20}>:</td>
            <td className="tbl">Jakarta</td>
          </tr>

          <tr>
            <td>10. Provinsi</td>
            <td width={20}>:</td>
            <td className="tbl">DKI Jakarta</td>
          </tr>
        </table>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <img
          src={`${
            murid.foto ? apiUrl + '/' + murid.foto : '/images/students.png'
          }`}
          alt="circle-image"
          width={150}
        />
        <div className="ttd" style={{ marginLeft: '20px' }}>
          <p style={{ marginBottom: '30%' }}>
            Kepala TK ERLANGGA CIRACAS
            <br />
            ASY SYAMS ISLAMIC SCHOOL
          </p>
          <p style={{ fontWeight: 'bold', margin: '0' }}>{kapsek.nama}</p>
          <hr
            style={{ borderColor: 'black', margin: '5px 0', width: '100%' }}
          />
          <p
            style={{ fontWeight: 'bold', margin: '0' }}
          >{`NIP. ${kapsek.nip}`}</p>
        </div>
      </div>
    </div>
  )
}

export default StudentIdentity
