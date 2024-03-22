'use client'
import React from 'react';

const Report = () => {
    return (
        <>
            <head>
                <title>Cetak Raport</title>
                <style jsx>{`
                    body {
                        font-family: arial;
                        font-size: 11pt;
                        width: 8.5in;
                    }

                    .table {
                        border-collapse: collapse;
                        border: solid 1px #999;
                        width: 50%;
                    }

                    .table_absence {
                        border-collapse: collapse;
                        border: solid 1px #999;
                        width: 50%;
                        margin-top: 20px;
                        font-size: 18px;
                    }

                    .table,
                    .table_absence tr td,
                    .table,
                    .table_absence tr th {
                        border: solid 1px #000;
                        padding: 3px;
                    }

                    .table tr th {
                        font-weight: bold;
                        text-align: center;
                    }

                    .rgt {
                        text-align: right;
                    }

                    .ctr {
                        text-align: center;
                    }

                    .tbl {
                        font-weight: bold;
                    }

                    table tr td {
                        vertical-align: top;
                    }

                    .font_kecil {
                        font-size: 12px;
                    }

                    p {
                        font-size: 17px;
                    }
                `}</style>
            </head>

            <body>
            <table>
            <tbody>
                <tr>
                    <td colSpan={6} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        <p>
                            <h3>LAPORAN PERKEMBANGAN ANAK DIDIK</h3>
                        </p>
                    </td>
                </tr>

                <tr>
                    <td width="15%">Nama Peserta Didik</td>
                    <td width="1%">:</td>
                    <td width="50%" className="tbl">ANAK 1</td>
                </tr>

                <tr>
                    <td>NIS / NISN</td>
                    <td>:</td>
                    <td className="tbl">Dummy NIS</td>
                </tr>

                <tr>
                    <td>Nama Sekopah</td>
                    <td>:</td>
                    <td className="tbl">TK ERLANGGA CIRACAS ASY SYAMS ISLAMIC SCHOOL</td>
                </tr>

                <tr>
                    <td>Kelompok</td>
                    <td>:</td>
                    <td className="tbl">Kelompok Usia 4-5 tahun</td>
                </tr>

                <tr>
                    <td>Semester</td>
                    <td>:</td>
                    <td className="tbl">Semester 1 Tahun Pelajaran 2023/2024</td>
                </tr>

                <tr>
                    <td colSpan={6} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        <p>
                            <h3>===================================================================================</h3>
                        </p>
                    </td>
                </tr>

                <tr>
                    <td colSpan={6}>
                        <div className="point_a">
                            <p style={{ fontSize: '20px' }}><b>A. NILAI AGAMA DAN BUDI PEKERTI</b></p>
                            <div style={{ padding: '5px', border: '4px solid black', marginBottom: '10px' }}>
                                <p style={{ textIndent: '2em', textAlign: 'justify', lineHeight: '1.4' }}> Pada semester ini
                                    perkembangan aspek Nilai
                                    Agama dan Budi Pekerti ananda ANAK1 sudah
                                    menunjukkan perkembangan yang sangat baik. Ada beberapa tujuan pembelajaran yang sudah
                                    muncul dalam diri ananda dan hal ini dapat terlihat dari kegiatan-kegiatan yang telah
                                    dilakukan ananda. Hal yang sudah muncul tersebut yaitu: bahwasanya ananda ananda sudah
                                    mampu
                                    menyebutkan nama-nama hewan kesukaannya, ananda sudah mampu meminta tolong dengan kata
                                    minta tolong, ananda sudah mampu mengucapkan dan melafalkan kalimat syahadat sebelum
                                    masuk
                                    kelas, ananda sudah mampu mengenal huruf hijaiyah dengan melafalkan hurufnya dibimbing
                                    oleh
                                    guru, ananda sudah mampu memiliki sikap tolong menolong saat orang lain membutuhkan
                                    pertolongan, ananda sudah mampu berpuasa saat hari ramadhan dibimbing oleh orang tua dan
                                    guru, dan semua pencapaian ini perlu dipertahankan sehingga menjadi suatu pembiasaan
                                    yang
                                    positif.
                                </p>
                            </div>
                        </div>

                        <div className="point_b">
                            <p style={{ fontSize: '20px' }}><b>B. JATI DIRI</b></p>
                            <div style={{ padding: '5px', border: '4px solid black', marginBottom: '10px' }}>
                                <p style={{ textIndent: '2em', textAlign: 'justify', lineHeight: '1.2' }}> Pada semester ini
                                    perkembangan aspek Nilai
                                    Agama dan Budi Pekerti ananda ANAK1 sudah
                                    menunjukkan perkembangan yang sangat baik. Ada beberapa tujuan pembelajaran yang sudah
                                    muncul dalam diri ananda dan hal ini dapat terlihat dari kegiatan-kegiatan yang telah
                                    dilakukan ananda. Hal yang sudah muncul tersebut yaitu: bahwasanya ananda ananda sudah
                                    mampu
                                    menyebutkan nama-nama hewan kesukaannya, ananda sudah mampu meminta tolong dengan kata
                                    minta tolong, ananda sudah mampu mengucapkan dan melafalkan kalimat syahadat sebelum
                                    masuk
                                    kelas, ananda sudah mampu mengenal huruf hijaiyah dengan melafalkan hurufnya dibimbing
                                    oleh
                                    guru, ananda sudah mampu memiliki sikap tolong menolong saat orang lain membutuhkan
                                    pertolongan, ananda sudah mampu berpuasa saat hari ramadhan dibimbing oleh orang tua dan
                                    guru, dan semua pencapaian ini perlu dipertahankan sehingga menjadi suatu pembiasaan
                                    yang
                                    positif.
                                </p>
                            </div>
                        </div>

                        <div className="point_c">
                            <p style={{ fontSize: '20px' }}><b>C. DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN
                                SENI</b></p>
                            <div style={{ padding: '5px', border: '4px solid black', marginBottom: '10px' }}>
                                <p style={{ textIndent: '2em', textAlign: 'justify', lineHeight: '1.2' }}> Pada semester ini
                                    perkembangan aspek Nilai
                                    Agama dan Budi Pekerti ananda ANAK1 sudah
                                    menunjukkan perkembangan yang sangat baik. Ada beberapa tujuan pembelajaran yang sudah
                                    muncul dalam diri ananda dan hal ini dapat terlihat dari kegiatan-kegiatan yang telah
                                    dilakukan ananda. Hal yang sudah muncul tersebut yaitu: bahwasanya ananda ananda sudah
                                    mampu
                                    menyebutkan nama-nama hewan kesukaannya, ananda sudah mampu meminta tolong dengan kata
                                    minta tolong, ananda sudah mampu mengucapkan dan melafalkan kalimat syahadat sebelum
                                    masuk
                                    kelas, ananda sudah mampu mengenal huruf hijaiyah dengan melafalkan hurufnya dibimbing
                                    oleh
                                    guru, ananda sudah mampu memiliki sikap tolong menolong saat orang lain membutuhkan
                                    pertolongan, ananda sudah mampu berpuasa saat hari ramadhan dibimbing oleh orang tua dan
                                    guru,     guru, dan semua pencapaian ini perlu dipertahankan sehingga menjadi suatu pembiasaan
                                    yang
                                    positif.
                                </p>
                            </div>
                        </div>

                        <div className="point_d">
                            <p style={{ fontSize: '20px' }}><b>D. PROJEK PENGUATAN PROFIL PELAJAR PANCASILA</b></p>
                            <div style={{ padding: '5px', border: '4px solid black', marginBottom: '10px' }}>
                                <p style={{ textIndent: '2em', textAlign: 'justify', lineHeight: '1.2' }}> Pada semester ini
                                    perkembangan aspek Nilai
                                    Agama dan Budi Pekerti ananda ANAK1 sudah
                                    menunjukkan perkembangan yang sangat baik. Ada beberapa tujuan pembelajaran yang sudah
                                    muncul dalam diri ananda dan hal ini dapat terlihat dari kegiatan-kegiatan yang telah
                                    dilakukan ananda. Hal yang sudah muncul tersebut yaitu: bahwasanya ananda ananda sudah
                                    mampu
                                    menyebutkan nama-nama hewan kesukaannya, ananda sudah mampu meminta tolong dengan kata
                                    minta tolong, ananda sudah mampu mengucapkan dan melafalkan kalimat syahadat sebelum
                                    masuk
                                    kelas, ananda sudah mampu mengenal huruf hijaiyah dengan melafalkan hurufnya dibimbing
                                    oleh
                                    guru, ananda sudah mampu memiliki sikap tolong menolong saat orang lain membutuhkan
                                    pertolongan, ananda sudah mampu berpuasa saat hari ramadhan dibimbing oleh orang tua dan
                                    guru, dan semua pencapaian ini perlu dipertahankan sehingga menjadi suatu pembiasaan
                                    yang
                                    positif.
                                </p>
                            </div>
                        </div>

                        <div className="note_growth_child">
                            <p style={{ fontSize: '20px' }}><b>CATATAN PERTUMBUHAN ANAK</b></p>
                            <div style={{ padding: '5px', border: '4px solid black', marginBottom: '10px', marginTop: '-20px' }}>
                                <p style={{ textIndent: '2em', textAlign: 'justify', lineHeight: '1.2' }}> Pada semester ini
                                    Berdasarkan hasil pengukuran pertumbuhan dan perkembangan ananda ANAK1 pada Semester 1
                                    Tahun Pelajaran 2023/2024 ini, yang sehat secara fisik, mental, sosial dan rohani.
                                    Adapun hasil pencapaian pertumbuhan ananda saat ini dengan berat badan 1 Kg, lingkar
                                    kepala selebar 3 cm dan tinggi badan mencapai 2 cm. Hal ini menunjukkan hasil
                                    perkembangan dan pertumbuhan yang normal dan tetap terus ditingkatkan dengan berolahraga
                                    secara teratur dan mengonsumsi makanan-makanan sehat dan bergizi.
                                </p>
                            </div>
                        </div>

                        <div className="note_teacher">
                            <table width="100%" border={4} style={{ borderCollapse: 'collapse', border: '4px solid black' }}>
                                <tbody>
                                    <tr style={{ textAlign: 'left' }}>
                                        <td style={{ padding: '10px', fontSize: '20px' }}><b>CATATAN TAMBAHAN GURU :</b></td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '5px' }}>
                                            <p style={{ textIndent: '2em', textAlign: 'justify' }}> Pada semester ini
                                                Berdasarkan hasil pengukuran pertumbuhan dan perkembangan ananda ANAK1
                                                pada Semester 1
                                                Tahun Pelajaran 2023/2024 ini, yang sehat secara fisik, mental, sosial
                                                dan rohani.
                                                Adapun hasil pencapaian pertumbuhan ananda saat ini dengan berat badan 1
                                                Kg, lingkar
                                                kepala selebar 3 cm dan tinggi badan mencapai 2 cm. Hal ini menunjukkan
                                                hasil
                                                perkembangan dan pertumbuhan yang normal dan tetap terus ditingkatkan
                                                dengan berolahraga
                                                secara teratur dan mengonsumsi makanan-makanan sehat dan bergizi.
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="comment" style={{ marginTop: '10px' }}>
                            <table width="100%" style={{ borderCollapse: 'collapse', border: '4px solid black' }}>
                                <tbody>
                                    <tr style={{ textAlign: 'left' }}>
                                        <td style={{ padding: '10px', fontSize: '20px' }}><b>KOMENTAR ORANG TUA:</b></td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '5px' }}>
                                            <p
                                                style={{ textIndent: '2em', textAlign: 'justify', color: 'white', marginTop: '20%' }}>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <table className="table_absence">
                            <tbody>
                                <tr style={{ textAlign: 'center' }}>
                                    <td style={{ padding: '10px', fontSize: '16px' }} colSpan={2}><b>KETIDAKHADIRAN</b></td>
                                </tr>
                                <tr>
                                    <td width="60%">Sakit</td>
                                    <td width="40%" className="ctr">404</td>
                                </tr>
                                <tr>
                                    <td>Izin</td>
                                    <td className="ctr">404</td>
                                </tr>
                                <tr>
                                    <td>Tanpa Keterangan</td>
                                    <td className="ctr">404</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
            </body>
        </>
    );
};

export default Report;