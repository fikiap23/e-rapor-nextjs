'use client'
import { useEffect } from 'react'
import './style_module.css'
import {
  formatDateWithIndonesianMonth,
  formatDateWithIndonesianMonthAndDay,
} from '@/lib/helperDate'

function PrintModule({ data }) {
  useEffect(() => {
    window.print()
  }, [])

  const modulAjar = data?.modulAjar
  const jadwalAjar = data?.modulAjar?.jadwalAjar || []

  const lengths = data.modulAjar.jadwalAjar.map(
    (arr) => arr.kegiatanInti.length
  ) // output [5, 2, 2, 3, 3, 2]
  const maxIndex = lengths.indexOf(Math.max(...lengths))
  const arrayTerbesar = data.modulAjar.jadwalAjar[maxIndex].kegiatanInti.length

  const kegiatanPenutupLogic = arrayTerbesar >= 4
  const kegiatan_penutup_logic = `${kegiatanPenutupLogic ? 'extra-margin' : ''}`

  return (
    <div className="body">
      <div className="header">
        <h4 className="tbl">MODUL AJAR</h4>
        <h6 className="tbl">
          {data.sekolah} | Kelompok Usia {data.kelompokUsia} | Fase Pondasi
        </h6>
        <h6 className="tbl">{data.semester}</h6>
        <hr style={{ borderTop: '5px solid black', margin: '20px 0' }} />
      </div>

      <h6 className="tbl">A. INFORMASI UMUM</h6>
      <div
        className="container"
        style={{ border: '2px solid black', width: '100%' }}
      >
        <table width="100%" style={{ borderCollapse: 'collapse' }}>
          <tr>
            <td className="tbl">Minggu Ke</td>
            <td className="tbl">:</td>
            <td className="tbl">{modulAjar.minggu}</td>
            <td
              className="tbl"
              style={{ paddingLeft: '5px', borderLeft: '2px solid black' }}
            >
              Alokasi Waktu
            </td>
            <td className="tbl">:</td>
            <td className="tbl">{`${modulAjar.alokasiWaktu} Menit`}</td>
          </tr>
          <tr>
            <td className="tbl">Topik</td>
            <td className="tbl">:</td>
            <td className="tbl">{modulAjar.topik}</td>
            <td
              className="tbl"
              style={{ paddingLeft: '5px', borderLeft: '2px solid black' }}
            >
              Model Pembelajaran
            </td>
            <td className="tbl">:</td>
            <td className="tbl">Tatap Muka</td>
          </tr>
          <tr>
            <td className="tbl">Sub Topik</td>
            <td className="tbl">:</td>
            <td className="tbl">{modulAjar.subtopik}</td>
            <td
              className="tbl"
              style={{ paddingLeft: '5px', borderLeft: '2px solid black' }}
            >
              Kata Kunci
            </td>
            <td className="tbl">:</td>
            <td className="tbl">
              {modulAjar.katakunci.map((kata) => `${kata}, `)}
            </td>
          </tr>
        </table>
      </div>

      <div style={{ display: 'flex', marginTop: '10px' }}>
        <p>Tujuan Kegiatan</p>
        <span style={{ textIndent: '3.2em' }}>:</span>
        <div className="ttd" style={{ marginLeft: '20px' }}>
          <ol className="dashed-list">
            {modulAjar.tujuanKegiatan.map((tujuan) => (
              <li key={tujuan}>
                <p>{tujuan}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <table style={{ marginBottom: '10px' }}>
        <tr>
          <td width={120}>Deskripsi Umum</td>
          <td width={25}>:</td>
          <td>{modulAjar.deskripsiUmum}</td>
        </tr>
      </table>

      <table style={{ marginBottom: '20px' }}>
        <tr>
          <td width={120}>Alat dan Bahan</td>
          <td width={25}>:</td>
          <td>{modulAjar.alatBahan.map((alat) => `${alat}, `)}</td>
        </tr>
      </table>

      <h6 className="tbl">B. KOMPONEN INTI</h6>
      <table style={{ marginBottom: '20px' }}>
        <tr>
          <td width={120}>Sumber</td>
          <td width={25}>:</td>
          <td>{modulAjar.sumber}</td>
        </tr>
      </table>

      {modulAjar.petaKonsep && (
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <p>Peta Konsep</p>
          <span style={{ textIndent: '3.2em', marginLeft: '14px' }}>:</span>
          <div className="ttd" style={{ marginLeft: '20px' }}>
            <ol className="dashed-list">
              {modulAjar?.petaKonsep?.map((peta) => (
                <li key={peta}>
                  <p>{peta}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <h6 className="tbl">C. CURAH IDE KEGIATAN</h6>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <div
          className="ttd"
          dangerouslySetInnerHTML={{ __html: modulAjar.curahIdeKegiatan }}
        />
      </div>

      <h6 className="tbl">I. Kegiatan Pembukaan (30 menit)</h6>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <div
          className="ttd"
          dangerouslySetInnerHTML={{ __html: modulAjar.kegiatanPembukaan }}
        />
      </div>

      <h6 className="tbl ">II. Kegiatan Inti (60 menit)</h6>
      <p>
        Kegiatan disajikan dengan menata lingkungan belajar dan anak bebas
        memilih mana yang akan dilakukan, dengan kegiatan-kegiatan sebagai
        berikut:
      </p>
      <table
        className="weekly"
        border={3}
        style={{ border: '1px solid black' }}
      >
        <thead>
          <tr>
            {jadwalAjar.map((day) => (
              <th key={day.tanggal}>
                {formatDateWithIndonesianMonthAndDay(new Date(day.tanggal))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({
            length: Math.max(
              ...jadwalAjar.map((day) => day.kegiatanInti.length)
            ),
          }).map((_, index) => (
            <tr key={index}>
              {jadwalAjar.map((day) => (
                <td key={day.tanggal}>{day.kegiatanInti[index] || ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '30px' }}>
        <h6 className="tbl">III. Istirahat</h6>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <div
            className="ttd"
            dangerouslySetInnerHTML={{ __html: modulAjar.istirahat }}
          />
        </div>
      </div>

      <div
        className={kegiatan_penutup_logic}
        style={{
          pageBreakBefore: arrayTerbesar >= 4 ? 'always' : 'auto',
        }}
      >
        <h6 className="tbl ">IV. Kegiatan Penutup</h6>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <div
            className="ttd"
            dangerouslySetInnerHTML={{ __html: modulAjar.kegiatanPenutupan }}
          />
        </div>
      </div>

      <h6 className="tbl">V. Rencana Penilaian</h6>
      <table
        className="weekly"
        border={3}
        style={{ border: '1px solid black' }}
      >
        <thead>
          <tr>
            <th scope="col" rowSpan={2}>
              PENGAMATAN
            </th>
            <th scope="col" colSpan={2}>
              NAMA ANAK
            </th>
          </tr>
          <tr>
            <th scope="col">SUDAH MUNCUL</th>
            <th scope="col">BELUM/MULAI MUNCUL</th>
          </tr>
        </thead>
        <tbody>
          {modulAjar.tujuanKegiatan.map((tujuan) => (
            <tr key={tujuan}>
              <td>{tujuan}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      <table width="100%" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <tr>
          <td width="5%" style={{ textAlign: 'center' }}>
            Mengetahui :
            <p style={{ marginTop: '5px' }}>{`Kepala ${data.sekolah}`}</p>
            <div style={{ marginTop: '20%' }}>
              <p style={{ margin: '-15px' }}>
                <b>{data.namaKepsek}</b>
              </p>
              <hr style={{ color: 'black' }} />
              <p style={{ margin: '-15px' }}>
                <b>{`NIP. ${data.nipKepsek}`}</b>
              </p>
            </div>
          </td>

          <td width="8%"></td>

          <td width="5%" style={{ textAlign: 'center' }}>
            {` Jakarta, ${formatDateWithIndonesianMonth(new Date())}`}
            <p style={{ marginTop: '5px' }}>Guru Kelompok</p>
            <div style={{ marginTop: '25%' }}>
              <p style={{ margin: '-15px' }}>
                <b>{data.namaGuru}</b>
              </p>
              <hr style={{ color: 'black' }} />
              <p style={{ margin: '-15px' }}>
                <b>{`NIP/NUPTK ${data.nipGuru}`}</b>
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default PrintModule
