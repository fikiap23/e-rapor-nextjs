import { formatDateWithIndonesianMonth } from '@/lib/helperDate'

function Narrative({ murid, rombel, sekolah, semester, rapor, guru, kapsek }) {
  console.log(rapor.catatanAgamaBudipekerti.length)
  console.log('jati ' + rapor.catatanJatiDiri.length)
  console.log('literasi ' + rapor.catatanLiterasiSains.length)
  console.log(rapor.catatanPancasila.length)
  console.log('Tumbuh ' + rapor.catatanPertumbuhan.length)
  console.log(rapor.catatanGuru.length)
  const pointBLogic =
    (rapor.catatanAgamaBudipekerti.length > 2500 &&
      rapor.catatanJatiDiri.length > 700) ||
    (rapor.catatanAgamaBudipekerti.length <= 800 &&
      rapor.catatanJatiDiri.length > 2000)
  const point_b_logic = `point_b ${pointBLogic ? 'extra-margin' : ''}`

  const pointCLogic =
    (rapor.catatanAgamaBudipekerti.length > 1500 &&
      rapor.catatanLiterasiSains.length > 1500 &&
      rapor.catatanJatiDiri.length > 1500) ||
    (rapor.catatanAgamaBudipekerti.length > 1500 &&
      rapor.catatanLiterasiSains.length > 1500) ||
    rapor.catatanLiterasiSains.length <= 800 ||
    (rapor.catatanAgamaBudipekerti.length <= 1500 &&
      rapor.catatanLiterasiSains.length > 2000 &&
      rapor.catatanJatiDiri.length <= 800) ||
    (rapor.catatanAgamaBudipekerti.length <= 1500 &&
      rapor.catatanLiterasiSains.length > 2000 &&
      rapor.catatanJatiDiri.length > 1800)
  const point_c_logic = `point_c ${pointCLogic ? 'extra-margin' : ''}`

  const pointDLogic =
    (rapor.catatanAgamaBudipekerti.length <= 1500 &&
      rapor.catatanLiterasiSains.length <= 1500 &&
      rapor.catatanJatiDiri.length > 1000) ||
    (rapor.catatanAgamaBudipekerti.length <= 3400 &&
      rapor.catatanLiterasiSains.length <= 2000 &&
      rapor.catatanJatiDiri.length <= 2900 &&
      rapor.catatanPancasila.length > 2000)
  const point_d_logic = `point_d ${pointDLogic ? 'extra-margin' : ''}`

  const noteGrowthChild =
    (rapor.catatanAgamaBudipekerti.length > 1500 &&
      rapor.catatanLiterasiSains.length > 1500 &&
      rapor.catatanPancasila.length > 1500 &&
      rapor.catatanPertumbuhan.length > 1500) ||
    (rapor.catatanAgamaBudipekerti.length > 1500 &&
      rapor.catatanLiterasiSains.length <= 2000 &&
      rapor.catatanPancasila.length <= 2000 &&
      rapor.catatanPertumbuhan.length > 2000)
  const note_growth_child = `note_growth_child ${
    noteGrowthChild ? 'extra-margin' : ''
  }`

  const noteTeacher =
    (rapor.catatanAgamaBudipekerti.length > 1500 &&
      rapor.catatanLiterasiSains.length > 1500 &&
      rapor.catatanPancasila.length > 1500 &&
      rapor.catatanPertumbuhan.length > 1500) ||
    (rapor.catatanAgamaBudipekerti.length > 1500 &&
      rapor.catatanLiterasiSains.length <= 2500 &&
      rapor.catatanPancasila.length <= 2500 &&
      rapor.catatanGuru.length > 2000)
  const note_teacher = `note_teacher ${noteTeacher ? 'extra-margin' : ''}`

  const comment =
    (rapor.catatanAgamaBudipekerti.length > 1500 &&
      rapor.catatanLiterasiSains.length > 1500 &&
      rapor.catatanPancasila.length > 1500 &&
      rapor.catatanPertumbuhan.length > 1500) ||
    (rapor.catatanAgamaBudipekerti.length > 1500 &&
      rapor.catatanLiterasiSains.length <= 2500 &&
      rapor.catatanPancasila.length <= 2500 &&
      rapor.catatanGuru.length > 3000)
  const coment = `comment ${comment ? 'extra-margin' : ''}`

  return (
    <>
      <div style={{ pageBreakBefore: 'always', marginTop: '8%' }}>
        <h3 style={{ textAlign: 'center' }}>LAPORAN PERKEMBANGAN ANAK DIDIK</h3>
        <table style={{ width: '100%' }}>
          <tr>
            <td width="15%">Nama Peserta Didik</td>
            <td width="1%">:</td>
            <td width="50%" className="tbl">
              {murid.nama.toUpperCase()}
            </td>
          </tr>

          <tr>
            <td>NIS / NISN</td>
            <td>:</td>
            <td className="tbl">{murid.nis}</td>
          </tr>

          <tr>
            <td>Nama Sekolah</td>
            <td>:</td>
            <td className="tbl">{sekolah?.nama.toUpperCase()}</td>
          </tr>

          <tr>
            <td>Kelompok</td>
            <td>:</td>
            <td className="tbl">{`Kelompok Usia ${rombel.kelompokUsia}`}</td>
          </tr>

          <tr>
            <td>Semester</td>
            <td>:</td>
            <td className="tbl">{semester}</td>
          </tr>
        </table>

        <hr style={{ borderTop: '5px solid black', margin: '20px 0' }} />

        <div className="point">
          <div className="point_a">
            <p style={{ fontSize: '20px' }}>
              <b>A. NILAI AGAMA DAN BUDI PEKERTI</b>
            </p>
            <div
              style={{
                padding: '5px',
                border: '2px solid black',
                marginBottom: '10px',
                textAlign: 'justify',
                textIndent: '2em',
              }}
              dangerouslySetInnerHTML={{
                __html: rapor.catatanAgamaBudipekerti,
              }}
            />
          </div>

          <div
            className={point_b_logic}
            style={{
              pageBreakBefore:
                rapor.catatanAgamaBudipekerti.length > 2500 &&
                rapor.catatanJatiDiri.length > 700
                  ? 'always'
                  : rapor.catatanAgamaBudipekerti.length <= 800 &&
                    rapor.catatanJatiDiri.length > 2000
                  ? 'always'
                  : // rapor.catatanAgamaBudipekerti.length > 2000 && rapor.catatanJatiDiri.length > 2000 ? 'always' :
                    'auto',
            }}
          >
            <p style={{ fontSize: '20px' }}>
              <b>B. JATI DIRI</b>
            </p>
            <div
              style={{
                padding: '5px',
                border: '2px solid black',
                marginBottom: '10px',
                textAlign: 'justify',
                textIndent: '2em',
              }}
              dangerouslySetInnerHTML={{ __html: rapor.catatanJatiDiri }}
            />
          </div>

          <div
            className={point_c_logic}
            style={{
              pageBreakBefore:
                rapor.catatanAgamaBudipekerti.length > 1500 &&
                rapor.catatanLiterasiSains.length > 1500 &&
                rapor.catatanJatiDiri.length > 1500
                  ? 'always'
                  : (rapor.catatanAgamaBudipekerti.length > 1500 &&
                      rapor.catatanLiterasiSains.length > 1500) ||
                    rapor.catatanLiterasiSains.length <= 800
                  ? 'always'
                  : rapor.catatanAgamaBudipekerti.length <= 1500 &&
                    rapor.catatanLiterasiSains.length > 2000 &&
                    rapor.catatanJatiDiri.length <= 800
                  ? 'always'
                  : rapor.catatanAgamaBudipekerti.length <= 1500 &&
                    rapor.catatanLiterasiSains.length > 2000 &&
                    rapor.catatanJatiDiri.length > 1800
                  ? 'always'
                  : 'auto',
            }}
          >
            <p style={{ fontSize: '20px' }}>
              <b>
                C. DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN
                SENI
              </b>
            </p>
            <div
              style={{
                padding: '5px',
                border: '2px solid black',
                marginBottom: '10px',
                textAlign: 'justify',
                textIndent: '2em',
              }}
              dangerouslySetInnerHTML={{ __html: rapor.catatanLiterasiSains }}
            />
          </div>

          <div
            className={point_d_logic}
            style={{
              pageBreakBefore:
                rapor.catatanAgamaBudipekerti.length <= 1500 &&
                rapor.catatanLiterasiSains.length <= 1500 &&
                rapor.catatanJatiDiri.length > 1000
                  ? 'always'
                  : rapor.catatanAgamaBudipekerti.length <= 3400 &&
                    rapor.catatanLiterasiSains.length <= 2000 &&
                    rapor.catatanJatiDiri.length <= 2900 &&
                    rapor.catatanPancasila.length > 2000
                  ? 'always'
                  : 'auto',
            }}
          >
            <p style={{ fontSize: '20px' }}>
              <b>D. PROJEK PENGUATAN PROFIL PELAJAR PANCASILA</b>
            </p>
            <div
              style={{
                padding: '5px',
                border: '2px solid black',
                textAlign: 'justify',
                marginBottom: '10px',
                textIndent: '2em',
              }}
              dangerouslySetInnerHTML={{ __html: rapor.catatanPancasila }}
            />
          </div>
        </div>

        <div
          className={note_growth_child}
          style={{
            pageBreakBefore:
              rapor.catatanAgamaBudipekerti.length > 1500 &&
              rapor.catatanLiterasiSains.length > 1500 &&
              rapor.catatanPancasila.length > 1500 &&
              rapor.catatanPertumbuhan.length > 1500
                ? 'always'
                : rapor.catatanAgamaBudipekerti.length > 1500 &&
                  rapor.catatanLiterasiSains.length <= 2000 &&
                  rapor.catatanPancasila.length <= 2000 &&
                  rapor.catatanPertumbuhan.length > 2000
                ? 'always'
                : 'auto',
          }}
        >
          <p style={{ fontSize: '20px' }}>
            <b>CATATAN PERTUMBUHAN ANAK</b>
          </p>
          <div
            style={{
              padding: '5px',
              border: '2px solid black',
              marginBottom: '10px',
              marginTop: '-10px',
            }}
          >
            <p
              style={{
                textIndent: '2em',
                textAlign: 'justify',
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: rapor.catatanPertumbuhan,
                }}
              />
            </p>
          </div>
        </div>

        <div
          className={note_teacher}
          style={{
            pageBreakBefore:
              rapor.catatanAgamaBudipekerti.length > 1500 &&
              rapor.catatanLiterasiSains.length > 1500 &&
              rapor.catatanPancasila.length > 1500 &&
              rapor.catatanPertumbuhan.length > 1500
                ? 'always'
                : rapor.catatanAgamaBudipekerti.length > 1500 &&
                  rapor.catatanLiterasiSains.length <= 2500 &&
                  rapor.catatanPancasila.length <= 2500 &&
                  rapor.catatanGuru.length > 2000
                ? 'always'
                : 'auto',
          }}
        >
          <table
            width="100%"
            border={4}
            style={{ borderCollapse: 'collapse', border: '2px solid black' }}
          >
            <tbody>
              <tr style={{ textAlign: 'left' }}>
                <td style={{ padding: '10px', fontSize: '20px' }}>
                  <b>CATATAN TAMBAHAN GURU :</b>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '5px' }}>
                  <p style={{ textIndent: '2em', textAlign: 'justify' }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: rapor.catatanGuru,
                      }}
                    />
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={coment}
          style={{
            pageBreakBefore:
              rapor.catatanAgamaBudipekerti.length > 1500 &&
              rapor.catatanLiterasiSains.length > 1500 &&
              rapor.catatanPancasila.length > 1500 &&
              rapor.catatanPertumbuhan.length > 1500
                ? 'always'
                : rapor.catatanAgamaBudipekerti.length > 1500 &&
                  rapor.catatanLiterasiSains.length <= 2500 &&
                  rapor.catatanPancasila.length <= 2500 &&
                  rapor.catatanGuru.length > 3000
                ? 'always'
                : rapor.catatanAgamaBudipekerti.length > 1500 &&
                  rapor.catatanLiterasiSains.length > 1500 &&
                  rapor.catatanPancasila.length <= 1500 &&
                  rapor.catatanGuru.length <= 1000
                ? 'always'
                : 'auto',
            marginTop: '5%',
          }}
        >
          <table
            width="100%"
            style={{ borderCollapse: 'collapse', border: '2px solid black' }}
          >
            <tbody>
              <tr style={{ textAlign: 'left' }}>
                <td style={{ padding: '10px', fontSize: '20px' }}>
                  <b>KOMENTAR ORANG TUA:</b>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '5px' }}>
                  <p
                    style={{
                      textIndent: '2em',
                      textAlign: 'justify',
                      color: 'white',
                      marginTop: '20%',
                    }}
                  >
                    {/* Konten dalam paragraf */}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="table_absence">
          <tbody>
            <tr style={{ textAlign: 'center' }}>
              <td style={{ padding: '10px', fontSize: '16px' }} colSpan={2}>
                <b>KETIDAKHADIRAN</b>
              </td>
            </tr>
            <tr>
              <td width="60%">Sakit</td>
              <td width="40%" className="ctr">
                {rapor.totalSakit}
              </td>
            </tr>
            <tr>
              <td>Izin</td>
              <td className="ctr">{rapor.totalIzin}</td>
            </tr>
            <tr>
              <td>Tanpa Keterangan</td>
              <td className="ctr">{rapor.totalAlpa}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <p style={{ textAlign: 'right', fontSize: '16px' }}>
            {`${sekolah.kota}, ${formatDateWithIndonesianMonth(
              new Date(rapor.tanggalBagiRapor)
            )}`}
          </p>
        </div>

        <table width="100%" style={{ marginTop: '20px', fontSize: '18px' }}>
          <tr>
            <td width="25%" style={{ textAlign: 'center' }}>
              Mengetahui :
              <p style={{ marginTop: '5px' }}>
                {`Kepala ${sekolah.nama.toUpperCase()}`}
              </p>
              <div style={{ marginTop: '40%' }}>
                <p style={{ margin: '-15px' }}>
                  <b>{kapsek.nama.toUpperCase()}</b>
                </p>
                <hr style={{ color: 'black' }} />
                <p style={{ margin: '-15px' }}>
                  <b>{`NIP. ${kapsek.nip}`}</b>
                </p>
              </div>
            </td>

            <td width="8%"></td>

            <td width="25%" style={{ textAlign: 'center' }}>
              <p style={{ marginTop: '5px' }}>Guru Kelompok</p>
              <div style={{ marginTop: '60%' }}>
                <p style={{ margin: '-15px' }}>
                  <b>{guru.nama.toUpperCase()}</b>
                </p>
                <hr style={{ color: 'black' }} />
                <p style={{ margin: '-15px' }}>
                  <b>{`NIP/NUPTK ${guru.nip}`}</b>
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td></td>
            <td width="25%" style={{ textAlign: 'center' }}>
              Mengetahui :
              <p style={{ marginTop: '5px' }}>Orang Tua/Wali Murid</p>
              <div style={{ marginTop: '25%', marginBottom: '10%' }}>
                <p style={{ margin: '0px' }}></p>
                <hr style={{ color: 'black' }} />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  )
}

export default Narrative
