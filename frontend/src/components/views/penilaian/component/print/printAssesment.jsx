'use client'
import { useEffect } from 'react'
import './style_assesment.css'
import { NilaiType } from '@/lib/helper'

function PrintAssesmnet({ data }) {
  useEffect(() => {
    window.print()
  }, [])

  const murid = data?.murid
  const penilaian = data?.penilaian

  return (
    <div>
      <div className=" body">
        <div className="header">
          <h4 className="tbl">ANALISIS HASIL BELAJAR/BERMAIN ANAK</h4>
          <h5 className="tbl">{data?.semester}</h5>
          <h5 className="tbl">{data?.nameSekolah}</h5>
          <hr style={{ borderTop: '5px solid black', margin: '20px 0' }} />
        </div>
        <div>
          <h6 className="tbl">{`NAMA: ${murid.name}`}</h6>
          <h6 className="tbl">{`NOMOR INDUK: ${murid.nis}`}</h6>
        </div>
        <table
          border={0}
          cellPadding={0}
          cellSpacing={0}
          id="sheet0"
          className="sheet0 gridlines"
        >
          <tbody>
            <tr className="row0">
              <td className="column0 style1 s style11" rowSpan={2}>
                MINGGU KE-
              </td>
              <td className="column1 style2 s style4" colSpan={3}>
                NILAI AGAMA DAN BUDI PEKERTI
              </td>
              <td className="column4 style5 s style7" colSpan={3}>
                JATI DIRI
              </td>
              <td className="column7 style8 s style10" colSpan={3}>
                DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN SENI
              </td>
            </tr>
            <tr className="row2">
              {/* Agama */}
              <td className="column1 style22 s">Belum Muncul</td>
              <td className="column2 style22 s">Mulai Muncul</td>
              <td className="column3 style22 s">Sudah Muncul</td>

              {/* Jati Diri */}
              <td className="column4 style23 s">Belum Muncul</td>
              <td className="column5 style23 s">Mulai Muncul</td>
              <td className="column6 style23 s">Sudah Muncul</td>

              {/* Dasar Literasi */}
              <td className="column7 style24 s">Belum Muncul</td>
              <td className="column8 style24 s">Mulai Muncul</td>
              <td className="column9 style24 s">Sudah Muncul</td>
            </tr>

            {penilaian?.map((item, index) => {
              return (
                <tr className="row3" key={item.id}>
                  {/* Minggu  */}
                  <td className="column0 style25 n">{item.minggu}</td>

                  {/* Deskripsi Agama */}
                  <td className="column1 style26 s">
                    {item.nilaiAgamaBudipekerti === NilaiType.BELUM_BERKEMBANG
                      ? item.deskripsiAgamaBudipekerti
                      : ''}
                  </td>
                  <td className="column2 style26 s">
                    {item.nilaiAgamaBudipekerti === NilaiType.MULAI_BERKEMBANG
                      ? item.deskripsiAgamaBudipekerti
                      : ''}
                  </td>
                  <td className="column3 style26 f">
                    {item.nilaiAgamaBudipekerti === NilaiType.SUDAH_BERKEMBANG
                      ? item.deskripsiAgamaBudipekerti
                      : ''}
                  </td>

                  {/* Deskripsi Jati Diri */}
                  <td className="column4 style26 f">
                    {item.nilaiJatiDiri === NilaiType.BELUM_BERKEMBANG
                      ? item.deskripsiJatiDiri
                      : ''}
                  </td>
                  <td className="column5 style26 f">
                    {item.nilaiJatiDiri === NilaiType.MULAI_BERKEMBANG
                      ? item.deskripsiJatiDiri
                      : ''}
                  </td>
                  <td className="column6 style26 f">
                    {item.nilaiJatiDiri === NilaiType.SUDAH_BERKEMBANG
                      ? item.deskripsiJatiDiri
                      : ''}
                  </td>

                  {/* Deskripsi Dasar Literasi */}
                  <td className="column7 style26 f">
                    {item.nilaiLiterasiSains === NilaiType.BELUM_MUNCUL
                      ? item.deskripsiLiterasiSains
                      : ''}
                  </td>
                  <td className="column8 style26 f">
                    {item.nilaiLiterasiSains === NilaiType.MULAI_BERKEMBANG
                      ? item.deskripsiLiterasiSains
                      : ''}
                  </td>
                  <td className="column9 style26 f">
                    {item.nilaiLiterasiSains === NilaiType.SUDAH_BERKEMBANG
                      ? item.deskripsiLiterasiSains
                      : ''}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PrintAssesmnet
