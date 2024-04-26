'use client'
import { useEffect } from 'react'
import './style_assesment_input.css'
import { NilaiType } from '@/lib/helper'
import { formatDateWithIndonesianMonth } from '@/lib/helperDate'

function PrintAssesmnetInput({ data }) {
  useEffect(() => {
    window.print()
  }, [])
  // console.log(`from print assesment input ${JSON.stringify(data)}`)

  return (
    <div>
      <body>
        <div className="header">
          <h4 className="tbl">{`PENILAIAN HARIAN ANAK MINGGU KE ${data.tp?.minggu}`}</h4>
          <h5 className="tbl text-red">
            {`Kelompok Kelompok Usia ${data.kelompokUsia} ${data.namaSekolah}`}
          </h5>
          <h5 className="tbl">{data.semester}</h5>
          <hr style={{ borderTop: '5px solid black', margin: '20px 0' }} />
        </div>
        <table
          border={0}
          cellPadding={0}
          cellSpacing={0}
          id="sheet0"
          className="sheet0 gridlines"
        >
          <col className="col0" />
          <col className="col1" />
          <col className="col2" />
          <col className="col3" />
          <col className="col4" />
          <col className="col5" />
          <col className="col6" />
          <col className="col7" />
          <col className="col8" />
          <col className="col9" />
          <col className="col10" />
          <tbody>
            <tr className="row0">
              <td className="column0 style8 s style8" rowSpan={3}>
                NO
              </td>
              <td className="column1 style9 s style9" rowSpan={3}>
                NAMA ANAK
              </td>
              <td className="column2 style10 s style12" colSpan={3}>
                NILAI AGAMA DAN BUDI PEKERTI
              </td>
              <td className="column5 style10 s style12" colSpan={3}>
                JATI DIRI
              </td>
              <td className="column8 style10 s style12" colSpan={3}>
                DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN SENI
              </td>
            </tr>
            <tr className="row1">
              <td className="column2 style1 s style3" colSpan={3}>
                {data.tp?.tujuanPembelajaranAgamaBudipekerti}
              </td>
              <td className="column5 style1 s style3" colSpan={3}>
                {data.tp?.tujuanPembelajaranJatiDiri}
              </td>
              <td className="column8 style1 s style3" colSpan={3}>
                {data.tp?.tujuanPembelajaranLiterasiSains}
              </td>
            </tr>
            <tr className="row2">
              {/* Agama */}
              <td className="column2 style4 s">Belum Berkembang</td>
              <td className="column3 style4 s">Mulai Berkembang</td>
              <td className="column4 style4 s">Sudah Berkembang</td>
              {/* Jati diri */}
              <td className="column5 style4 s">Belum Berkembang</td>
              <td className="column6 style4 s">Mulai Berkembang</td>
              <td className="column7 style4 s">Sudah Berkembang</td>
              {/* Literasi */}
              <td className="column8 style4 s">Belum Berkembang</td>
              <td className="column9 style4 s">Mulai Berkembang</td>
              <td className="column10 style4 s">Sudah Berkembang</td>
            </tr>
            {data.murids?.map((murid, index) => {
              return (
                <tr className="row3" key={murid.id}>
                  {/* No */}
                  <td className="column0 style5 n">{index + 1}</td>

                  {/* Nama Anak */}
                  <td className="column1 style6 f">{murid.nama}</td>

                  {/* Agama */}
                  <td className="column2 style7 null">
                    {murid.penilaianMingguan?.nilaiAgamaBudipekerti ===
                    NilaiType.BELUM_BERKEMBANG
                      ? murid.penilaianMingguan?.deskripsiAgamaBudipekerti
                      : ''}
                  </td>
                  <td className="column3 style7 s">
                    {murid.penilaianMingguan?.nilaiAgamaBudipekerti ===
                    NilaiType.MULAI_BERKEMBANG
                      ? murid.penilaianMingguan?.deskripsiAgamaBudipekerti
                      : ''}
                  </td>
                  <td className="column4 style7 null">
                    {murid.penilaianMingguan?.nilaiAgamaBudipekerti ===
                    NilaiType.SUDAH_BERKEMBANG
                      ? murid.penilaianMingguan?.deskripsiAgamaBudipekerti
                      : ''}
                  </td>

                  {/* Jati diri */}
                  <td className="column5 style7 null">
                    {murid.penilaianMingguan?.nilaiJatiDiri ===
                    NilaiType.BELUM_BERKEMBANG
                      ? murid.penilaianMingguan?.deskripsiJatiDiri
                      : ''}
                  </td>
                  <td className="column6 style7 s">
                    {murid.penilaianMingguan?.nilaiJatiDiri ===
                    NilaiType.MULAI_BERKEMBANG
                      ? murid.penilaianMingguan?.deskripsiJatiDiri
                      : ''}
                  </td>
                  <td className="column7 style7 null">
                    {murid.penilaianMingguan?.nilaiJatiDiri ===
                    NilaiType.SUDAH_BERKEMBANG
                      ? murid.penilaianMingguan?.deskripsiJatiDiri
                      : ''}
                  </td>

                  {/* Literasi */}
                  <td className="column8 style7 null">
                    {murid.penilaianMingguan?.nilaiLiterasiSains ===
                    NilaiType.BELUM_BERKEMBANG
                      ? murid.penilaianMingguan?.deskripsiLiterasiSains
                      : ''}
                  </td>
                  <td className="column9 style7 s">
                    {murid.penilaianMingguan?.nilaiLiterasiSains ===
                    NilaiType.MULAI_BERKEMBANG
                      ? murid.penilaianMingguan?.deskripsiLiterasiSains
                      : ''}
                  </td>
                  <td className="column10 style7 null">
                    {murid.penilaianMingguan?.nilaiLiterasiSains ===
                    NilaiType.SUDAH_BERKEMBANG
                      ? murid.penilaianMingguan?.deskripsiLiterasiSains
                      : ''}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <table className="ttd">
          <tr>
            <td width="5%" style={{ textAlign: 'center' }}>
              Mengetahui :
              <p
                style={{ marginTop: '5px' }}
              >{`Kepala ${data.namaSekolah?.toUpperCase()}`}</p>
              <div style={{ marginTop: '20%' }}>
                <p style={{ margin: '-15px' }}>
                  <b>{data.namaKapsek}</b>
                </p>
                <hr style={{ color: 'black' }} />
                <p style={{ margin: '-15px' }}>
                  <b>{`NIP. ${data.nipKapsek}`}</b>
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
      </body>
    </div>
  )
}

export default PrintAssesmnetInput
