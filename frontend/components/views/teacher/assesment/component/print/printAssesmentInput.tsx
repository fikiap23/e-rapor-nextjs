'use client'
import { useEffect } from 'react';
import './style_assesment_input.css';

function PrintAssesmnetInput() {
    // useEffect(() => {
    //     window.print();
    // }, []);

    return (
        <div>
            <body>
                <div className="header">
                    <h4 className='tbl'>PENILAIAN HARIAN ANAK MINGGU KE 11</h4>
                    <h5 className='tbl text-red'>Kelompok Kelompok Usia 4-5 tahun  TK ERLANGGA CIRACAS ASY SYAMS ISLAMIC SCHOOL</h5>
                    <h5 className='tbl'>Semester 1 Tahun Pelajaran 2023/2024</h5>
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
                            <td className="column0 style8 s style8" rowSpan={3}>N O</td>
                            <td className="column1 style9 s style9" rowSpan={3}>NAMA ANAK</td>
                            <td className="column2 style10 s style12" colSpan={3}>
                                NILAI AGAMA DAN BUDI PEKERTI
                            </td>
                            <td className="column5 style10 s style12" colSpan={3}>JATI DIRI</td>
                            <td className="column8 style10 s style12" colSpan={3}>
                                DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN SENI
                            </td>
                        </tr>
                        <tr className="row1">
                            <td className="column2 style1 s style3" colSpan={3}>
                                Memiliki sikap sabar, ikhlas, dan tawakal untuk kedamaian hati
                            </td>
                            <td className="column5 style1 s style3" colSpan={3}>Memiliki sikap sabar, ikhlas, dan tawakal untuk kedamaian hati</td>
                            <td className="column8 style1 s style3" colSpan={3}>Melakukan aktivitas yang mengembangkan kreatifitas dan imajinasi melalui sebuah karya</td>
                        </tr>
                        <tr className="row2">
                            <td className="column2 style4 s">Belum Berkembang</td>
                            <td className="column3 style4 s">Mulai Berkembang</td>
                            <td className="column4 style4 s">Sudah Berkembang</td>
                            <td className="column5 style4 s">Belum Berkembang</td>
                            <td className="column6 style4 s">Mulai Berkembang</td>
                            <td className="column7 style4 s">Sudah Berkembang</td>
                            <td className="column8 style4 s">Belum Berkembang</td>
                            <td className="column9 style4 s">Mulai Berkembang</td>
                            <td className="column10 style4 s">Sudah Berkembang</td>
                        </tr>
                        <tr className="row3">
                            <td className="column0 style5 n">1</td>
                            <td className="column1 style6 f">Nama lengkap</td>
                            <td className="column2 style7 null"></td>
                            <td className="column3 style7 s">
                                ananda sudah mulai muncul menghafalkan surah-surah pendek
                            </td>
                            <td className="column4 style7 null"></td>
                            <td className="column5 style7 null"></td>
                            <td className="column6 style7 s">
                                ananda sudah mulai muncul menjaga kebersihannya dengan mencuci
                                tangan sebelum makan
                            </td>
                            <td className="column7 style7 null"></td>
                            <td className="column8 style7 null"></td>
                            <td className="column9 style7 s">
                                ananada sudah mulai muncul keaktifannya saat bertanya
                            </td>
                            <td className="column10 style7 null"></td>
                        </tr>
                        <tr className="row4">
                            <td className="column0 style5 n">2</td>
                            <td className="column1 style6 f">0</td>
                            <td className="column2 style7 null"></td>
                            <td className="column3 style7 s">
                                ananda sudah mulai muncul menghafalkan surah-surah pendek
                            </td>
                            <td className="column4 style7 null"></td>
                            <td className="column5 style7 null"></td>
                            <td className="column6 style7 s">
                                ananda sudah mulai muncul menjaga kebersihannya dengan mencuci
                                tangan sebelum makan
                            </td>
                            <td className="column7 style7 null"></td>
                            <td className="column8 style7 null"></td>
                            <td className="column9 style7 s">
                                ananada sudah mulai muncul keaktifannya saat bertanya
                            </td>
                            <td className="column10 style7 null"></td>
                        </tr>
                        <tr className="row4">
                            <td className="column0 style5 n">2</td>
                            <td className="column1 style6 f">0</td>
                            <td className="column2 style7 null"></td>
                            <td className="column3 style7 s">
                                ananda sudah mulai muncul menghafalkan surah-surah pendek
                            </td>
                            <td className="column4 style7 null"></td>
                            <td className="column5 style7 null"></td>
                            <td className="column6 style7 s">
                                ananda sudah mulai muncul menjaga kebersihannya dengan mencuci
                                tangan sebelum makan
                            </td>
                            <td className="column7 style7 null"></td>
                            <td className="column8 style7 null"></td>
                            <td className="column9 style7 s">
                                ananada sudah mulai muncul keaktifannya saat bertanya
                            </td>
                            <td className="column10 style7 null"></td>
                        </tr>
                        <tr className="row4">
                            <td className="column0 style5 n">2</td>
                            <td className="column1 style6 f">0</td>
                            <td className="column2 style7 null"></td>
                            <td className="column3 style7 s">
                                ananda sudah mulai muncul menghafalkan surah-surah pendek
                            </td>
                            <td className="column4 style7 null"></td>
                            <td className="column5 style7 null"></td>
                            <td className="column6 style7 s">
                                ananda sudah mulai muncul menjaga kebersihannya dengan mencuci
                                tangan sebelum makan
                            </td>
                            <td className="column7 style7 null"></td>
                            <td className="column8 style7 null"></td>
                            <td className="column9 style7 s">
                                ananada sudah mulai muncul keaktifannya saat bertanya
                            </td>
                            <td className="column10 style7 null"></td>
                        </tr>
                        <tr className="row4">
                            <td className="column0 style5 n">2</td>
                            <td className="column1 style6 f">0</td>
                            <td className="column2 style7 null"></td>
                            <td className="column3 style7 s">
                                ananda sudah mulai muncul menghafalkan surah-surah pendek
                            </td>
                            <td className="column4 style7 null"></td>
                            <td className="column5 style7 null"></td>
                            <td className="column6 style7 s">
                                ananda sudah mulai muncul menjaga kebersihannya dengan mencuci
                                tangan sebelum makan
                            </td>
                            <td className="column7 style7 null"></td>
                            <td className="column8 style7 null"></td>
                            <td className="column9 style7 s">
                                ananada sudah mulai muncul keaktifannya saat bertanya
                            </td>
                            <td className="column10 style7 null"></td>
                        </tr>
                        <tr className="row4">
                            <td className="column0 style5 n">2</td>
                            <td className="column1 style6 f">0</td>
                            <td className="column2 style7 null"></td>
                            <td className="column3 style7 s">
                                ananda sudah mulai muncul menghafalkan surah-surah pendek
                            </td>
                            <td className="column4 style7 null"></td>
                            <td className="column5 style7 null"></td>
                            <td className="column6 style7 s">
                                ananda sudah mulai muncul menjaga kebersihannya dengan mencuci
                                tangan sebelum makan
                            </td>
                            <td className="column7 style7 null"></td>
                            <td className="column8 style7 null"></td>
                            <td className="column9 style7 s">
                                ananada sudah mulai muncul keaktifannya saat bertanya
                            </td>
                            <td className="column10 style7 null"></td>
                        </tr>
                        <tr className="row4">
                            <td className="column0 style5 n">2</td>
                            <td className="column1 style6 f">0</td>
                            <td className="column2 style7 null"></td>
                            <td className="column3 style7 s">
                                ananda sudah mulai muncul menghafalkan surah-surah pendek
                            </td>
                            <td className="column4 style7 null"></td>
                            <td className="column5 style7 null"></td>
                            <td className="column6 style7 s">
                                ananda sudah mulai muncul menjaga kebersihannya dengan mencuci
                                tangan sebelum makan
                            </td>
                            <td className="column7 style7 null"></td>
                            <td className="column8 style7 null"></td>
                            <td className="column9 style7 s">
                                ananada sudah mulai muncul keaktifannya saat bertanya
                            </td>
                            <td className="column10 style7 null"></td>
                        </tr>
                        <tr className="row4">
                            <td className="column0 style5 n">2</td>
                            <td className="column1 style6 f">0</td>
                            <td className="column2 style7 null"></td>
                            <td className="column3 style7 s">
                                ananda sudah mulai muncul menghafalkan surah-surah pendek
                            </td>
                            <td className="column4 style7 null"></td>
                            <td className="column5 style7 null"></td>
                            <td className="column6 style7 s">
                                ananda sudah mulai muncul menjaga kebersihannya dengan mencuci
                                tangan sebelum makan
                            </td>
                            <td className="column7 style7 null"></td>
                            <td className="column8 style7 null"></td>
                            <td className="column9 style7 s">
                                ananada sudah mulai muncul keaktifannya saat bertanya
                            </td>
                            <td className="column10 style7 null"></td>
                        </tr>
                        <tr className="row4">
                            <td className="column0 style5 n">2</td>
                            <td className="column1 style6 f">0</td>
                            <td className="column2 style7 null"></td>
                            <td className="column3 style7 s">
                                ananda sudah mulai muncul menghafalkan surah-surah pendek
                            </td>
                            <td className="column4 style7 null"></td>
                            <td className="column5 style7 null"></td>
                            <td className="column6 style7 s">
                                ananda sudah mulai muncul menjaga kebersihannya dengan mencuci
                                tangan sebelum makan
                            </td>
                            <td className="column7 style7 null"></td>
                            <td className="column8 style7 null"></td>
                            <td className="column9 style7 s">
                                ananada sudah mulai muncul keaktifannya saat bertanya
                            </td>
                            <td className="column10 style7 null"></td>
                        </tr>
                    </tbody>
                </table>

                <table className='ttd'>
                    <tr>
                        <td width="5%" style={{ textAlign: 'center' }}>
                            Mengetahui :
                            <p style={{ marginTop: '5px' }}>Kepala TK ERLANGGA CIRACAS<br />ASY SYAMS ISLAMIC SCHOOL</p>
                            <div style={{ marginTop: '20%' }}>
                                <p style={{ margin: '-15px' }}><b>LILIANA ASTUTI</b></p>
                                <hr style={{ color: 'black' }} />
                                <p style={{ margin: '-15px' }}><b>NIP. 1234567890</b></p>
                            </div>
                        </td>

                        <td width="8%"></td>

                        <td width="5%" style={{ textAlign: 'center' }}>
                            Jakarta, 14 Februari 2024 :
                            <p style={{ marginTop: '5px' }}>Guru Kelompok</p>
                            <div style={{ marginTop: '25%' }}>
                                <p style={{ margin: '-15px' }}><b>DWI ANGGRAINI</b></p>
                                <hr style={{ color: 'black' }} />
                                <p style={{ margin: '-15px' }}><b>NIP/NUPTK 987654</b></p>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>
        </div>
    )
}

export default PrintAssesmnetInput;