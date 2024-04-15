import { formatDateWithIndonesianMonth } from '@/lib/helperDate'

function Narrative({ murid, rombel, sekolah, semester, rapor, guru, kapsek }) {
  return (
    <>
      <div style={{ pageBreakBefore: 'always', marginTop: '8%' }}>
        <h3 style={{ textAlign: 'center' }}>LAPORAN PERKEMBANGAN ANAK DIDIK</h3>
        <table>
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

          <tr>
            <td colSpan={6} style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {/* <h3>===============================================</h3> */}
              <hr style={{ borderTop: '5px solid black', margin: '20px 0' }} />
            </td>
          </tr>

          <tr>
            <td colSpan={6}>
              <div className="point_a">
                <p style={{ fontSize: '20px' }}>
                  <b>A. NILAI AGAMA DAN BUDI PEKERTI</b>
                </p>
                <div
                  style={{
                    padding: '5px',
                    border: '4px solid black',
                    marginBottom: '10px',
                  }}
                >
                  <p
                    style={{
                      textIndent: '2em',
                      textAlign: 'justify',
                      lineHeight: '1.4',
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: rapor.catatanAgamaBudipekerti,
                      }}
                    />
                  </p>
                </div>
              </div>

              <div className="point_b">
                <p style={{ fontSize: '20px' }}>
                  <b>B. JATI DIRI</b>
                </p>
                <div
                  style={{
                    padding: '5px',
                    border: '4px solid black',
                    marginBottom: '10px',
                  }}
                >
                  <p
                    style={{
                      textIndent: '2em',
                      textAlign: 'justify',
                      lineHeight: '1.4',
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: rapor.catatanJatiDiri,
                      }}
                    />
                  </p>
                </div>
              </div>

              <div className="point_c">
                <p style={{ fontSize: '20px' }}>
                  <b>
                    C. DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA
                    DAN SENI
                  </b>
                </p>
                <div
                  style={{
                    padding: '5px',
                    border: '4px solid black',
                    marginBottom: '10px',
                  }}
                >
                  <p
                    style={{
                      textIndent: '2em',
                      textAlign: 'justify',
                      lineHeight: '1.4',
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: rapor.catatanLiterasiSains,
                      }}
                    />
                  </p>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td colSpan={6}>
              <div className="point_d" style={{ marginTop: '8%' }}>
                <p style={{ fontSize: '20px' }}>
                  <b>D. PROJEK PENGUATAN PROFIL PELAJAR PANCASILA</b>
                </p>
                <div
                  style={{
                    padding: '5px',
                    border: '4px solid black',
                    marginBottom: '10px',
                  }}
                >
                  <p
                    style={{
                      textIndent: '2em',
                      textAlign: 'justify',
                      lineHeight: '1.4',
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: rapor.catatanPancasila,
                      }}
                    />
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div className="note_growth_child">
          <p style={{ fontSize: '20px' }}>
            <b>CATATAN PERTUMBUHAN ANAK</b>
          </p>
          <div
            style={{
              padding: '5px',
              border: '4px solid black',
              marginBottom: '10px',
              marginTop: '-10px',
            }}
          >
            <p
              style={{
                textIndent: '2em',
                textAlign: 'justify',
                lineHeight: '1.2',
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

        <div className="note_teacher" style={{ marginTop: '20px' }}>
          <table
            width="100%"
            border={4}
            style={{ borderCollapse: 'collapse', border: '4px solid black' }}
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
          className="coment"
          style={{ marginTop: '10%', pageBreakBefore: 'always' }}
        >
          <table
            width="100%"
            style={{ borderCollapse: 'collapse', border: '4px solid black' }}
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
              <td className="ctr">{rapor.totalSakit}</td>
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
                Kepala TK ERLANGGA CIRACAS
                <br />
                ASY SYAMS ISLAMIC SCHOOL
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
