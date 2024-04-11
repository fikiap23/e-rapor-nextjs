'use client'
import { useEffect } from 'react'
import './style_module.css'
import { formatDateWithIndonesianMonth } from '@/lib/helperDate'

function PrintModule({ data }) {
  // useEffect(() => {
  //   window.print()
  // }, [])

  console.log(`Data for printing:`, data)
  const weeklySchedule = [
    {
      date: 'Senin, 25 September 2023',
      activities: [
        'Menyimak video tentang aneka binatang yang hidup di air dan bertanya jawab 1',
        'Menyimak video tentang aneka binatang yang hidup di air dan bertanya jawab 2',
        'Bertanya jawab tentang bagian ikan 1',
        'Membaca ensiklopedia tentang aneka ikan 1',
      ],
    },
    {
      date: 'Selasa, 26 September 2023',
      activities: [
        'Menyimak video tentang aneka binatang yang hidup di air dan bertanya jawab 3',
        'Menyimak video tentang aneka binatang yang hidup di air dan bertanya jawab 4',
        'Bertanya jawab tentang bagian ikan 2',
        'Membaca ensiklopedia tentang aneka ikan 2',
      ],
    },
    {
      date: 'Rabu, 27 September 2023',
      activities: [
        'Menyimak video tentang aneka binatang yang hidup di air dan bertanya jawab 5',
        'Menyimak video tentang aneka binatang yang hidup di air dan bertanya jawab 6',
        'Bertanya jawab tentang bagian ikan 3',
        'Membaca ensiklopedia tentang aneka ikan 3',
      ],
    },
    {
      date: 'Kamis, 28 September 2023',
      activities: [
        'Menyimak video tentang aneka binatang yang hidup di air dan bertanya jawab 7',
        'Menyimak video tentang aneka binatang yang hidup di air dan bertanya jawab 8',
        'Bertanya jawab tentang bagian ikan 4',
        'Membaca ensiklopedia tentang aneka ikan 4',
      ],
    },
    {
      date: 'Jumat, 29 September 2023',
      activities: [
        'Menyimak video tentang aneka binatang yang hidup di air dan bertanya jawab 9',
        'Menyimak video tentang aneka binatang yang hidup di air dan bertanya jawab 10',
        'Bertanya jawab tentang bagian ikan 5',
        'Membaca ensiklopedia tentang aneka ikan 5',
      ],
    },
  ]

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
            <td className="tbl">{data.modulAjar.minggu}</td>
            <td
              className="tbl"
              style={{ paddingLeft: '5px', borderLeft: '2px solid black' }}
            >
              Alokasi Waktu
            </td>
            <td className="tbl">:</td>
            <td className="tbl">900 Menit</td>
          </tr>
          <tr>
            <td className="tbl">Topik</td>
            <td className="tbl">:</td>
            <td className="tbl">{data.modulAjar.topik}</td>
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
            <td className="tbl">{data.modulAjar.subtopik}</td>
            <td
              className="tbl"
              style={{ paddingLeft: '5px', borderLeft: '2px solid black' }}
            >
              Kata Kunci
            </td>
            <td className="tbl">:</td>
            <td className="tbl">
              {data.modulAjar.katakunci.map((kata) => `${kata}, `)}
            </td>
          </tr>
        </table>
      </div>

      <div style={{ display: 'flex', marginTop: '10px' }}>
        <p>Tujuan Kegiatan</p>
        <span style={{ textIndent: '3.2em' }}>:</span>
        <div
          className="ttd"
          dangerouslySetInnerHTML={{ __html: data.modulAjar.tujuanKegiatan }}
        />
      </div>

      <table style={{ marginBottom: '10px' }}>
        <tr>
          <td width={120}>Deskripsi Umum</td>
          <td width={25}>:</td>
          <td>
            Anak diajak mengenal Identitasku, berdiskusi secara bersama-sama
            melalui bercakap-cakap dan tanya jawab serta membuat karya imajinasi
            yang berkaitan dengan Identitasku
          </td>
        </tr>
      </table>

      <table style={{ marginBottom: '20px' }}>
        <tr>
          <td width={120}>Alat dan Bahan</td>
          <td width={25}>:</td>
          <td>{data.modulAjar.alatBahan.map((alat) => `${alat}, `)}</td>
        </tr>
      </table>

      <h6 className="tbl">B. KOMPONEN INTI</h6>

      <table style={{ marginBottom: '20px' }}>
        <tr>
          <td width={120}>Sumber</td>
          <td width={25}>:</td>
          <td>Buku Anak Tazim 4-5 Tahun: Aku Hamba Allah</td>
        </tr>
      </table>

      <h6 className="tbl">C. CURAH IDE KEGIATAN</h6>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <div className="ttd" style={{ marginLeft: '20px' }}>
          <ol className="dashed-list">
            <li>
              <p>Sebelum masuk, anak berbaris di halaman sekolah</p>
            </li>
            <li>
              <p>kegiatan motorik kasar</p>
            </li>
            <li>
              <p>
                Anak melakukan pemeriksaan anggota tubuh seperti: kuku, telinga,
                mulut dan hidung
              </p>
            </li>
            <li>
              <p>
                Anak secara mandiri menyimpan sepatu pada tempatnya dan masuk
                kelas dengan terti
              </p>
            </li>
          </ol>
        </div>
      </div>

      <h6 className="tbl new-page">I. Kegiatan Pembukaan (30 menit)</h6>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <div className="ttd" style={{ marginLeft: '20px' }}>
          <ol className="dashed-list">
            <li>
              <p>Salam dan berdoa</p>
            </li>
            <li>
              <p>Guru menyapa dan menanyakan keadaan anak-anak pada hari ini</p>
            </li>
            <li>
              <p>
                Guru menyampaikan tema/topik hari ini yaitu tentang: Identitasku
              </p>
            </li>
            <li>
              <p>
                Guru mengajak anak mengamati/menonton video tentang tema/topik
                hari ini
              </p>
            </li>
            <li>
              <p>
                Guru melakukan kegiatan bercakap-cakap/bernyanyi/bercerita/tanya
                jawab tentang: Identitasku
              </p>
            </li>
            <li>
              <p>Menjelaskan cara bermain dan menyepakati aturan main</p>
            </li>
          </ol>
        </div>
      </div>

      <h6 className="tbl">II. Kegiatan Inti (60 menit)</h6>
      <p>
        Kegiatan disajikan dengan menata lingkungan belajar dan anak bebas
        memilih mana yang akan dilakukan, dengan kegiatan-kegiatan sebagai
        berikut:
      </p>
      <span style={{ textIndent: '3.2em' }}>:</span>
      <table
        className="weekly"
        border={3}
        style={{ border: '1px solid black' }}
      >
        <thead>
          <tr>
            {weeklySchedule.map((day) => (
              <th key={day.date}>{day.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({
            length: Math.max(
              ...weeklySchedule.map((day) => day.activities.length)
            ),
          }).map((_, index) => (
            <tr key={index}>
              {weeklySchedule.map((day) => (
                <td key={day.date}>{day.activities[index] || ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h6 className="tbl">III. Istirahat</h6>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <div className="ttd" style={{ marginLeft: '20px' }}>
          <ol className="dashed-list">
            <li>
              <p>Bermain Bebas</p>
            </li>
            <li>
              <p>Makan Bersama</p>
            </li>
          </ol>
        </div>
      </div>

      <h6 className="tbl new-page">IV. Kegiatan Penutup</h6>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <div className="ttd" style={{ marginLeft: '20px' }}>
          <ol className="number-list">
            <li>
              <p>Membereskan mainan</p>
              <ul className="sub">
                <li>
                  <p>
                    Ajak anak untuk membereskan mainan yang telah dipakainya
                  </p>
                </li>
                <li>
                  <p>
                    Gunakan nyanyian atau permainan agar anak membereskan mainan
                    dengan senang
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <p>Menanyakan kegiatan main yang telah dilakukan oleh anak</p>
            </li>
            <li>
              <p>Refleksi anak</p>
              <ul className="sub">
                <li>
                  <p>Kegiatan apa yang paling kamu sukai hari ini?</p>
                </li>
                <li>
                  <p>Karya apa yang paling kamu sukai?</p>
                </li>
                <li>
                  <p>Apakah kamu mengalami kesulitan saat berkarya?</p>
                </li>
                <li>
                  <p>
                    Apa yang kamu rasakan saat harus berbagi ide dengan temanmu
                    saat membuat sebuah gambar?
                  </p>
                </li>
                <li>
                  <p>Bagaimana perasaaanmu jika ada yang merusak karyamu?</p>
                </li>
              </ul>
            </li>
            <li>
              <p>Menguatkan konsep yang telah dibangun anak selama bermain</p>
            </li>
            <li>
              <p>
                Memberikan pujian atas perilaku positif yang telah dilakukan
                anak
              </p>
            </li>
            <li>
              <p>Berdo`a dan salam</p>
            </li>
          </ol>
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
          <tr>
            <td>
              Bersyukur atas anugrah Allah SWT karena telah menciptakan manusia
              yang berakal dan sempurna Mengenal identitas diri
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Berkomunikasi dan menjelaskan tentang diri dan teman</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Berlatih motorik dan kreativitas serta kolaborasi</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table width="100%" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <tr>
          <td width="5%" style={{ textAlign: 'center' }}>
            Mengetahui :
            <p style={{ marginTop: '5px' }}>{`Kepala Tk ${data.sekolah}`}</p>
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
