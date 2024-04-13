'use client'
import { useEffect } from 'react';
import './style_assesment.css';

function PrintAssesmnet() {
    useEffect(() => {
        window.print();
    }, []);

    return (
        <div>

            <body>
                <div className="header">
                    <h4 className='tbl'>ANALISIS HASIL BELAJAR/BERMAIN ANAK</h4>
                    <h5 className='tbl'>Semester 1 Tahun Pelajaran 2023/2024</h5>
                    <h5 className='tbl'>TK ERLANGGA CIRACAS ASY SYAMS ISLAMIC SCHOOL</h5>
                    <hr style={{ borderTop: '5px solid black', margin: '20px 0' }} />
                </div>
                <div>
                    <h6 className='tbl'>NAMA: ANAK1</h6>
                    <h6 className='tbl'>NOMOR INDUK: 1234567</h6>
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
                    <tbody>
                        <tr className="row0">
                            <td className="column0 style1 s style11" rowSpan={2}>MINGGU KE-</td>
                            <td className="column1 style2 s style4" colSpan={3}>
                                NILAI AGAMA DAN BUDI PEKERTI
                            </td>
                            <td className="column4 style5 s style7" colSpan={3}>JATI DIRI</td>
                            <td className="column7 style8 s style10" colSpan={3}>
                                DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN SENI
                            </td>
                        </tr>
                        <tr className="row2">
                            <td className="column1 style22 s">Belum Muncul</td>
                            <td className="column2 style22 s">Mulai Muncul</td>
                            <td className="column3 style22 s">Sudah Muncul</td>
                            <td className="column4 style23 s">Belum Muncul</td>
                            <td className="column5 style23 s">Mulai Muncul</td>
                            <td className="column6 style23 s">Sudah Muncul</td>
                            <td className="column7 style24 s">Belum Muncul</td>
                            <td className="column8 style24 s">Mulai Muncul</td>
                            <td className="column9 style24 s">Sudah Muncul</td>
                        </tr>
                        <tr className="row3">
                            <td className="column0 style25 n">1</td>
                            <td className="column1 style26 s">bla bal bla</td>
                            <td className="column2 style26 s">blabla</td>
                            <td className="column3 style26 f">&nbsp;-</td>
                            <td className="column4 style26 f">
                                Memiliki kepedulian yang tinggi terhadap satu sama lain
                            </td>
                            <td className="column5 style26 f">&nbsp;-</td>
                            <td className="column6 style26 f">&nbsp;-</td>
                            <td className="column7 style26 f">&nbsp;-</td>
                            <td className="column8 style26 f">Mampu memahami konteks sosial</td>
                            <td className="column9 style26 f">&nbsp;-</td>
                        </tr>
                        <tr className="row4">
                            <td className="column0 style25 n">2</td>
                            <td className="column1 style26 s">bla bal bla</td>
                            <td className="column2 style26 s">bla bla</td>
                            <td className="column3 style26 f">&nbsp;-</td>
                            <td className="column4 style26 f">
                                Menanamkan pada anak nilai sosial agar anak gemar bersedekah
                            </td>
                            <td className="column5 style26 f">&nbsp;-</td>
                            <td className="column6 style26 f">&nbsp;-</td>
                            <td className="column7 style26 f">&nbsp;-</td>
                            <td className="column8 style26 f">
                                Memiliki sikap jujur dan sopan kepada keluarga, sekolah, masyarakat,
                                negara, dan dunia
                            </td>
                            <td className="column9 style26 f">&nbsp;-</td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </div>
    )
}

export default PrintAssesmnet;